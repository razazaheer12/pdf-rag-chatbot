import ChatWindow from '@/components/chat/ChatWindow';
import Sidebar from '@/components/ui/Sidebar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ namespace: string }>;
  searchParams: Promise<{ filename?: string; pages?: string; chunks?: string }>;
}

export default async function ChatPage({ params, searchParams }: Props) {
  const { namespace } = await params;
  const { filename, pages, chunks } = await searchParams;

  const pdfName = decodeURIComponent(filename ?? 'Document');
  const pagesCount = parseInt(pages ?? '0', 10);
  const chunksCount = parseInt(chunks ?? '0', 10);

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar pdfName={pdfName} pages={pagesCount} chunks={chunksCount} />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <Link href="/upload" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-gray-500 text-xs">Upload new PDF</span>
        </div>
        <ChatWindow namespace={namespace} pdfName={pdfName} />
      </div>
    </div>
  );
}