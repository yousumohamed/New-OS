import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { FileSystemNode, ContextMenuItem } from '../../types';
import ContextMenu from '../ContextMenu';
import { DocumentIcon, ExecutableIcon, ImageIcon, UnknownFileIcon, VideoFileIcon, FolderIcon, FileTxtIcon } from '../icons/AppIcons';

const getFileIcon = (fileName: string): React.FC<{ className?: string }> => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'bmp':
            return ImageIcon;
        case 'mp4':
        case 'webm':
        case 'mov':
            return VideoFileIcon;
        case 'pdf':
        case 'doc':
        case 'docx':
            return DocumentIcon;
        case 'exe':
        case 'app':
            return ExecutableIcon;
        case 'txt':
        case 'log':
        case 'json':
        case 'js':
        case 'ts':
        case 'html':
        case 'css':
        case 'md':
            return FileTxtIcon;
        default:
            return UnknownFileIcon;
    }
};

const getFileColor = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'bmp':
            return 'text-purple-500';
        case 'mp4':
        case 'webm':
        case 'mov':
            return 'text-red-500';
        case 'pdf':
        case 'doc':
        case 'docx':
            return 'text-blue-500';
        case 'exe':
        case 'app':
            return 'text-zinc-500';
        case 'txt':
        case 'log':
        case 'json':
        case 'js':
        case 'ts':
        case 'html':
        case 'css':
        case 'md':
            return 'text-blue-os';
        default:
            return 'text-gray-500';
    }
};

