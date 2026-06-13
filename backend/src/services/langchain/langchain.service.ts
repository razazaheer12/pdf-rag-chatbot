import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PineconeService } from '../pinecone/pinecone.service';
import { GeminiService } from '../gemini/gemini.service';
import { buildSystemPrompt } from './prompts/rag.prompt';

@Injectable()
export class LangchainService implements OnModuleInit {
  private embedder: any = null;
  private readonly logger = new Logger(LangchainService.name);

  constructor(
    private readonly pinecone: PineconeService,
    private readonly gemini: GeminiService,
  ) {}

  async onModuleInit() {
    this.logger.log('Loading embedding model...');
    try {
      const transformers = require('@xenova/transformers');
      this.embedder = await transformers.pipeline(
        'feature-extraction',
        'Xenova/multilingual-e5-large',
      );
      this.logger.log('✅ Embedding model loaded successfully');
    } catch (err) {
      this.logger.error('❌ Failed to load embedding model', err);
    }
  }

  async embedText(text: string): Promise<number[]> {
    const output = await this.embedder(`passage: ${text}`, {
      pooling: 'mean',
      normalize: true,
    });
    return Array.from(output.data as Float32Array);
  }

  async ingestPDF(pdfText: string, namespace: string): Promise<number> {
    const chunkSize = 1000;
    const chunkOverlap = 200;
    const chunks: string[] = [];

    let start = 0;
    while (start < pdfText.length) {
      const end = Math.min(start + chunkSize, pdfText.length);
      chunks.push(pdfText.slice(start, end));
      start += chunkSize - chunkOverlap;
      if (start >= pdfText.length) break;
    }

    this.logger.log(`Ingesting ${chunks.length} chunks into namespace: ${namespace}`);

    const vectors = await Promise.all(
      chunks.map(async (chunk, i) => ({
        id: `${namespace}-${i}-${uuidv4()}`,
        values: await this.embedText(chunk),
        metadata: { text: chunk, chunkIndex: i, namespace },
      })),
    );

    await this.pinecone.upsertVectors(vectors, namespace);
    this.logger.log(`✅ Upserted ${vectors.length} vectors to Pinecone`);
    return vectors.length;
  }

  async *queryRAG(question: string, namespace: string): AsyncIterable<string> {
    const queryEmbedding = await this.embedText(question);
    const matches = await this.pinecone.querySimilar(queryEmbedding, 4, namespace);

    const context = matches
      .filter((m) => (m.score ?? 0) > 0.4)
      .map((m) => (m.metadata?.text as string) ?? '')
      .filter(Boolean)
      .join('\n\n---\n\n');

    const systemPrompt = buildSystemPrompt(context);
    this.logger.log(`Querying Gemini with ${matches.length} context chunks`);
    yield* this.gemini.streamAnswer(systemPrompt, question);
  }
}