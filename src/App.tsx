import React, { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Message } from './types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatSession {
  id: string;
  messages: Message[];
  timestamp: string;
}

const App: React.FC = () => {
  const [chats, setChats] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chats');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    chats[0]?.id
  );

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    const newChat: ChatSession = {
      id: uuidv4(),
      messages: [],
      timestamp: new Date().toISOString(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(chats[1]?.id);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleAddMessage = (message: Message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: [...chat.messages, message],
          timestamp: new Date().toISOString(),
        };
      }
      return chat;
    }));
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />
        <main className="flex-1 relative">
          {currentChat ? (
            <Chat
              messages={currentChat.messages}
              onSendMessage={handleAddMessage}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 transition-colors"
              >
                Start a new chat
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;