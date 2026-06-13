export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface PDFInfo {
  namespace: string;
  filename: string;
  pages: number;
  chunks: number;
}

export interface UploadResponse {
  success: boolean;
  namespace: string;
  filename: string;
  pages: number;
  chunks: number;
  message: string;
}