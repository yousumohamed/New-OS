import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { WindowState, Settings, FileSystem, AppDef, FileSystemNode } from '../types';
import { APPS, INITIAL_FILESYSTEM } from '../constants';

// STATE INTERFACE
interface DesktopState {
  windows: WindowState[];
  settings: Settings;
  fileSystem: FileSystem;
  nextZIndex: number;
}

// ACTIONS
type Action =
  | { type: 'OPEN_WINDOW'; payload: { appId: string; data?: any } }
  | { type: 'CLOSE_WINDOW'; payload: { windowId: string } }
  | { type: 'FOCUS_WINDOW'; payload: { windowId: string } }
  | { type: 'TOGGLE_MINIMIZE'; payload: { windowId: string } }
  | { type: 'TOGGLE_MAXIMIZE'; payload: { windowId: string } }
  | { type: 'MOVE_WINDOW'; payload: { windowId: string; position: { x: number; y: number } } }
  | { type: 'RESIZE_WINDOW'; payload: { windowId: string; size: { width: number; height: number } } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'UPDATE_FILESYSTEM'; payload: FileSystem }
  | { type: 'CREATE_FOLDER'; payload: { parentPath: string; folderName: string } }
  | { type: 'SET_WINDOW_TITLE'; payload: { windowId: string; title: string } };

const getAppById = (appId: string): AppDef | undefined => APPS.find(app => app.id === appId);

// REDUCER
const desktopReducer = (state: DesktopState, action: Action): DesktopState => {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { appId, data } = action.payload;
      const app = getAppById(appId);
      if (!app) return state;

      const newWindow: WindowState = {
        id: `win-${Date.now()}`,
        appId,
        title: data?.fileName || app.name,
        position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
        size: { width: 700, height: 500 },
        zIndex: state.nextZIndex,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
        data,
      };

      return {
        ...state,
        windows: [...state.windows.map(w => ({ ...w, isFocused: false })), newWindow],
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload.windowId),
      };
    case 'FOCUS_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w => ({
          ...w,
          isFocused: w.id === action.payload.windowId,
          zIndex: w.id === action.payload.windowId ? state.nextZIndex : w.zIndex,
        })),
        nextZIndex: state.nextZIndex + 1,
      };
    case 'TOGGLE_MINIMIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, isMinimized: !w.isMinimized } : w
        ),
      };
    case 'TOGGLE_MAXIMIZE':
        return {
          ...state,
          windows: state.windows.map(w =>
            w.id === action.payload.windowId ? { ...w, isMaximized: !w.isMaximized } : w
          ),
        };
    case 'MOVE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, position: action.payload.position } : w
        ),
      };
    case 'RESIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, size: action.payload.size } : w
        ),
      };
    case 'UPDATE_SETTINGS':
        return {
            ...state,
            settings: { ...state.settings, ...action.payload },
        };
    case 'UPDATE_FILESYSTEM':
        return { ...state, fileSystem: action.payload };
    
    case 'CREATE_FOLDER': {
        const { parentPath, folderName } = action.payload;
        if (!folderName) return state;
        
        const newFileSystem: FileSystem = JSON.parse(JSON.stringify(state.fileSystem));
        
        const findParent = (node: FileSystemNode, path: string): FileSystemNode | null => {
            if (node.path === path && node.type === 'folder') return node;
            if (node.children) {
                for (const child of Object.values(node.children)) {
                    const found = findParent(child, path);
                    if (found) return found;
                }
            }
            return null;
        }

        let parentNode: FileSystemNode | null = null;
        for (const rootNode of Object.values(newFileSystem)) {
             parentNode = findParent(rootNode, parentPath);
             if (parentNode) break;
        }

        if (parentNode && parentNode.children) {
            if (parentNode.children[folderName]) {
                alert(`A folder named "${folderName}" already exists.`);
                return state;
            }
            const newPath = `${parentNode.path === 'C:' ? 'C:' : parentNode.path}/${folderName}`;
            parentNode.children[folderName] = {
                id: newPath,
                name: folderName,
                type: 'folder',
                path: newPath,
                children: {},
            };
            return { ...state, fileSystem: newFileSystem };
        }
        return state;
    }

    case 'SET_WINDOW_TITLE':
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === action.payload.windowId ? { ...w, title: action.payload.title } : w
        ),
      };
    default:
      return state;
  }
};

// CONTEXT
const DesktopContext = createContext<{ state: DesktopState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// PROVIDER
const getInitialState = (): DesktopState => {
    const defaultState: DesktopState = {
        windows: [],
        settings: { theme: 'dark', wallpaper: 'bg-zinc-900' },
        fileSystem: INITIAL_FILESYSTEM,
        nextZIndex: 10,
    };

    try {
        const savedState = localStorage.getItem('desktopState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            const windows = Array.isArray(parsedState.windows) ? parsedState.windows : defaultState.windows;
            const settings = parsedState.settings ? { ...defaultState.settings, ...parsedState.settings } : defaultState.settings;
            const fileSystem = parsedState.fileSystem ? parsedState.fileSystem : defaultState.fileSystem;

            const maxZIndex = windows.length > 0
                ? Math.max(...windows.map((w: WindowState) => w.zIndex || 0))
                : 9;
                
            return {
                windows,
                settings,
                fileSystem,
                nextZIndex: maxZIndex + 1,
            };
        }
    } catch (error) {
        console.error("Failed to load or parse state from localStorage, using default state.", error);
        // If parsing fails, clear the corrupted state to prevent future errors
        localStorage.removeItem('desktopState');
    }
    
    return defaultState;
};

export const DesktopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(desktopReducer, getInitialState());

  useEffect(() => {
    try {
        // Filter out any potentially problematic properties before saving
        const stateToSave = {
            ...state,
            // You can add filtering here if needed, e.g., ensure windows is an array
        };
        localStorage.setItem('desktopState', JSON.stringify(stateToSave));
    } catch (error) {
        console.error("Failed to save state to localStorage", error);
    }
  }, [state]);

  useEffect(() => {
    if (state.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.settings.theme]);

  return (
    <DesktopContext.Provider value={{ state, dispatch }}>
      {children}
    </DesktopContext.Provider>
  );
};

// HOOK
export const useDesktop = () => {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};