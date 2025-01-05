import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy } from 'lucide-react';
import type { CodeBlock } from '../types/chat';

interface CodeEditorProps {
  codeBlock: CodeBlock;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ codeBlock }) => {
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeBlock.code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-gray-200 text-sm">{codeBlock.language}</span>
        <button
          onClick={copyCode}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          <Copy size={16} />
        </button>
      </div>
      <SyntaxHighlighter
        language={codeBlock.language}
        style={vs2015}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
        }}
      >
        {codeBlock.code}
      </SyntaxHighlighter>
    </div>
  );
};