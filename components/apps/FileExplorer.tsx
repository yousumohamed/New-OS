import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { FileSystemNode, ContextMenuItem } from '../../types';
import ContextMenu from '../ContextMenu';

interface FolderIconProps { className?: string; }
const FolderIcon: React.FC<FolderIconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

interface FileTxtIconProps { className?: string; }
const FileTxtIcon: React.FC<FileTxtIconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM13 9V3.5L18.5 9H13z" />
  </svg>
);

interface FileItemProps {
  node: FileSystemNode;
  onOpen: (node: FileSystemNode) => void;
}
const FileItem: React.FC<FileItemProps> = ({ node, onOpen }) => {
  const Icon = node.type === 'folder' ? FolderIcon : FileTxtIcon;
  return (
    <div
      className="flex items-center gap-2 p-1 rounded hover:bg-blue-os/30 cursor-pointer"
      onDoubleClick={() => onOpen(node)}
    >
      <Icon className="w-5 h-5 text-blue-os" />
      <span>{node.name}</span>
    </div>
  );
};

interface TreeNodeProps {
    node: FileSystemNode;
    onOpen: (node: FileSystemNode) => void;
    onContextMenu: (e: React.MouseEvent, node: FileSystemNode) => void;
}
const TreeNode: React.FC<TreeNodeProps> = ({ node, onOpen, onContextMenu }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (node.type === 'file') {
        return (
            <div className="pl-4">
                <FileItem node={node} onOpen={onOpen} />
            </div>
        );
    }
    
    return (
        <div onContextMenu={(e) => onContextMenu(e, node)}>
            <div
                className="flex items-center gap-2 p-1 rounded hover:bg-blue-os/30 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FolderIcon className="w-5 h-5 text-yellow-500" />
                <span>{node.name}</span>
            </div>
            {isOpen && node.children && (
                <div className="pl-4 border-l ml-2 border-zinc-300 dark:border-zinc-600">
                    {Object.values(node.children).map(child => (
                        <TreeNode key={child.id} node={child} onOpen={onOpen} onContextMenu={onContextMenu}/>
                    ))}
                </div>
            )}
        </div>
    );
};

const FileExplorer: React.FC<{windowId: string}> = () => {
  const { state, dispatch } = useDesktop();
  const { fileSystem } = state;
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, items: ContextMenuItem[] } | null>(null);

  const handleOpen = (node: FileSystemNode) => {
    if (node.type === 'file') {
      if (node.name.endsWith('.txt') || node.name.endsWith('.log')) {
        dispatch({ type: 'OPEN_WINDOW', payload: { appId: 'editor', data: { fileId: node.id, fileName: node.name } } });
      } else {
        alert(`Cannot open file type: ${node.name.split('.').pop()}`);
      }
    }
  };

  const handleCreateFolder = (parentPath: string) => {
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
        dispatch({ type: 'CREATE_FOLDER', payload: { parentPath, folderName } });
    }
  };

  const handleContextMenu = (e: React.MouseEvent, node: FileSystemNode) => {
    e.preventDefault();
    e.stopPropagation();
    const items: ContextMenuItem[] = [];
    if (node.type === 'folder') {
        items.push({
            label: 'New Folder',
            action: () => handleCreateFolder(node.path),
        });
    }
    setContextMenu({ x: e.clientX, y: e.clientY, items });
  };
  
  const closeContextMenu = () => setContextMenu(null);

  return (
    <div className="p-2 h-full select-none" onClick={closeContextMenu} onContextMenu={(e) => handleContextMenu(e, fileSystem['C:'])}>
        {Object.values(fileSystem).map(node => (
            <TreeNode key={node.id} node={node} onOpen={handleOpen} onContextMenu={handleContextMenu} />
        ))}
        {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenu.items} closeMenu={closeContextMenu}/>}
    </div>
  );
};

export default FileExplorer;