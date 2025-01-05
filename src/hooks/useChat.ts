import { useState, useEffect } from 'react';
import { Message, ChatContext } from '../types/chat';
import { generateResponse, initializeChat } from '../lib/gemini';
import { loadChatHistory, saveChatHistory } from '../utils/storage';
import { extractTopics, extractCodeSnippets } from '../utils/contextExtractor';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<ChatContext>({ topics: new Set(), codeSnippets: [] });

  const updateContext = (content: string) => {
    setContext(prev => {
      const topics = new Set(prev.topics);
      const messageTopics = extractTopics(content);
      messageTopics.forEach(topic => topics.add(topic));

      const codeSnippets = [
        ...prev.codeSnippets,
        ...extractCodeSnippets(content)
      ].slice(-5);

      return { topics, codeSnippets };
    });
  };

  const addMessage = async (content: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateResponse(content);
      updateContext(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    context,
    addMessage,
  };
};