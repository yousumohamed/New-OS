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

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    sources?: GroundingSource[];
}

export interface ContextMenuItem {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
}