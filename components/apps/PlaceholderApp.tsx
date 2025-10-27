import React from 'react';

interface PlaceholderAppProps {
    windowId: string;
}

const PlaceholderApp: React.FC<PlaceholderAppProps> = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-2xl font-bold mb-2">App Not Implemented</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
            This application is a placeholder. Full functionality will be added in a future update.
        </p>
    </div>
  );
};

export default PlaceholderApp;
