import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PineconeModule } from './services/pinecone/pinecone.module';
import { GeminiModule } from './services/gemini/gemini.module';
import { LangchainModule } from './services/langchain/langchain.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { ChatModule } from './modules/chat/chat.module';
import { HealthController } from './modules/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PineconeModule,
    GeminiModule,
    LangchainModule,
    PdfModule,
    ChatModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}