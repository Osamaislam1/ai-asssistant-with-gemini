import React from 'react';
import { Code2, Terminal, BookOpen, FileText } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'code', label: 'Code Snippets', icon: <Code2 className="w-4 h-4" /> },
  { id: 'logs', label: 'Logs & Debugging', icon: <Terminal className="w-4 h-4" /> },
  { id: 'docs', label: 'API Documentation', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'guides', label: 'Integration Guides', icon: <FileText className="w-4 h-4" /> },
];

export const OutputPanel = () => {
  const [activeTab, setActiveTab] = React.useState('code');

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="border-b">
        <nav className="flex space-x-4 px-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-3 border-b-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        {/* Tab content will be rendered here */}
        <div className="h-64 flex items-center justify-center text-gray-500">
          {activeTab === 'code' && 'Code snippets will appear here'}
          {activeTab === 'logs' && 'Debugging logs will appear here'}
          {activeTab === 'docs' && 'API documentation will appear here'}
          {activeTab === 'guides' && 'Integration guides will appear here'}
        </div>
      </div>
    </div>
  );
};