import React, { useState } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { FileSystemNode, ContextMenuItem } from '../../types';
import ContextMenu from '../ContextMenu';
import { FileItem } from './FileExplorer';

const RecycleBin: React.FC = () => {
    const { state, dispatch } = useDesktop();
    const { recycleBin } = state;
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, items: ContextMenuItem[] } | null>(null);

    const handleRestore = (nodeId: string) => {
        dispatch({ type: 'RESTORE_NODE', payload: { nodeId } });
    };

    const handleDelete = (nodeId: string) => {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            dispatch({ type: 'PERMANENTLY_DELETE_NODE', payload: { nodeId } });
        }
    };
    
    const handleEmptyRecycleBin = () => {
        if (recycleBin.length > 0 && window.confirm('Are you sure you want to permanently delete all items in the Recycle Bin? This action cannot be undone.')) {
            dispatch({ type: 'EMPTY_RECYCLE_BIN' });
        }
    };

    const handleContextMenu = (e: React.MouseEvent, node: FileSystemNode) => {
        e.preventDefault();
        e.stopPropagation();
        const items: ContextMenuItem[] = [
            {
                label: 'Restore',
                action: () => handleRestore(node.id),
            },
            {
                label: 'Delete',
                action: () => handleDelete(node.id),
            }
        ];
        setContextMenu({ x: e.clientX, y: e.clientY, items });
    };

    const closeContextMenu = () => setContextMenu(null);

    // Recycle bin doesn't need an "open" action, so we pass a dummy function
    const onOpenNoOp = () => {};

    return (
        <div className="h-full flex flex-col" onClick={closeContextMenu}>
            <div className="flex-shrink-0 p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                <button
                    onClick={handleEmptyRecycleBin}
                    disabled={recycleBin.length === 0}
                    className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-zinc-400 dark:disabled:bg-zinc-600"
                >
                    Empty Recycle Bin
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-2">
                {recycleBin.length > 0 ? (
                    recycleBin.map(node => (
                        <FileItem
                            key={node.id}
                            node={node}
                            onOpen={onOpenNoOp}
                            showPath={true}
                            onContextMenu={(e) => handleContextMenu(e, node)}
                            onSelect={() => {}}
                            isSelected={false}
                        />
                    ))
                ) : (
                    <div className="flex justify-center items-center h-full text-zinc-500">
                        The Recycle Bin is empty.
                    </div>
                )}
            </div>
            {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenu.items} closeMenu={closeContextMenu} />}
        </div>
    );
};

export default RecycleBin;