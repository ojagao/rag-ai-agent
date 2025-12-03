'use client';

import { useState } from 'react';
import axios from 'axios';
import { ChatContainer } from '@/components/ChatContainer';
import { ChatInput } from '@/components/ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8005/api/chat', {
        message: input,
        history: messages,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Simple error handling for MVP
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not get response from agent.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <ChatContainer messages={messages} loading={loading} />
      <ChatInput
        input={input}
        setInput={setInput}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
