import { Message } from '@/types';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 md:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`
          w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
          ${isUser ? 'bg-violet-600' : 'bg-gray-700'}
        `}
      >
        {isUser
          ? <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          : <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300" />
        }
      </div>

      <div
        className={`
          max-w-[82%] md:max-w-[75%] rounded-2xl px-3 md:px-4 py-2.5 md:py-3 text-sm leading-relaxed
          ${isUser
            ? 'bg-violet-600 text-white rounded-tr-sm'
            : 'bg-gray-800 text-gray-100 rounded-tl-sm'
          }
        `}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              code: ({ children }) => (
                <code className="bg-gray-900 px-1.5 py-0.5 rounded text-violet-300 text-xs font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {message.content || (message.isStreaming ? '▋' : '')}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}