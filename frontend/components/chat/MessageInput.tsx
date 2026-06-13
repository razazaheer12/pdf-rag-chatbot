'use client';
import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-3 p-4 border-t border-gray-800 bg-gray-950">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask a question about your PDF..."
        rows={1}
        className="
          flex-1 resize-none bg-gray-800 text-white placeholder-gray-500
          rounded-xl px-4 py-3 text-sm outline-none border border-gray-700
          focus:border-violet-500 transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          max-h-40 overflow-y-auto
        "
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || disabled}
        className="
          w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500
          flex items-center justify-center flex-shrink-0
          transition-all duration-200 disabled:opacity-40
          disabled:cursor-not-allowed disabled:hover:bg-violet-600
        "
      >
        <Send className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}