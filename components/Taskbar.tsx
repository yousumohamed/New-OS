import React, { useState } from 'react';
import { useDesktop } from '../context/DesktopContext';
import Clock from './Clock';
import StartMenu from './StartMenu';
import { APPS } from '../constants';
import { StartIcon } from './icons/AppIcons';
import type { AppDef } from '../types';

const Taskbar: React.FC = () => {
  const { state, dispatch } = useDesktop();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const { windows, pinnedAppIds } = state;

  const handleAppClick = (windowId: string) => {
    dispatch({ type: 'TOGGLE_MINIMIZE', payload: { windowId } });
    dispatch({ type: 'FOCUS_WINDOW', payload: { windowId } });
  };
  
  const openNewInstance = (appId: string) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId } });
  }

  // Combine pinned apps and running apps for display, ensuring no duplicates.
  const taskbarAppsMap = new Map<string, AppDef>();
  
  // Add pinned apps first to maintain order
  pinnedAppIds.forEach(appId => {
    const app = APPS.find(a => a.id === appId);
    if (app) {
        taskbarAppsMap.set(app.id, app);
    }
  });
  
  // Add any running apps that are not already pinned
  windows.forEach(win => {
    if (!taskbarAppsMap.has(win.appId)) {
        const app = APPS.find(a => a.id === win.appId);
        if(app) taskbarAppsMap.set(app.id, app);
    }
  });

  const taskbarItems = Array.from(taskbarAppsMap.values());

  return (
    <>
      {isStartMenuOpen && <StartMenu closeMenu={() => setIsStartMenuOpen(false)} />}
      <footer className="absolute bottom-0 left-0 right-0 h-12 bg-zinc-800/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-2 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)} 
            className="p-2 rounded hover:bg-white/10"
            aria-label="Start Menu"
          >
            <StartIcon className="w-6 h-6 text-white" />
          </button>

          {taskbarItems.map(app => {
              const runningWindows = windows.filter(w => w.appId === app.id);
              const isRunning = runningWindows.length > 0;
              const isFocused = isRunning && runningWindows.some(w => w.isFocused);
              
              const baseClass = "h-10 px-3 flex items-center justify-center rounded transition-colors duration-200";
              const stateClass = isFocused 
                ? "bg-white/20" 
                : "hover:bg-white/10";
              const indicatorClass = isRunning ? "border-b-2 border-blue-os" : "border-b-2 border-transparent";
              
              return (
                  <button key={app.id} onClick={() => isRunning ? handleAppClick(runningWindows[0].id) : openNewInstance(app.id)} className={`${baseClass} ${stateClass}`} title={app.name}>
                      <div className="flex flex-col items-center">
                          <app.icon className="w-6 h-6 text-white" />
                          <div className={`w-4 mt-1 ${indicatorClass}`}></div>
                      </div>
                  </button>
              );
          })}
        </div>
        <Clock />
      </footer>
    </>
  );
};

export default Taskbar;