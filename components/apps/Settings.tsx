import React from 'react';
import { useDesktop } from '../../context/DesktopContext';
import type { Theme } from '../../types';

const Settings: React.FC = () => {
  const { state, dispatch } = useDesktop();
  const { settings } = state;

  const handleThemeChange = (theme: Theme) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { theme } });
  };

  const handleWallpaperChange = (wallpaperValue: string) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { wallpaper: wallpaperValue } });
  };
  
  const wallpapers = [
    { name: 'Daylight', value: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Aurora', value: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Dunes', value: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'OS Blue', value: 'bg-blue-os' },
    { name: 'Midnight', value: 'bg-zinc-900' },
    { name: 'Indigo', value: 'bg-indigo-800' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Theme</h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`px-4 py-2 rounded ${settings.theme === 'light' ? 'bg-blue-os text-white' : 'bg-zinc-300 dark:bg-zinc-700'}`}
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`px-4 py-2 rounded ${settings.theme === 'dark' ? 'bg-blue-os text-white' : 'bg-zinc-300 dark:bg-zinc-700'}`}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Wallpaper</h2>
        <div className="grid grid-cols-3 gap-4">
            {wallpapers.map(wp => {
              const isUrl = wp.value.startsWith('http');
              const style = isUrl ? { backgroundImage: `url(${wp.value})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};
              const className = `w-24 h-16 rounded border-2 ${!isUrl ? wp.value : ''} ${settings.wallpaper === wp.value ? 'border-blue-os' : 'border-transparent'}`;
              
              return (
                <div key={wp.value} className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => handleWallpaperChange(wp.value)}
                        className={className}
                        style={style}
                        aria-label={`Set wallpaper to ${wp.name}`}
                    />
                    <span className="text-sm">{wp.name}</span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
};

export default Settings;