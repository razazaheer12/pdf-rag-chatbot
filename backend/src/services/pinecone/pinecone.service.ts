import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pinecone, RecordMetadata } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService implements OnModuleInit {
  private client: Pinecone;
  private indexName: string;
  private readonly logger = new Logger(PineconeService.name);

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const apiKey = this.config.get<string>('pinecone.apiKey') as string;
    this.indexName = this.config.get<string>('pinecone.indexName') as string;

    this.client = new Pinecone({ apiKey });
    this.logger.log(`✅ Pinecone connected — index: ${this.indexName}`);
  }

  getIndex() {
    return this.client.index(this.indexName);
  }

  async upsertVectors(
    vectors: { id: string; values: number[]; metadata: Record<string, any> }[],
    namespace: string,
  ) {
    const index = this.getIndex().namespace(namespace);

    for (let i = 0; i < vectors.length; i += 100) {
      const batch = vectors.slice(i, i + 100);
      // ✅ Pinecone new SDK — records key required
      await index.upsert({
        records: batch.map((v) => ({
          id: v.id,
          values: v.values,
          metadata: v.metadata as RecordMetadata,
        })),
      } as any);
    }
  }

  async querySimilar(embedding: number[], topK: number, namespace: string) {
    const index = this.getIndex().namespace(namespace);
    const result = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
    });
    return result.matches ?? [];
  }

  async deleteNamespace(namespace: string) {
    await this.getIndex().namespace(namespace).deleteAll();
  }
}