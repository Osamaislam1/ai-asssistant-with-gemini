import React from 'react';
import { PlusCircle, MessageSquare, Trash2 } from 'lucide-react';
import { Message } from '../../types/chat';

interface SidebarProps {
  chats: { id: string; messages: Message[]; timestamp: string }[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  currentChatId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  currentChatId,
}) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPreviewText = (messages: Message[]) => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return 'New Chat';
    return lastMessage.content.slice(0, 40) + (lastMessage.content.length > 40 ? '...' : '');
  };

  return (
    <div className="w-64 h-full bg-gray-50 border-r flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
            bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
            font-medium"
        >
          <PlusCircle size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-2 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer
                transition-colors hover:bg-gray-100
                ${currentChatId === chat.id ? 'bg-gray-100' : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <MessageSquare size={18} className="text-gray-500" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {getPreviewText(chat.messages)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimestamp(chat.timestamp)}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 
                  rounded transition-all"
                aria-label="Delete chat"
              >
                <Trash2 size={16} className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};