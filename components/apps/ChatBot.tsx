
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatSession, ChatMessage, ChatMessagePart } from '../../types';
import { getChatResponse, generateImage } from '../../services/geminiService';
import { GeminiIcon, PlusIcon, TrashIcon, PaperclipIcon, SendIcon } from '../icons/AppIcons';
import { v4 as uuidv4 } from 'uuid'; // Simple unique ID generator

const ChatBot: React.FC = () => {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [uploadedImage, setUploadedImage] = useState<{data: string, mimeType: string} | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load sessions from localStorage on initial render
    useEffect(() => {
        try {
            const savedSessions = localStorage.getItem('chatSessions');
            if (savedSessions) {
                const parsedSessions = JSON.parse(savedSessions);
                setSessions(parsedSessions);
                if (parsedSessions.length > 0) {
                    setActiveSessionId(parsedSessions[0].id);
                } else {
                    handleNewChat();
                }
            } else {
                handleNewChat();
            }
        } catch (error) {
            console.error("Failed to load chat sessions from localStorage", error);
            handleNewChat();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save sessions to localStorage whenever they change
    useEffect(() => {
        if (sessions.length > 0) {
            localStorage.setItem('chatSessions', JSON.stringify(sessions));
        }
    }, [sessions]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [sessions, activeSessionId]);

    const handleNewChat = () => {
        const newSession: ChatSession = {
            id: uuidv4(),
            title: 'New Chat',
            messages: [],
        };
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
    };

    const handleDeleteChat = (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation();
        setSessions(prev => {
            const newSessions = prev.filter(s => s.id !== sessionId);
            if (activeSessionId === sessionId) {
                setActiveSessionId(newSessions.length > 0 ? newSessions[0].id : null);
            }
            if (newSessions.length === 0){
                 const newSession: ChatSession = { id: uuidv4(), title: 'New Chat', messages: [] };
                 setActiveSessionId(newSession.id)
                 return [newSession]
            }
            return newSessions;
        });
    };
    
    const updateSessionMessages = (sessionId: string, updater: (messages: ChatMessage[]) => ChatMessage[]) => {
        setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: updater(s.messages) } : s));
    };
    
    const handleSend = async () => {
        if (!activeSessionId) return;
        const trimmedInput = input.trim();
        if (trimmedInput === '' && !uploadedImage) return;

        const parts: ChatMessagePart[] = [];
        if (uploadedImage) parts.push({ type: 'image', ...uploadedImage });
        if (trimmedInput) parts.push({ type: 'text', text: trimmedInput });

        const userMessage: ChatMessage = { sender: 'user', parts };
        updateSessionMessages(activeSessionId, msgs => [...msgs, userMessage]);
        
        // Auto-generate title for new chats
        const activeSession = sessions.find(s => s.id === activeSessionId);
        if (activeSession && activeSession.messages.length === 0 && trimmedInput) {
            setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, title: trimmedInput.substring(0, 30) } : s));
        }

        setInput('');
        setUploadedImage(null);

        const loadingMessage: ChatMessage = { sender: 'bot', parts: [], isLoading: true };
        updateSessionMessages(activeSessionId, msgs => [...msgs, loadingMessage]);

        try {
            if (trimmedInput.startsWith('/generate ')) {
                const prompt = trimmedInput.replace('/generate ', '');
                const { base64Image, mimeType } = await generateImage(prompt);
                const botMessage: ChatMessage = { sender: 'bot', parts: [{ type: 'image', data: base64Image, mimeType }] };
                updateSessionMessages(activeSessionId, msgs => [...msgs.slice(0, -1), botMessage]);
            } else {
                const { text, sources } = await getChatResponse(parts);
                const botMessage: ChatMessage = { sender: 'bot', parts: [{ type: 'text', text }], sources };
                updateSessionMessages(activeSessionId, msgs => [...msgs.slice(0, -1), botMessage]);
            }
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'bot', parts: [{ type: 'text', text: 'Oops! Something went wrong.' }] };
            updateSessionMessages(activeSessionId, msgs => [...msgs.slice(0, -1), errorMessage]);
        }
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if(event.target?.result){
                    const base64Data = (event.target.result as string).split(',')[1];
                    setUploadedImage({ data: base64Data, mimeType: file.type });
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const activeSession = sessions.find(s => s.id === activeSessionId);

    return (
    <div className="flex h-full bg-[#181818] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#212121] flex flex-col p-2">
        <button onClick={handleNewChat} className="flex items-center justify-between w-full p-2 mb-2 rounded hover:bg-zinc-700">
          <span>New Chat</span>
          <PlusIcon className="w-5 h-5" />
        </button>
        <div className="flex-grow overflow-y-auto space-y-1">
          {sessions.map(session => (
            <div key={session.id} onClick={() => setActiveSessionId(session.id)}
                 className={`flex items-center justify-between p-2 rounded cursor-pointer ${activeSessionId === session.id ? 'bg-blue-os/50' : 'hover:bg-zinc-700/50'}`}>
              <p className="truncate text-sm">{session.title}</p>
              <button onClick={(e) => handleDeleteChat(e, session.id)} className="p-1 hover:bg-red-500/50 rounded-full text-zinc-400 hover:text-white">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col bg-white dark:bg-zinc-900 text-black dark:text-white rounded-l-lg">
        {!activeSession ? (
             <div className="flex-grow flex justify-center items-center"><p>Select or create a new chat.</p></div>
        ) : (
        <>
            <div className="flex-grow p-4 overflow-y-auto space-y-6">
                {activeSession.messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                         {msg.sender === 'bot' && <GeminiIcon className="w-8 h-8 flex-shrink-0" />}
                         <div className={`max-w-xl p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                            {msg.isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-os rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-blue-os rounded-full animate-pulse delay-75"></div>
                                    <div className="w-2 h-2 bg-blue-os rounded-full animate-pulse delay-150"></div>
                                </div>
                            ) : (
                                <>
                                {msg.parts.map((part, partIndex) => {
                                    if (part.type === 'text') return <p key={partIndex} className="whitespace-pre-wrap">{part.text}</p>;
                                    if (part.type === 'image') return <img key={partIndex} src={`data:${part.mimeType};base64,${part.data}`} alt="chat content" className="rounded-md max-w-xs"/>;
                                    return null;
                                })}
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-3 pt-2 border-t border-zinc-300 dark:border-zinc-600">
                                        <h4 className="text-xs font-semibold mb-1">Sources:</h4>
                                        <ul className="text-xs space-y-1">
                                            {msg.sources.map((source, i) => (
                                                <li key={i}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate block">{`[${i+1}] ${source.title}`}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                </>
                            )}
                         </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>
            <div className="flex-shrink-0 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                {uploadedImage && (
                    <div className="mb-2 relative w-24">
                        <img src={`data:${uploadedImage.mimeType};base64,${uploadedImage.data}`} alt="upload preview" className="rounded-md"/>
                        <button onClick={() => setUploadedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">&times;</button>
                    </div>
                )}
                <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2">
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden"/>
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full"><PaperclipIcon className="w-5 h-5"/></button>
                    <input type="text"
                        className="flex-grow bg-transparent focus:outline-none"
                        placeholder="Ask Gemini anything, or type '/generate' to create an image..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} disabled={(!input.trim() && !uploadedImage)} className="p-2 bg-blue-os text-white rounded-full disabled:bg-zinc-500"><SendIcon className="w-5 h-5"/></button>
                </div>
            </div>
        </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
