import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TableCell } from './TableCell';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        role === 'user'
          ? 'bg-blue-600 text-white ml-auto max-w-md'
          : 'bg-gray-700 text-gray-100 mr-auto max-w'
      }`}
    >
      <p className="font-semibold text-xs mb-1">{role === 'user' ? 'You' : 'AI'}</p>
      {role === 'assistant' ? (
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <code className="block bg-gray-900 p-2 rounded my-2 overflow-x-auto" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
                    {children}
                  </code>
                );
              },
              table: ({ children }) => (
                <table className="border-collapse border border-gray-600 my-2 w-full">{children}</table>
              ),
              thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => <tr className="border-b border-gray-600">{children}</tr>,
              th: ({ children }) => <TableCell isHeader>{children}</TableCell>,
              td: ({ children }) => <TableCell>{children}</TableCell>,
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-bold mb-1">{children}</h3>,
              hr: () => <hr className="mb-4 border-gray-600" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
};
