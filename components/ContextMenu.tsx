import React, { useRef, useEffect } from 'react';
import type { ContextMenuItem } from '../types';

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  closeMenu: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, closeMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-lg p-1 z-50 text-black dark:text-white"
      style={{ top: y, left: x }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.action();
            closeMenu();
          }}
          className="w-full text-left px-3 py-1 text-sm rounded hover:bg-blue-os hover:text-white flex items-center gap-2"
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
