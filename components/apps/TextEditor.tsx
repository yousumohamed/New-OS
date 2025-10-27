import React, { useState, useEffect, useCallback } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { FileSystem, FileSystemNode } from '../../types';

interface TextEditorProps {
  windowId: string;
  data?: { fileId: string; fileName: string };
}

// Helper to find and update a file in the nested file system
const findAndUpdateFile = (fs: FileSystem, fileId: string, newContent: string): FileSystem => {
    const newFs = JSON.parse(JSON.stringify(fs)); // Deep copy

    const searchAndUpdate = (node: FileSystemNode) => {
        if (node.id === fileId && node.type === 'file') {
            node.content = newContent;
            return true;
        }
        if (node.type === 'folder' && node.children) {
            for (const key in node.children) {
                if (searchAndUpdate(node.children[key])) return true;
            }
        }
        return false;
    };

    for (const key in newFs) {
        if (searchAndUpdate(newFs[key])) break;
    }
    return newFs;
};

// Helper to find file content
const findFileContent = (fs: FileSystem, fileId: string): string | undefined => {
    let content: string | undefined = undefined;

    const search = (node: FileSystemNode) => {
        if (content) return;
        if (node.id === fileId && node.type === 'file') {
            content = node.content;
            return;
        }
        if (node.type === 'folder' && node.children) {
            for (const key in node.children) {
                search(node.children[key]);
            }
        }
    };
    
    for (const key in fs) {
        search(fs[key]);
    }
    return content;
};


const TextEditor: React.FC<TextEditorProps> = ({ windowId, data }) => {
    const { state, dispatch } = useDesktop();
    const { fileSystem } = state;
    const fileId = data?.fileId;

    const [content, setContent] = useState('');
    const [isSaved, setIsSaved] = useState(true);

    useEffect(() => {
        if (fileId) {
            const fileContent = findFileContent(fileSystem, fileId);
            setContent(fileContent || '');
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: data?.fileName || 'Text Editor' } });
        } else {
            setContent('');
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: 'Untitled Note' } });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileId, fileSystem, windowId, data?.fileName]);
    
    useEffect(() => {
        if (!isSaved) {
            const currentTitle = state.windows.find(w => w.id === windowId)?.title || '';
            if (!currentTitle.endsWith('*')) {
                dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: `${currentTitle}*` } });
            }
        } else {
             const currentTitle = state.windows.find(w => w.id === windowId)?.title || '';
             if (currentTitle.endsWith('*')) {
                dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: currentTitle.slice(0, -1) } });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaved, windowId, state.windows]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsSaved(false);
    };

    const handleSave = useCallback(() => {
        if (!fileId) {
            alert("Cannot save new file yet. Please open an existing file.");
            return;
        }
        if (!isSaved) {
            const newFileSystem = findAndUpdateFile(fileSystem, fileId, content);
            dispatch({ type: 'UPDATE_FILESYSTEM', payload: newFileSystem });
            setIsSaved(true);
        }
    }, [fileId, content, fileSystem, dispatch, isSaved]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-shrink-0 p-1 bg-zinc-100 dark:bg-zinc-700">
                <button 
                    onClick={handleSave} 
                    className="px-3 py-1 text-sm rounded bg-blue-os text-white disabled:bg-zinc-400 dark:disabled:bg-zinc-600"
                    disabled={isSaved}
                >
                    Save
                </button>
            </div>
            <textarea
                className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-zinc-900 focus:outline-none resize-none"
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing..."
            />
        </div>
    );
};

export default TextEditor;