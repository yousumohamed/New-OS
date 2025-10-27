import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import Window from './Window';
import Taskbar from './Taskbar';
import { APPS, DESKTOP_APPS } from '../constants';
import DesktopIcon from './DesktopIcon';

const Desktop: React.FC = () => {
  const { state, dispatch } = useDesktop();
  const { windows, settings, fileSystem } = state;

  const isUrl = settings.wallpaper.startsWith('http');
  const style: React.CSSProperties = isUrl
    ? { backgroundImage: `url(${settings.wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
  const className = `w-screen h-screen overflow-hidden font-sans text-white flex flex-col transition-colors duration-300 ${!isUrl ? settings.wallpaper : ''}`;

  const desktopApps = APPS.filter(app => DESKTOP_APPS.includes(app.id));
  const desktopFolders = Object.values(fileSystem['C:']?.children || {}).filter(node => node.type === 'folder');

  const openApp = (appId: string, data?: any) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId, data } });
  };
  
  const openFolder = (folderPath: string) => {
      dispatch({ type: 'OPEN_WINDOW', payload: { appId: 'explorer', data: { path: folderPath } } });
  }

  return (
    <div className={className} style={style}>
      <main className="flex-grow relative">
        <div className="absolute top-0 left-0 p-4 grid grid-cols-1 gap-4">
            {desktopApps.map(app => (
                <DesktopIcon
                    key={app.id}
                    label={app.name}
                    icon={app.icon}
                    onDoubleClick={() => openApp(app.id, app.data)}
                />
            ))}
             {desktopFolders.map(folder => (
                <DesktopIcon
                    key={folder.id}
                    label={folder.name}
                    icon={FileIcon}
                    onDoubleClick={() => openFolder(folder.path)}
                />
            ))}
        </div>

        {windows.map(win => {
          const app = APPS.find(a => a.id === win.appId);
          if (!app) return null;

          return (
            <Window key={win.id} windowState={win}>
              <app.component windowId={win.id} data={win.data} />
            </Window>
          );
        })}
      </main>
      <Taskbar />
    </div>
  );
};


// A generic folder icon for the desktop
const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
        <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
    </svg>
);


export default Desktop;