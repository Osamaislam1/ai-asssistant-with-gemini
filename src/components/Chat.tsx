import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './chat/MessageBubble';
import { QuickReplies } from './chat/QuickReplies';
import { TypingIndicator } from './chat/TypingIndicator';
import { ChatInput } from './chat/ChatInput';
import { ErrorMessage } from './ErrorMessage';
import { Message } from '../types/chat';
import { useChat } from '../hooks/useChat';

const QUICK_REPLIES = [
  'Help me debug this code',
  'Explain this error',
  'Generate a code example',
  'Show API documentation'
];

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: Message) => void;
}

export const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const { isLoading, error, addMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    onSendMessage(userMessage);
    
    const response = await addMessage(content);
    if (response) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      onSendMessage(assistantMessage);
    }
  };

  const handleAttachment = (file: File) => {
    // Handle file attachment
    console.log('File attached:', file);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isLastMessage={index === messages.length - 1}
          />
        ))}
        
        {isLoading && <TypingIndicator />}
        {error && <ErrorMessage message={error} />}
        
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Welcome to AI Assistant
            </h2>
            <p className="text-gray-500 mb-8">
              Ask me anything about coding, debugging, or API documentation.
            </p>
            <QuickReplies
              suggestions={QUICK_REPLIES}
              onSelect={handleSend}
            />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSend}
        onAttach={handleAttachment}
        isLoading={isLoading}
      />
    </div>
  );
};