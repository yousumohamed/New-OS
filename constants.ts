import type { AppDef, FileSystem } from './types';
import FileExplorer from './components/apps/FileExplorer';
import TextEditor from './components/apps/TextEditor';
import Settings from './components/apps/Settings';
import Calculator from './components/apps/Calculator';
import ChatBot from './components/apps/ChatBot';
import Browser from './components/apps/Browser';
import Terminal from './components/apps/Terminal';
import PlaceholderApp from './components/apps/PlaceholderApp';

import { 
    FileIcon, 
    SettingsIcon, 
    CalculatorIcon, 
    NoteIcon, 
    GeminiIcon, 
    ChromeIcon,
    TerminalIcon,
    YouTubeIcon,
    DriveIcon,
    MapsIcon
} from './components/icons/AppIcons';

export const APPS: AppDef[] = [
  { id: 'explorer', name: 'File Explorer', icon: FileIcon, component: FileExplorer, isPinned: true },
  { id: 'browser', name: 'Browser', icon: ChromeIcon, component: Browser, isPinned: true, data: { initialUrl: 'https://www.google.com' } },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon, component: Terminal, isPinned: true },
  { id: 'editor', name: 'Text Editor', icon: NoteIcon, component: TextEditor },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, component: Settings, isPinned: true },
  { id: 'calculator', name: 'Calculator', icon: CalculatorIcon, component: Calculator },
  { id: 'chatbot', name: 'Gemini Chat', icon: GeminiIcon, component: ChatBot, isPinned: true },
  { id: 'youtube', name: 'YouTube', icon: YouTubeIcon, component: Browser, data: { initialUrl: 'https://www.youtube.com' } },
  { id: 'drive', name: 'Google Drive', icon: DriveIcon, component: Browser, data: { initialUrl: 'https://drive.google.com' } },
  { id: 'maps', name: 'Google Maps', icon: MapsIcon, component: Browser, data: { initialUrl: 'https://maps.google.com' } },
];

export const DESKTOP_APPS = ['explorer', 'browser', 'chatbot'];

export const INITIAL_FILESYSTEM: FileSystem = {
  'C:': {
    id: 'C:',
    name: 'Local Disk (C:)',
    type: 'folder',
    path: 'C:',
    children: {
      'Users': {
        id: 'C:/Users',
        name: 'Users',
        type: 'folder',
        path: 'C:/Users',
        children: {
            'Public': {
                id: 'C:/Users/Public',
                name: 'Public',
                type: 'folder',
                path: 'C:/Users/Public',
                children: {
                    'welcome.txt': {
                        id: 'C:/Users/Public/welcome.txt',
                        name: 'welcome.txt',
                        type: 'file',
                        path: 'C:/Users/Public/welcome.txt',
                        content: 'Welcome to React OS!\n\nThis is a simple text editor. You can create, edit, and save notes.\n\nTry out the new Terminal app to interact with the file system!',
                    },
                }
            }
        },
      },
      'system.log': {
        id: 'C:/system.log',
        name: 'system.log',
        type: 'file',
        path: 'C:/system.log',
        content: 'System boot successful.',
      }
    },
  },
};