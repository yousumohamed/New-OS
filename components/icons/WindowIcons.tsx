
import React from 'react';

const iconClass = "w-4 h-4";

export const MinimizeIcon: React.FC = () => (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M20 14H4v-4h16v4z"/></svg>
);

export const MaximizeIcon: React.FC = () => (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>
);

export const RestoreIcon: React.FC = () => (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h12v12H4V8zm2 2v8h8v-8H6z m14-6v12h-4v-2h2V4H8v2h2V2h12z"/></svg>
);

export const CloseIcon: React.FC = () => (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
);

// Real-world browser navigation icons
export const BackIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
);

export const ForwardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>
);

export const ReloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
);