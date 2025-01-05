import React from 'react';
import { Code2, BookOpen, Settings, HelpCircle, User } from 'lucide-react';

export const Header = () => (
  <header className="bg-white border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:justify-start">
          <div className="flex items-center">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              Gemini Code Assistant
            </h1>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100">
            <BookOpen className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100">
            <User className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </div>
  </header>
);