import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { APPS } from '../constants';
import ContextMenu from './ContextMenu';
import type { ContextMenuItem } from '../types';

interface StartMenuProps {
  closeMenu: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ closeMenu }) => {
  const { state, dispatch } = useDesktop();
  const { pinnedAppIds } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, items: ContextMenuItem[], appId: string } | null>(null);

  const openApp = (appId: string) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId } });
    closeMenu();
  };
  
  const closeContextMenu = () => setContextMenu(null);

  const handleAppContextMenu = (e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isPinned = pinnedAppIds.includes(appId);
    const items: ContextMenuItem[] = [
        {
            label: isPinned ? 'Unpin from Taskbar' : 'Pin to Taskbar',
            action: () => {
                if (isPinned) {
                    dispatch({ type: 'UNPIN_APP_FROM_TASKBAR', payload: { appId }});
                } else {
                    dispatch({ type: 'PIN_APP_TO_TASKBAR', payload: { appId }});
                }
            }
        }
    ];
    setContextMenu({ x: e.clientX, y: e.clientY, items, appId });
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close main start menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Ensure the click was not on the start button itself
        if (!(event.target as Element).closest('button[aria-label="Start Menu"]')) {
          closeMenu();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);


  const filteredApps = APPS.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      ref={menuRef}
      className="absolute bottom-12 left-2 w-96 h-[500px] bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-lg shadow-2xl z-40 flex flex-col p-2 text-black dark:text-white animate-fade-in"
      onContextMenu={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search for apps..."
        className="w-full p-2 mb-2 rounded bg-zinc-300 dark:bg-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-os"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      <div className="flex-grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1" onClick={closeContextMenu}>
        {filteredApps.map(app => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            onContextMenu={(e) => handleAppContextMenu(e, app.id)}
            className="w-full flex items-center gap-3 p-2 rounded hover:bg-blue-os/80 hover:text-white text-left context-menu-item"
          >
            <app.icon className="w-8 h-8" />
            <span>{app.name}</span>
          </button>
        ))}
        {filteredApps.length === 0 && (
            <div className="text-center p-4 text-zinc-500 col-span-2">No apps found.</div>
        )}
      </div>
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenu.items} closeMenu={closeContextMenu}/>}
    </div>
  );
};

export default StartMenu;