interface FileItemProps {
  node: FileSystemNode;
  onOpen: (node: FileSystemNode) => void;
  onSelect: (node: FileSystemNode) => void;
  isSelected: boolean;
  showPath?: boolean;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const FileItem: React.FC<FileItemProps> = ({ node, onOpen, onSelect, isSelected, showPath, onContextMenu }) => {
  const Icon = node.type === 'folder' ? FolderIcon : getFileIcon(node.name);
  const colorClass = node.type === 'folder' ? 'text-yellow-500' : getFileColor(node.name);

  return (
    <div
      className={`flex items-center gap-2 p-1 rounded cursor-pointer ${isSelected ? 'bg-blue-os/50' : 'hover:bg-blue-os/30'}`}
      onClick={() => onSelect(node)}
      onDoubleClick={() => onOpen(node)}
      onContextMenu={onContextMenu}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${colorClass}`} />
       <div className="flex flex-col truncate min-w-0">
        <span className="truncate">{node.name}</span>
        {showPath && <span className="text-xs text-zinc-500 truncate">{node.path || node.originalPath}</span>}
      </div>
    </div>
  );
};

interface TreeNodeProps {
    node: FileSystemNode;
    onOpen: (node: FileSystemNode) => void;
    onContextMenu: (e: React.MouseEvent, node: FileSystemNode) => void;
    onSelect: (node: FileSystemNode) => void;
    selectedNodeId: string | null;
}
const TreeNode: React.FC<TreeNodeProps> = ({ node, onOpen, onContextMenu, onSelect, selectedNodeId }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (node.type === 'file') {
        return (
            <div className="pl-4">
                <FileItem 
                    node={node} 
                    onOpen={onOpen} 
                    onContextMenu={(e) => onContextMenu(e, node)} 
                    onSelect={onSelect}
                    isSelected={selectedNodeId === node.id}
                />
            </div>
        );
    }
    
    return (
        <div onContextMenu={(e) => onContextMenu(e, node)}>
            <div
                className={`flex items-center gap-2 p-1 rounded cursor-pointer ${selectedNodeId === node.id ? 'bg-blue-os/50' : 'hover:bg-blue-os/30'}`}
                onClick={() => { setIsOpen(!isOpen); onSelect(node); }}
            >
                <FolderIcon className="w-5 h-5 text-yellow-500" />
                <span>{node.name}</span>
            </div>
            {isOpen && node.children && (
                <div className="pl-4 border-l ml-2 border-zinc-300 dark:border-zinc-600">
                    {Object.values(node.children).map((child: FileSystemNode) => (
                        <TreeNode 
                            key={child.id} 
                            node={child} 
                            onOpen={onOpen} 
                            onContextMenu={onContextMenu}
                            onSelect={onSelect}
                            selectedNodeId={selectedNodeId}
                        />
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<FileSystemNode | null>(null);

  const handleOpen = (node: FileSystemNode) => {
    if (node.type === 'file') {
      const extension = node.name.split('.').pop()?.toLowerCase();
      if (['txt', 'log', 'json', 'js', 'ts', 'html', 'css', 'md'].includes(extension || '')) {
        dispatch({ type: 'OPEN_WINDOW', payload: { appId: 'editor', data: { fileId: node.id, fileName: node.name } } });
      } else if (['mp4', 'webm', 'mov'].includes(extension || '')) {
        dispatch({ type: 'OPEN_WINDOW', payload: { appId: 'player', data: { fileId: node.id, fileName: node.name, videoUrl: node.content } } });
      } else {
        alert(`Cannot open file type: ${extension}`);
      }
    }
  };

  const handleCreateFolder = (parentPath: string) => {
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
        dispatch({ type: 'CREATE_FOLDER', payload: { parentPath, folderName } });
    }
  };
  
  const handleUploadFile = (parentPath: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    dispatch({
                        type: 'UPLOAD_FILE',
                        payload: {
                            parentPath,
                            fileName: file.name,
                            fileContent: event.target.result as string,
                        },
                    });
                }
            };
            reader.readAsDataURL(file); // Read as a data URL (Base64)
        }
    };
    input.click();
  };

  const handleMoveToRecycleBin = (node: FileSystemNode) => {
    dispatch({ type: 'MOVE_TO_RECYCLE_BIN', payload: { path: node.path } });
    setSelectedNode(null); // Deselect after deleting
  };

  const handleContextMenu = (e: React.MouseEvent, node: FileSystemNode) => {
    e.preventDefault();
    e.stopPropagation();
    const items: ContextMenuItem[] = [];

    const isRoot = node.path === 'C:';

    if (node.type === 'folder') {
        items.push({
            label: 'New Folder',
            action: () => handleCreateFolder(node.path),
        });
        items.push({
            label: 'Upload File',
            action: () => handleUploadFile(node.path),
        });
    }

    if (!isRoot) {
        items.push({
            label: 'Send to Recycle Bin',
            action: () => handleMoveToRecycleBin(node),
        });
    }

    if (items.length > 0) {
      setContextMenu({ x: e.clientX, y: e.clientY, items });
    }
  };
  
  const closeContextMenu = () => setContextMenu(null);

  const searchFileSystem = (node: FileSystemNode, query: string): FileSystemNode[] => {
    if (!query) return [];
    let results: FileSystemNode[] = [];
    const lowerCaseQuery = query.toLowerCase();

    if (node.name.toLowerCase().includes(lowerCaseQuery)) {
      results.push(node);
    }

    if (node.type === 'folder' && node.children) {
      for (const key in node.children) {
        const child = node.children[key];
        results = results.concat(searchFileSystem(child, query));
      }
    }
    return results;
  };

  const searchResults = searchTerm
    ? (Object.values(fileSystem) as FileSystemNode[]).flatMap(rootNode => searchFileSystem(rootNode, searchTerm))
    : [];
  
  const uniqueSearchResults = Array.from(new Map(searchResults.map((item: FileSystemNode) => [item.id, item])).values());


  return (
    <div className="h-full select-none flex flex-col" onClick={closeContextMenu} onContextMenu={(e) => handleContextMenu(e, fileSystem['C:'])}>
        <div className="p-2 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-700">
            <input
            type="text"
            placeholder="Search this PC"
            className="w-full p-1.5 rounded bg-zinc-100 dark:bg-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-os text-sm border border-zinc-300 dark:border-zinc-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex flex-grow min-h-0">
          <div className="w-2/3 overflow-y-auto p-2">
              {searchTerm ? (
              <div className="space-y-1">
                  {uniqueSearchResults.length > 0 ? (
                  uniqueSearchResults.map(node => (
                      <FileItem
                        key={node.id}
                        node={node}
                        onOpen={handleOpen}
                        showPath
                        onContextMenu={(e) => handleContextMenu(e, node)}
                        onSelect={setSelectedNode}
                        isSelected={selectedNode?.id === node.id}
                      />
                  ))
                  ) : (
                  <div className="text-zinc-500 text-center p-4">No results found for "{searchTerm}".</div>
                  )}
              </div>
              ) : (
              Object.values(fileSystem).map(node => (
                  <TreeNode key={(node as FileSystemNode).id} node={node as FileSystemNode} onOpen={handleOpen} onContextMenu={handleContextMenu} onSelect={setSelectedNode} selectedNodeId={selectedNode?.id || null} />
              ))
              )}
          </div>
          <div className="w-1/3 border-l border-zinc-300 dark:border-zinc-600 p-4 flex flex-col items-center justify-center text-center">
                {!selectedNode ? (
                    <div className="text-zinc-500">
                        <p>Select an item to see details.</p>
                    </div>
                ) : selectedNode.type === 'folder' ? (
                    <div className="flex flex-col items-center justify-center space-y-2 w-full">
                        <FolderIcon className="w-24 h-24 text-yellow-500" />
                        <h2 className="text-lg font-semibold truncate w-full">{selectedNode.name}</h2>
                        <p className="text-sm text-zinc-500">Folder</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-start space-y-2 w-full h-full">
                        {(() => {
                            const Icon = getFileIcon(selectedNode.name);
                            const color = getFileColor(selectedNode.name);
                            return <Icon className={`w-24 h-24 ${color} flex-shrink-0`} />;
                        })()}
                        <h2 className="text-lg font-semibold truncate w-full">{selectedNode.name}</h2>
                        <p className="text-sm text-zinc-500">File</p>
                        <div className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-800 rounded w-full flex-grow overflow-y-auto text-left text-xs">
                           {(() => {
                                const content = selectedNode.content || '';
                                if (content.startsWith('data:image/')) {
                                    return <img src={content} alt={selectedNode.name} className="max-w-full h-auto object-contain mx-auto" />;
                                }
                                
                                const isTextFile = selectedNode.name.match(/\.(txt|log|json|js|ts|html|css|md)$/);
                                if (isTextFile) {
                                    let textContent = '';
                                    if (content.startsWith('data:')) {
                                        try {
                                            const base64Part = content.split(',')[1];
                                            textContent = atob(base64Part);
                                        } catch (e) {
                                            textContent = "Error: Could not display file content.";
                                        }
                                    } else {
                                        textContent = content;
                                    }
                                    return <pre className="whitespace-pre-wrap font-sans">{textContent}</pre>;
                                }

                                return <span className="text-zinc-500 italic">No preview available for this file type.</span>;
                            })()}
                        </div>
                    </div>
                )}
          </div>
        </div>
        {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenu.items} closeMenu={closeContextMenu}/>}
    </div>
  );
};

export default FileExplorer;
