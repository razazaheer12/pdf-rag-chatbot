import Link from 'next/link';
import { ArrowRight, FileText, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-violet-400 text-sm">
            <Zap className="w-3.5 h-3.5" />
            Powered by Grok AI + RAG
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Chat with your
            <span className="text-violet-400"> PDF</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Upload any PDF and ask questions. Get instant answers powered by Grok AI.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-left">
          {[
            { icon: FileText, title: 'Any PDF', desc: 'Upload research, books, reports' },
            { icon: Zap, title: 'Instant Answers', desc: 'Streaming responses in real-time' },
            { icon: Shield, title: 'Context-Aware', desc: 'Answers strictly from your document' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <Icon className="w-5 h-5 text-violet-400 mb-2" />
              <p className="text-white text-sm font-medium">{title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/upload"
          className="
            inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500
            text-white font-semibold px-8 py-4 rounded-xl text-base
            transition-all duration-200 group
          "
        >
          Get Started
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}