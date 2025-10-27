import React, { useState, useEffect, useRef } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { FileSystemNode } from '../../types';

const Terminal: React.FC = () => {
    const { state, dispatch } = useDesktop();
    const { fileSystem } = state;
    const [cwd, setCwd] = useState('C:');
    const [history, setHistory] = useState<string[]>(['Welcome to the React OS Terminal!', 'Type "help" for a list of commands.']);
    const [input, setInput] = useState('');
    const endOfHistoryRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfHistoryRef.current?.scrollIntoView();
    };

    useEffect(scrollToBottom, [history]);

    const resolvePath = (path: string): string => {
        if (path.startsWith('C:')) return path;
        const newPath = `${cwd}${cwd.endsWith('/') ? '' : '/'}${path}`;
        // Basic path normalization
        const parts = newPath.split('/').filter(p => p);
        const resolvedParts = [];
        for (const part of parts) {
            if (part === '..') {
                resolvedParts.pop();
            } else if (part !== '.') {
                resolvedParts.push(part);
            }
        }
        return resolvedParts.join('/');
    };

    const getNodeByPath = (path: string): FileSystemNode | null => {
        const parts = path.split('/').filter(p => p);
        let currentNode: FileSystemNode | null = fileSystem[parts[0]];
        if (!currentNode) return null;
        for (let i = 1; i < parts.length; i++) {
            if (currentNode?.type === 'folder' && currentNode.children && currentNode.children[parts[i]]) {
                currentNode = currentNode.children[parts[i]];
            } else {
                return null;
            }
        }
        return currentNode;
    };

    const executeCommand = (command: string) => {
        const [cmd, ...args] = command.trim().split(' ');
        const newHistory = [...history, `> ${command}`];

        switch (cmd.toLowerCase()) {
            case 'help':
                newHistory.push('Available commands:');
                newHistory.push('  ls [path]       - List directory contents');
                newHistory.push('  cd <directory>  - Change directory');
                newHistory.push('  cat <file>      - Display file content');
                newHistory.push('  mkdir <name>    - Create a new directory');
                newHistory.push('  echo <text>     - Display a line of text');
                newHistory.push('  clear           - Clear the terminal screen');
                break;
            case 'ls': {
                const path = args[0] ? resolvePath(args[0]) : cwd;
                const node = getNodeByPath(path);
                if (node && node.type === 'folder' && node.children) {
                    Object.values(node.children).forEach(child => {
                        newHistory.push(`${child.type === 'folder' ? 'd' : '-'}  ${child.name}`);
                    });
                } else {
                    newHistory.push(`ls: cannot access '${args[0] || '.'}': No such file or directory`);
                }
                break;
            }
            case 'cd': {
                if (!args[0]) {
                    setCwd('C:');
                    break;
                }
                const path = resolvePath(args[0]);
                const node = getNodeByPath(path);
                if (node && node.type === 'folder') {
                    setCwd(node.path);
                } else {
                    newHistory.push(`cd: no such file or directory: ${args[0]}`);
                }
                break;
            }
            case 'cat': {
                 if (!args[0]) {
                    newHistory.push(`cat: missing file operand`);
                    break;
                 }
                const path = resolvePath(args[0]);
                const node = getNodeByPath(path);
                if (node && node.type === 'file') {
                    newHistory.push(node.content || '');
                } else {
                    newHistory.push(`cat: ${args[0]}: No such file or directory`);
                }
                break;
            }
            case 'mkdir': {
                if (!args[0]) {
                    newHistory.push(`mkdir: missing operand`);
                    break;
                }
                dispatch({ type: 'CREATE_FOLDER', payload: { parentPath: cwd, folderName: args[0] } });
                break; // Feedback for mkdir is handled by alerts for now
            }
            case 'echo':
                newHistory.push(args.join(' '));
                break;
            case 'clear':
                setHistory([]);
                return;
            case '':
                break;
            default:
                newHistory.push(`command not found: ${cmd}`);
                break;
        }
        setHistory(newHistory);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        }
    };

    return (
        <div className="w-full h-full bg-black text-white font-mono p-2 text-sm overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
            {history.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))}
            <div ref={endOfHistoryRef} />
            <div className="flex">
                <span className="text-green-400">{cwd}></span>
                <input
                    id="terminal-input"
                    type="text"
                    className="flex-grow bg-transparent text-white outline-none pl-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>
        </div>
    );
};

export default Terminal;