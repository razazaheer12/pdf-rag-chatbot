'use client';
import { FileText, Layers, BookOpen, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  pdfName: string;
  pages: number;
  chunks: number;
}

export default function Sidebar({ pdfName, pages, chunks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-gray-800 border border-gray-700 rounded-lg p-2"
        onClick={() => setOpen(!open)}
      >
        <FileText className="w-4 h-4 text-violet-400" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-gray-900 border-r border-gray-800
          flex flex-col p-4 shrink-0
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white font-bold text-lg">PDF Chat</h1>
            <p className="text-gray-500 text-xs mt-0.5">Powered by Gemini AI</p>
          </div>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {pdfName && (
          <div className="bg-gray-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-white text-sm font-medium truncate">{pdfName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{pages} pages</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Layers className="w-3.5 h-3.5" />
              <span>{chunks} chunks indexed</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}