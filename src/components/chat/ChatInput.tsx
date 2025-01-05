import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onAttach: (file: File) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, onAttach, isLoading }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAttach(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-4 py-3 rounded-full border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              pr-12"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 
              text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};