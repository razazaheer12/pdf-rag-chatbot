import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { QueryDto } from './dto/query.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('query')
  async query(@Body() body: QueryDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    try {
      for await (const token of this.chatService.streamAnswer(
        body.question,
        body.namespace,
      )) {
        const payload = JSON.stringify({ token });
        res.write(`data: ${payload}\n\n`);
        (res as any).flush?.();
      }
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    } catch (err) {
      console.error('Stream error:', err);
      res.write(`data: ${JSON.stringify({ error: 'Something went wrong' })}\n\n`);
    } finally {
      res.end();
    }
  }
}