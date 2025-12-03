import React from 'react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力..."
        className="flex-1 p-2 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-600 hover:bg-blue-700 transition-colors"
      >
        {loading ? '送信中...' : '送信'}
      </button>
    </form>
  );
};
