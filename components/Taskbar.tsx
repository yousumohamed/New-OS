import React, { useState } from 'react';
import { useDesktop } from '../context/DesktopContext';
import Clock from './Clock';
import StartMenu from './StartMenu';
import { APPS } from '../constants';
import { StartIcon } from './icons/AppIcons';

const Taskbar: React.FC = () => {
  const { state, dispatch } = useDesktop();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const openWindows = state.windows;

  const handleAppClick = (windowId: string) => {
    dispatch({ type: 'TOGGLE_MINIMIZE', payload: { windowId } });
    dispatch({ type: 'FOCUS_WINDOW', payload: { windowId } });
  };
  
  const openNewInstance = (appId: string) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId } });
  }

  const pinnedApps = APPS.filter(app => app.isPinned);

  // Combine running apps and pinned apps for display
  const taskbarItems = [...pinnedApps];
  openWindows.forEach(win => {
    if (!taskbarItems.some(item => item.id === win.appId)) {
        const app = APPS.find(a => a.id === win.appId);
        if(app) taskbarItems.push(app);
    }
  });


  return (
    <>
      {isStartMenuOpen && <StartMenu closeMenu={() => setIsStartMenuOpen(false)} />}
      <footer className="h-12 bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur-md border-t border-black/10 dark:border-white/10 flex items-center justify-between px-2 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)} 
            className="p-2 rounded hover:bg-blue-os/80 text-blue-os hover:text-white"
            aria-label="Start Menu"
          >
            <StartIcon className="w-6 h-6" />
          </button>

          {taskbarItems.map(app => {
              const runningWindows = openWindows.filter(w => w.appId === app.id);
              const isRunning = runningWindows.length > 0;
              const isFocused = isRunning && runningWindows.some(w => w.isFocused);
              
              const baseClass = "h-10 px-3 flex items-center justify-center rounded transition-colors duration-200";
              const stateClass = isFocused 
                ? "bg-blue-os/30 dark:bg-blue-os/50" 
                : "hover:bg-black/10 dark:hover:bg-white/10";
              const indicatorClass = isRunning ? "border-b-2 border-blue-os" : "border-b-2 border-transparent";
              
              return (
                  <button key={app.id} onClick={() => isRunning ? handleAppClick(runningWindows[0].id) : openNewInstance(app.id)} className={`${baseClass} ${stateClass}`} title={app.name}>
                      <div className="flex flex-col items-center">
                          <app.icon className="w-6 h-6 text-black dark:text-white" />
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