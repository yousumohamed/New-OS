import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { WindowState, Settings, FileSystem, AppDef, FileSystemNode } from '../types';
import { APPS, INITIAL_FILESYSTEM } from '../constants';

// STATE INTERFACE
interface DesktopState {
  windows: WindowState[];
  settings: Settings;
  fileSystem: FileSystem;
  recycleBin: FileSystemNode[];
  pinnedAppIds: string[];
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
  | { type: 'DELETE_NODE'; payload: { path: string } } // Kept for potential future use
  | { type: 'SET_WINDOW_TITLE'; payload: { windowId: string; title: string } }
  | { type: 'MOVE_TO_RECYCLE_BIN'; payload: { path: string } }
  | { type: 'RESTORE_NODE'; payload: { nodeId: string } }
  | { type: 'PERMANENTLY_DELETE_NODE'; payload: { nodeId: string } }
  | { type: 'EMPTY_RECYCLE_BIN' }
  | { type: 'PIN_APP_TO_TASKBAR'; payload: { appId: string } }
  | { type: 'UNPIN_APP_FROM_TASKBAR'; payload: { appId: string } }
  | { type: 'UPLOAD_FILE'; payload: { parentPath: string; fileName: string; fileContent: string } };

const getAppById = (appId: string): AppDef | undefined => APPS.find(app => app.id === appId);

const findNodeByPath = (fs: FileSystem, path: string): FileSystemNode | null => {
    const search = (node: FileSystemNode, currentPath: string): FileSystemNode | null => {
        if (node.path === currentPath) return node;
        if (node.children) {
            for (const child of Object.values(node.children)) {
                const found = search(child, currentPath);
                if (found) return found;
            }
        }
        return null;
    }

    for (const rootNode of Object.values(fs)) {
        const result = search(rootNode, path);
        if (result) return result;
    }
    return null;
}

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
        
        const newFileSystem = JSON.parse(JSON.stringify(state.fileSystem));
        const parentNode = findNodeByPath(newFileSystem, parentPath);

        if (parentNode && parentNode.type === 'folder' && parentNode.children) {
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

    case 'UPLOAD_FILE': {
        const { parentPath, fileName, fileContent } = action.payload;
        if (!fileName || !fileContent) return state;

        const newFileSystem = JSON.parse(JSON.stringify(state.fileSystem));
        const parentNode = findNodeByPath(newFileSystem, parentPath);

        if (parentNode && parentNode.type === 'folder' && parentNode.children) {
            if (parentNode.children[fileName]) {
                alert(`A file named "${fileName}" already exists in this location.`);
                return state;
            }
            const newPath = `${parentNode.path === 'C:' ? 'C:' : parentNode.path}/${fileName}`;
            parentNode.children[fileName] = {
                id: newPath,
                name: fileName,
                type: 'file',
                path: newPath,
                content: fileContent,
            };
            return { ...state, fileSystem: newFileSystem };
        }
        return state;
    }

    case 'MOVE_TO_RECYCLE_BIN': {
      const { path } = action.payload;
      const pathParts = path.split('/');
      if (pathParts.length < 2) return state; // Can't delete C: drive

      const newFileSystem = JSON.parse(JSON.stringify(state.fileSystem));
      const childName = pathParts.pop()!;
      const parentPath = pathParts.length === 1 ? 'C:' : pathParts.join('/');
      const parentNode = findNodeByPath(newFileSystem, parentPath);
      
      if (parentNode && parentNode.children && parentNode.children[childName]) {
        const nodeToDelete = { ...parentNode.children[childName], originalPath: parentNode.children[childName].path };
        delete parentNode.children[childName];
        
        return { 
          ...state, 
          fileSystem: newFileSystem,
          recycleBin: [...state.recycleBin, nodeToDelete],
        };
      }
      return state;
    }

    case 'RESTORE_NODE': {
      const { nodeId } = action.payload;
      const nodeToRestore = state.recycleBin.find(node => node.id === nodeId);
      if (!nodeToRestore || !nodeToRestore.originalPath) return state;

      const newFileSystem = JSON.parse(JSON.stringify(state.fileSystem));
      const pathParts = nodeToRestore.originalPath.split('/');
      const childName = pathParts.pop()!;
      const parentPath = pathParts.length === 1 ? 'C:' : pathParts.join('/');
      const parentNode = findNodeByPath(newFileSystem, parentPath);

      if (parentNode && parentNode.children) {
        if (parentNode.children[childName]) {
            alert(`An item named "${childName}" already exists in the original location.`);
            return state;
        }
        const { originalPath, ...restoredNode } = nodeToRestore;
        parentNode.children[childName] = restoredNode;
        
        return {
          ...state,
          fileSystem: newFileSystem,
          recycleBin: state.recycleBin.filter(node => node.id !== nodeId),
        };
      }
      return state;
    }
    
    case 'PERMANENTLY_DELETE_NODE':
      return {
        ...state,
        recycleBin: state.recycleBin.filter(node => node.id !== action.payload.nodeId),
      };

    case 'EMPTY_RECYCLE_BIN':
      return {
        ...state,
        recycleBin: [],
      };
      
    case 'PIN_APP_TO_TASKBAR': {
        if (state.pinnedAppIds.includes(action.payload.appId)) return state;
        return {
            ...state,
            pinnedAppIds: [...state.pinnedAppIds, action.payload.appId],
        };
    }
    case 'UNPIN_APP_FROM_TASKBAR': {
        return {
            ...state,
            pinnedAppIds: state.pinnedAppIds.filter(id => id !== action.payload.appId),
        };
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
    const defaultPinned = APPS.filter(app => app.isPinned).map(app => app.id);
    
    const defaultState: DesktopState = {
        windows: [],
        settings: { theme: 'dark', wallpaper: 'bg-zinc-900' },
        fileSystem: INITIAL_FILESYSTEM,
        recycleBin: [],
        pinnedAppIds: defaultPinned,
        nextZIndex: 10,
    };

    try {
        const savedState = localStorage.getItem('desktopState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            const windows = Array.isArray(parsedState.windows) ? parsedState.windows : defaultState.windows;
            const settings = parsedState.settings ? { ...defaultState.settings, ...parsedState.settings } : defaultState.settings;
            const fileSystem = parsedState.fileSystem ? parsedState.fileSystem : defaultState.fileSystem;
            const recycleBin = Array.isArray(parsedState.recycleBin) ? parsedState.recycleBin : defaultState.recycleBin;
            const pinnedAppIds = Array.isArray(parsedState.pinnedAppIds) ? parsedState.pinnedAppIds : defaultState.pinnedAppIds;


            const maxZIndex = windows.length > 0
                ? Math.max(...windows.map((w: WindowState) => w.zIndex || 0))
                : 9;
                
            return {
                windows,
                settings,
                fileSystem,
                recycleBin,
                pinnedAppIds,
                nextZIndex: maxZIndex + 1,
            };
        }
    } catch (error) {
        console.error("Failed to load or parse state from localStorage, using default state.", error);
        localStorage.removeItem('desktopState');
    }
    
    return defaultState;
};

export const DesktopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(desktopReducer, getInitialState());

  useEffect(() => {
    try {
        const stateToSave = { ...state };
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