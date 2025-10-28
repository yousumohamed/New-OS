import React, { useState } from 'react';

interface DesktopIconProps {
    label: string;
    icon: React.FC<{ className?: string }>;
    onDoubleClick: () => void;
    onContextMenu?: (e: React.MouseEvent) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, onDoubleClick, onContextMenu }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleClick = () => {
        setIsFocused(true);
        // This is a simplified focus system. A real OS would handle this globally.
        setTimeout(() => setIsFocused(false), 3000); // Lose focus after 3s
    };
    
    return (
        <div
            className="flex flex-col items-center w-24 h-24 p-2 rounded"
            onClick={handleClick}
            onDoubleClick={onDoubleClick}
            onContextMenu={onContextMenu}
        >
            <div className={`p-1 rounded ${isFocused ? 'bg-blue-os/30 border border-blue-os/50' : 'border border-transparent'}`}>
                <Icon className="w-12 h-12" />
            </div>
            <span className={`mt-2 text-xs text-center text-white select-none truncate w-full ${isFocused ? 'bg-blue-os' : ''} rounded-sm px-1`}>
                {label}
            </span>
        </div>
    );
};

export default DesktopIcon;
