import { useState } from 'react';
import api from '@/lib/api';
import { PDFInfo, UploadResponse } from '@/types';

export function usePDFUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadPDF = async (file: File): Promise<PDFInfo | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post<UploadResponse>('/api/pdf/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / (e.total ?? 1));
          setProgress(pct);
        },
      });

      return {
        namespace: data.namespace,
        filename: data.filename,
        pages: data.pages,
        chunks: data.chunks,
      };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Upload failed. Please try again.';
      setError(msg);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadPDF, uploading, progress, error };
}