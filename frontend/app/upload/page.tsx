import PDFUploader from '@/components/pdf/PDFUploader';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Upload PDF</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Your PDF will be processed and indexed for intelligent Q&A.
          </p>
        </div>

        <PDFUploader />
      </div>
    </main>
  );
}