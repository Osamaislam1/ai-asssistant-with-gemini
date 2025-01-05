import React from 'react';

interface QuickReplyProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const QuickReplies: React.FC<QuickReplyProps> = ({ suggestions, onSelect }) => (
  <div className="flex flex-wrap gap-2 my-4">
    {suggestions.map((suggestion, index) => (
      <button
        key={index}
        onClick={() => onSelect(suggestion)}
        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full 
          hover:bg-gray-200 transition-colors duration-200 focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {suggestion}
      </button>
    ))}
  </div>
);