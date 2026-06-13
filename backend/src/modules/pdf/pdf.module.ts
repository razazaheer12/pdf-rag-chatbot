import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { LangchainModule } from '../../services/langchain/langchain.module';

@Module({
  imports: [LangchainModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
