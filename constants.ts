import type { AppDef, FileSystem } from './types';

// App Components
import FileExplorer from './components/apps/FileExplorer';
import TextEditor from './components/apps/TextEditor';
import Settings from './components/apps/Settings';
import Calculator from './components/apps/Calculator';
import ChatBot from './components/apps/ChatBot';
import Browser from './components/apps/Browser';
import RecycleBin from './components/apps/RecycleBin';
import VideoPlayer from './components/apps/VideoPlayer';
import Terminal from './components/apps/Terminal';
// FIX: Corrected import path for MiniGames component.
import MiniGames from './components/apps/MiniGames';

// App Icons
// FIX: Renamed ChatBotIcon to GeminiIcon for consistency.
import {
    ExplorerIcon,
    EditorIcon,
    SettingsIcon,
    CalculatorIcon,
    GeminiIcon,
    BrowserIcon,
    RecycleBinIcon,
    VideoPlayerIcon,
    TerminalIcon,
    GamesIcon,
} from './components/icons/AppIcons';


export const APPS: AppDef[] = [
    {
        id: 'explorer',
        name: 'File Explorer',
        icon: ExplorerIcon,
        component: FileExplorer,
        isPinned: true,
    },
    {
        id: 'editor',
        name: 'Text Editor',
        icon: EditorIcon,
        component: TextEditor,
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: SettingsIcon,
        component: Settings,
    },
    {
        id: 'calculator',
        name: 'Calculator',
        icon: CalculatorIcon,
        component: Calculator,
    },
    {
        id: 'chatbot',
        name: 'Gemini Chat',
        // FIX: Use the renamed GeminiIcon.
        icon: GeminiIcon,
        component: ChatBot,
        isPinned: true,
    },
    {
        id: 'browser',
        name: 'Browser',
        icon: BrowserIcon,
        component: Browser,
        isPinned: true,
        data: { initialUrl: 'https://www.google.com/webhp?igu=1' }
    },
    {
        id: 'recycleBin',
        name: 'Recycle Bin',
        icon: RecycleBinIcon,
        component: RecycleBin,
    },
    {
        id: 'player',
        name: 'Video Player',
        icon: VideoPlayerIcon,
        component: VideoPlayer,
    },
    {
        id: 'terminal',
        name: 'Terminal',
        icon: TerminalIcon,
        component: Terminal,
    },
    {
        id: 'games',
        name: 'Mini Games',
        icon: GamesIcon,
        component: MiniGames,
    },
];

export const DESKTOP_APPS = ['explorer', 'chatbot', 'browser', 'recycleBin', 'games'];

export const INITIAL_FILESYSTEM: FileSystem = {
    'C:': {
        id: 'C:',
        name: 'C:',
        type: 'folder',
        path: 'C:',
        children: {
            'Documents': {
                id: 'C:/Documents',
                name: 'Documents',
                type: 'folder',
                path: 'C:/Documents',
                children: {
                    'hello.txt': {
                        id: 'C:/Documents/hello.txt',
                        name: 'hello.txt',
                        type: 'file',
                        path: 'C:/Documents/hello.txt',
                        content: 'Hello, world! Welcome to React OS.',
                    },
                },
            },
            'Projects': {
                id: 'C:/Projects',
                name: 'Projects',
                type: 'folder',
                path: 'C:/Projects',
                children: {
                    'react-os-README.md': {
                        id: 'C:/Projects/react-os-README.md',
                        name: 'react-os-README.md',
                        type: 'file',
                        path: 'C:/Projects/react-os-README.md',
                        content: '# React OS\n\nA simple web-based operating system built with React and TypeScript.',
                    }
                },
            },
        },
    },
};