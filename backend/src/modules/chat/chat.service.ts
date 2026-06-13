import { Injectable } from '@nestjs/common';
import { LangchainService } from '../../services/langchain/langchain.service';

@Injectable()
export class ChatService {
  constructor(private readonly langchain: LangchainService) {}

  async *streamAnswer(
    question: string,
    namespace: string,
  ): AsyncIterable<string> {
    yield* this.langchain.queryRAG(question, namespace);
  }
}
