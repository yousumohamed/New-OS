
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
                        content: `# Jose Operating System (React OS)

Welcome to Jose OS! A fully functional desktop operating system simulator running entirely in your browser.

## Features

- **Window Management**: Drag, resize, minimize, maximize, and close windows just like a real desktop.
- **Taskbar**: Switch between open apps, check the time, and access the Start Menu.
- **Start Menu**: Launch apps and search for installed programs.
- **File System**: Create folders, manage files, and organize your documents.
- **Theme Support**: Toggle between Light and Dark modes.
- **Wallpaper**: Choose from preset wallpapers or use a solid color.

## Applications

### 📁 File Explorer
Navigate the virtual file system, create folders, upload files, and open documents.

### 📝 Text Editor
Create and edit text files. Supports saving changes to the virtual file system.

### 🤖 Gemini Chat
An AI-powered assistant using Google's Gemini API. 
- Chat naturally
- Generate images using \`/generate <prompt>\`
- Upload images for analysis

### 🌐 Browser
A simple iframe-based web browser to surf the web (supports embeddable sites).

### 🎮 Mini Games
A collection of classic arcade games:
- Snake
- Tic-Tac-Toe
- Memory Match
- Hangman
- Minesweeper
- 2048

### ⚙️ Settings
Customize your experience by changing the theme (Light/Dark) and desktop wallpaper.

### 🧮 Calculator
A fully functional standard calculator.

### 📺 Video Player
Play video files uploaded to the system.

### 💻 Terminal
A command-line interface with basic commands like \`ls\`, \`cd\`, \`cat\`, \`echo\`, and \`mkdir\`.

### 🗑️ Recycle Bin
Restore deleted files or permanently remove them.

## Tech Stack
- **React 19**: For building the UI components.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the desktop environment.
- **Google GenAI SDK**: For powering the Gemini Chat assistant.

---
*Built with ❤️ by Jose OS Team*
`,
                    }
                },
            },
        },
    },
};
