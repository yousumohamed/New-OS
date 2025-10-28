import type React from 'react';

export interface AppDef {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  component: React.FC<{ windowId: string; data?: any }>;
  isPinned?: boolean;
  data?: any; // Add data for initial props
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  data?: any; 
}

export type FileSystemNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: { [key: string]: FileSystemNode };
  path: string;
  originalPath?: string; // For Recycle Bin restore functionality
};

export type FileSystem = { [key: string]: FileSystemNode };

export type Theme = 'light' | 'dark';

export interface Settings {
    theme: Theme;
    wallpaper: string;
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export type ChatMessagePart = 
    | { type: 'text'; text: string }
    | { type: 'image'; data: string; mimeType: string }; // data is base64 string

export interface ChatMessage {
    sender: 'user' | 'bot';
    parts: ChatMessagePart[];
    sources?: GroundingSource[];
    isLoading?: boolean;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
}


export interface ContextMenuItem {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
}