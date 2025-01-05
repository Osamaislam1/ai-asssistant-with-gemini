export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface CodeBlock {
  language: string;
  code: string;
}

export interface ChatContext {
  topics: Set<string>;
  codeSnippets: string[];
}