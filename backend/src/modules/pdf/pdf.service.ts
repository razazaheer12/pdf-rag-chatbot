import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LangchainService } from '../../services/langchain/langchain.service';

@Injectable()
export class PdfService {
  constructor(private readonly langchain: LangchainService) {}

  async processPDF(file: Express.Multer.File) {
    let text = '';
    let numpages = 0;

    try {
      const pdfParse = require('pdf-parse');
      const parsed = await pdfParse(file.buffer);
      text = parsed.text?.trim() ?? '';
      numpages = parsed.numpages ?? 0;
    } catch (err) {
      console.log('PDF PARSE ERROR:', err);
      throw new BadRequestException(
        'Failed to parse PDF. Make sure the file is a valid PDF.',
      );
    }

    if (!text || text.length < 20) {
      throw new BadRequestException(
        'PDF has no readable text. Scanned image-based PDFs are not supported.',
      );
    }

    const namespace = uuidv4();
    const chunkCount = await this.langchain.ingestPDF(text, namespace);

    return {
      success: true,
      namespace,
      filename: file.originalname,
      pages: numpages,
      chunks: chunkCount,
      message: `Successfully indexed ${chunkCount} chunks from ${numpages} pages`,
    };
  }
}