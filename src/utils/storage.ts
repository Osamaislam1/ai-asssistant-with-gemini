import { Message } from '../types/chat';

const CHAT_HISTORY_KEY = 'chat_history';
const MAX_HISTORY_ITEMS = 50;

export function saveChatHistory(messages: Message[]): void {
  try {
    const historyToSave = messages.slice(-MAX_HISTORY_ITEMS);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(historyToSave));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
}

export function loadChatHistory(): Message[] {
  try {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
}