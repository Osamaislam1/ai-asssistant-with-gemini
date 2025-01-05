import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Copy, Check, Code2 } from 'lucide-react';
import type { Message } from '../types/chat';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#282c34] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] text-gray-200">
        <div className="flex items-center gap-2">
          <Code2 size={16} />
          <span className="text-sm font-mono">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-300 hover:text-white
            transition-colors rounded hover:bg-[#353a44]"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            background: 'transparent',
            padding: 0,
            fontSize: '0.875rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`${isAssistant ? 'bg-gray-50' : 'bg-white'} border-b border-black/10`}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-4 text-base md:gap-6">
          <div className="flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center rounded-sm">
            {isAssistant ? (
              <div className="w-full h-full flex items-center justify-center rounded-sm bg-teal-500 text-white">
                <Bot size={18} />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-sm bg-black text-white">
                <User size={18} />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4 overflow-x-auto prose prose-slate max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : 'text';
                  const isInline = !match;
                  
                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 bg-gray-100 rounded font-mono text-sm text-black/70" {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock
                      language={language}
                      code={String(children).replace(/\n$/, '')}
                    />
                  );
                },
                p: ({ children }) => (
                  <p className="mb-4 text-gray-800 leading-7 whitespace-pre-wrap">{children}</p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">{children}</h3>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-800">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-8 mb-4 space-y-2 text-gray-800">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-800">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-700">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-blue-600 hover:text-blue-800 hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="my-4 overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-gray-800 border-t">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};