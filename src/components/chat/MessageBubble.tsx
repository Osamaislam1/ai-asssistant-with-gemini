import React from 'react';
import { Check, Clock } from 'lucide-react';
import { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
  isLastMessage?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLastMessage }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`group flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] ${isAssistant ? 'bg-white' : 'bg-blue-600 text-white'} 
        rounded-2xl px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md
        ${isAssistant ? 'rounded-tl-none' : 'rounded-tr-none'}`}
      >
        <div className="prose max-w-none dark:prose-invert">
          {message.content}
        </div>
        <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
          <time dateTime={message.timestamp}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </time>
          {!isAssistant && (
            <span className="flex items-center">
              {isLastMessage ? (
                <Check className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};