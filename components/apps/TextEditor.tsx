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
            const fileContent = findFileContent(fileSystem, fileId) || '';
            let decodedContent = fileContent;
            
            // Decode if content is a Base64 data URL
            if (fileContent.startsWith('data:')) {
                try {
                    decodedContent = atob(fileContent.split(',')[1]);
                } catch (e) {
                    console.error("Failed to decode Base64 content:", e);
                    decodedContent = 'Error: Could not read the contents of this file.';
                }
            }

            setContent(decodedContent);
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: data?.fileName || 'Text Editor' } });
        } else {
            setContent('');
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: 'Untitled Note' } });
        }
    }, [fileId, fileSystem, windowId, data?.fileName, dispatch]);
    
    useEffect(() => {
        const currentWindow = state.windows.find(w => w.id === windowId);
        if (!currentWindow) return;
        
        const currentTitle = currentWindow.title || '';
        const hasAsterisk = currentTitle.endsWith('*');

        if (!isSaved && !hasAsterisk) {
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: `${currentTitle}*` } });
        } else if (isSaved && hasAsterisk) {
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: currentTitle.slice(0, -1) } });
        }
    }, [isSaved, windowId, state.windows, dispatch]);

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
            const originalContent = findFileContent(fileSystem, fileId) || '';
            let contentToSave = content;

            // If the original file was a data URL, save it back in the same format
            if (originalContent.startsWith('data:')) {
                try {
                    const mimeType = originalContent.match(/^data:([^;]+);/)?.[1] || 'text/plain';
                    contentToSave = `data:${mimeType};base64,${btoa(content)}`;
                } catch (e) {
                    console.error("Failed to encode content to Base64:", e);
                    alert("Error saving file. Could not encode content.");
                    return;
                }
            }

            const newFileSystem = findAndUpdateFile(fileSystem, fileId, contentToSave);
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