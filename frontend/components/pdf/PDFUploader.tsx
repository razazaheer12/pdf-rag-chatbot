'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { usePDFUpload } from '@/hooks/usePDFUpload';

export default function PDFUploader() {
  const router = useRouter();
  const { uploadPDF, uploading, progress, error } = usePDFUpload();

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const result = await uploadPDF(file);
      if (result) {
        router.push(
          `/chat/${result.namespace}?filename=${encodeURIComponent(result.filename)}&pages=${result.pages}&chunks=${result.chunks}`,
        );
      }
    },
    [uploadPDF, router],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div className="w-full max-w-lg px-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-200 outline-none
          ${isDragActive ? 'border-violet-500 bg-violet-500/10' : 'border-gray-700 hover:border-violet-500/60 hover:bg-gray-800/50'}
          ${uploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Processing PDF...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                {isDragActive ? (
                  <FileText className="w-8 h-8 text-violet-400" />
                ) : (
                  <Upload className="w-8 h-8 text-violet-400" />
                )}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {isDragActive ? 'Drop your PDF here' : 'Upload your PDF'}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Drag & drop or click to browse • Max 20MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}