import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowState } from '../types';
import { useDesktop } from '../context/DesktopContext';
import { APPS } from '../constants';
import { MinimizeIcon, MaximizeIcon, RestoreIcon, CloseIcon } from './icons/WindowIcons';

interface WindowProps {
  children: React.ReactNode;
  windowState: WindowState;
}

const Window: React.FC<WindowProps> = ({ children, windowState }) => {
  const { dispatch } = useDesktop();
  const { id, appId, title, position, size, zIndex, isMinimized, isMaximized, isFocused } = windowState;

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef<HTMLDivElement>(null);

  const app = APPS.find(a => a.id === appId);
  const Icon = app?.icon;

  const handleFocus = useCallback(() => {
    if (!isFocused) {
      dispatch({ type: 'FOCUS_WINDOW', payload: { windowId: id } });
    }
  }, [dispatch, id, isFocused]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleFocus();
    if (isMaximized) return;

    setIsDragging(true);
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    e.preventDefault();
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    handleFocus();
    setIsResizing(true);
    setResizeDirection(direction);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newPos = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
      dispatch({ type: 'MOVE_WINDOW', payload: { windowId: id, position: newPos } });
    }
    if (isResizing && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        let newWidth = rect.width;
        let newHeight = rect.height;
        let newX = rect.left;
        let newY = rect.top;

        if (resizeDirection.includes('right')) newWidth = e.clientX - rect.left;
        if (resizeDirection.includes('bottom')) newHeight = e.clientY - rect.top;
        if (resizeDirection.includes('left')) {
            newWidth = rect.right - e.clientX;
            newX = e.clientX;
        }
        if (resizeDirection.includes('top')) {
            newHeight = rect.bottom - e.clientY;
            newY = e.clientY;
        }

        dispatch({ type: 'RESIZE_WINDOW', payload: { windowId: id, size: { width: Math.max(300, newWidth), height: Math.max(200, newHeight) } }});
        if (resizeDirection.includes('left') || resizeDirection.includes('top')) {
            dispatch({ type: 'MOVE_WINDOW', payload: { windowId: id, position: { x: newX, y: newY } } });
        }
    }
  }, [isDragging, isResizing, dragOffset, resizeDirection, dispatch, id]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  const handleClose = () => dispatch({ type: 'CLOSE_WINDOW', payload: { windowId: id } });
  const handleMinimize = () => dispatch({ type: 'TOGGLE_MINIMIZE', payload: { windowId: id } });
  const handleMaximize = () => dispatch({ type: 'TOGGLE_MAXIMIZE', payload: { windowId: id } });

  const windowClasses = [
    'absolute flex flex-col bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-2xl dark:shadow-black/50 overflow-hidden transition-all duration-200 ease-in-out border border-black/20 dark:border-white/10',
    isFocused ? 'ring-2 ring-blue-os' : '',
    isMinimized ? 'opacity-0 pointer-events-none transform scale-95 -translate-y-4' : 'opacity-100',
    isMaximized ? 'top-0 left-0 w-full h-full rounded-none border-none' : '',
  ].join(' ');

  const positionStyles: React.CSSProperties = isMaximized ? {} : {
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
  };

  return (
    <div
      ref={windowRef}
      className={windowClasses}
      style={{ ...positionStyles, zIndex }}
      onMouseDown={handleFocus}
    >
      {!isMaximized && (
        <>
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')} className="absolute -top-1 -left-1 w-2 h-2 cursor-nwse-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')} className="absolute -top-1 -right-1 w-2 h-2 cursor-nesw-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')} className="absolute -bottom-1 -left-1 w-2 h-2 cursor-nesw-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')} className="absolute -bottom-1 -right-1 w-2 h-2 cursor-nwse-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'top')} className="absolute -top-1 left-1 right-1 h-2 cursor-ns-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')} className="absolute -bottom-1 left-1 right-1 h-2 cursor-ns-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'left')} className="absolute top-1 bottom-1 -left-1 w-2 cursor-ew-resize" />
            <div onMouseDown={(e) => handleResizeMouseDown(e, 'right')} className="absolute top-1 bottom-1 -right-1 w-2 cursor-ew-resize" />
        </>
      )}

      {/* Title Bar */}
      <div
        className="flex items-center justify-between h-8 bg-zinc-100 dark:bg-zinc-700 text-black dark:text-white pl-2 select-none flex-shrink-0"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
      >
        <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            <span className="text-sm font-semibold truncate">{title}</span>
        </div>
        <div className="flex items-center">
          <button onClick={handleMinimize} className="h-8 w-10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10"><MinimizeIcon /></button>
          <button onClick={handleMaximize} className="h-8 w-10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10">
            {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
          </button>
          <button onClick={handleClose} className="h-8 w-10 flex items-center justify-center hover:bg-red-500 hover:text-white"><CloseIcon /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow bg-white dark:bg-zinc-900 text-black dark:text-white overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;