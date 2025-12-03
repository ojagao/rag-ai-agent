import React from 'react';
import { ChatMessage } from './ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  loading: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, loading }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 border border-gray-700 p-4 rounded bg-gray-800">
      {messages.length === 0 && (
        <p className="text-gray-400 text-center flex justify-center items-center h-full">こんにちは、お手伝いできることはありますか？</p>
      )}
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} role={msg.role} content={msg.content} />
      ))}
      {loading && (
        <div className="bg-gray-700 mr-auto max-w-md p-4 rounded-lg">
          <p className="animate-pulse text-gray-300">Thinking...</p>
        </div>
      )}
    </div>
  );
};
