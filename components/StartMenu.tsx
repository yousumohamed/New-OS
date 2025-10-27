import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { APPS } from '../constants';

interface StartMenuProps {
  closeMenu: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ closeMenu }) => {
  const { dispatch } = useDesktop();
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const openApp = (appId: string) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId } });
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Also check if the click was on the start button
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
    >
      <input
        type="text"
        placeholder="Search for apps..."
        className="w-full p-2 mb-2 rounded bg-zinc-300 dark:bg-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-os"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      <div className="flex-grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1">
        {filteredApps.map(app => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className="w-full flex items-center gap-3 p-2 rounded hover:bg-blue-os/80 hover:text-white text-left"
          >
            <app.icon className="w-8 h-8" />
            <span>{app.name}</span>
          </button>
        ))}
        {filteredApps.length === 0 && (
            <div className="text-center p-4 text-zinc-500 col-span-2">No apps found.</div>
        )}
      </div>
    </div>
  );
};

export default StartMenu;