import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types';
import { getChatResponse } from '../../services/geminiService';
import { GeminiIcon } from '../icons/AppIcons';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { text, sources } = await getChatResponse(input);
      const botMessage: ChatMessage = { sender: 'bot', text, sources };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Oops! Something went wrong.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && <GeminiIcon className="w-8 h-8 flex-shrink-0" />}
            <div className={`max-w-xl p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-os text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-zinc-300 dark:border-zinc-600">
                  <h4 className="text-xs font-semibold mb-1">Sources:</h4>
                  <ul className="text-xs space-y-1">
                    {msg.sources.map((source, i) => (
                      <li key={i}>
                        <a
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline truncate block"
                          title={source.title}
                        >
                          {`[${i+1}] ${source.title}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <GeminiIcon className="w-8 h-8 flex-shrink-0" />
                <div className="max-w-xl p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-os rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-os rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-blue-os rounded-full animate-pulse delay-150"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-shrink-0 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow p-2 rounded bg-zinc-200 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-os"
            placeholder="Ask Gemini anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="px-4 py-2 rounded bg-blue-os text-white font-semibold disabled:bg-zinc-400 dark:disabled:bg-zinc-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;