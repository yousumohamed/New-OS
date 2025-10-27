import React from 'react';

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
        <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
    </svg>
);

export const NoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#2196F3" d="M37,45H11c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h19l10,10v29C40,43.7,38.7,45,37,45z"/>
        <path fill="#FAFAFA" d="M30 3.5L40 13.5V30h-1V14.2L29.8 4.5z" opacity=".2"/>
        <path fill="#E3F2FD" d="M30,4v9c0,0.6,0.4,1,1,1h9L30,4z"/>
        <path fill="#FAFAFA" d="M22 22H32V24H22zM16 28H32V30H16zM16 34H32V36H16zM16 22H20V24H16z" opacity=".8"/>
    </svg>
);

// New Settings Icon based on user's image
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.44 12.99l-2.72-1.57c-.18-.1-.28-.3-.28-.51v-3.14c0-.21.1-.41.28-.51l2.72-1.57c.29-.17.44-.51.35-.85l-1.5-2.6c-.1-.17-.28-.26-.48-.26s-.38.09-.48.26l-2.72 1.57c-.18.1-.4.1-.58 0l-3.14-1.82c-.18-.1-.4-.1-.58 0L6.4 3.43c-.2-.17-.58-.17-.78 0l-2.72-1.57c-.2-.17-.58-.17-.78 0L.62 4.45c-.1.17-.1.38 0 .58l2.72 1.57c.18.1.28.3.28.51v3.14c0 .21-.1.41-.28.51L.62 11.4c-.1.18-.1.41 0 .58l1.5 2.6c.1.17.28.26.48.26s.38-.09.48-.26l2.72-1.57c.18-.1.4-.1.58 0l3.14 1.82c.18.1.4.1.58 0l3.14-1.82c.18-.1.4-.1.58 0l2.72 1.57c.2.17.58.17.78 0l1.5-2.6c.1-.17.1-.38 0-.58zm-7.44.51c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z"/>
        <path d="M19.99 15.28l-1.44-2.49c-.3-.52-1.01-.7-1.52-.4l-1.45.83c-.2.12-.45.12-.65 0l-1.44-.83c-.52-.3-1.22-.12-1.52.4l-1.44 2.49c-.3.52-.12 1.22.4 1.52l1.45.83c.2.12.3.35.3.58v1.67c0 .23-.1.46-.3.58l-1.45.83c-.52.3-1.22.12-1.52-.4l-1.44-2.49c-.3-.52-1.01-.7-1.52-.4l-1.45.83c-.2.12-.45.12-.65 0l-1.44-.83c-.52-.3-1.22-.12-1.52.4L.51 18.5c-.3.52-.12 1.22.4 1.52l1.45.83c.2.12.3.35.3.58v1.67c0 .23-.1.46-.3.58l-1.45.83c-.52.3-1.22.12-1.52-.4L.01 21.5c-.3-.52-.12-1.22.4-1.52l1.45-.83c.2-.12.3-.35.3-.58v-1.67c0-.23.1-.46.3-.58l1.45-.83c.52-.3 1.22-.12 1.52.4l1.44 2.49c.3.52 1.01.7 1.52.4l1.45-.83c.2-.12.45-.12.65 0l1.44.83c.52.3 1.22.12 1.52-.4l1.44-2.49c.3-.52.12-1.22-.4-1.52l-1.45-.83c-.2-.12-.3-.35-.3-.58v-1.67c0-.23.1-.46.3-.58l1.45-.83c.52-.3 1.22-.12 1.52.4l1.44 2.49c.3.52 1.01.7 1.52.4l1.45-.83c.2-.12.45-.12.65 0l1.44.83c.52.3 1.22.12 1.52-.4l1.44-2.49c.3-.52.12-1.22-.4-1.52z"/>
    </svg>
);

export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#90A4AE" d="M40,44H8c-2.2,0-4-1.8-4-4V8c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v32C44,42.2,42.2,44,40,44z"/>
        <path fill="#455A64" d="M8,4c-1.7,0-3,1.3-3,3v32c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V7c0-1.7-1.3-3-3-3H8z"/>
        <path fill="#ECEFF1" d="M10 10H38V20H10z"/>
        <path fill="#CFD8DC" d="M11 24H19V30H11zM21 24H29V30H21zM31 24H39V30H31zM11 32H19V38H11zM21 32H29V38H21zM31 32H39V38H31z"/>
    </svg>
);

// New Gemini Icon based on user's image
export const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8E2DE2' }} />
            <stop offset="100%" style={{ stopColor: '#4A00E0' }} />
            </linearGradient>
            <linearGradient id="gemini-grad-alt" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#4158D0" />
                <stop offset="25%" stopColor="#C850C0" />
                <stop offset="100%" stopColor="#FFCC70" />
            </linearGradient>
            <linearGradient id="gemini-real" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#678eff"/>
                <stop offset="100%" stopColor="#c26dff"/>
            </linearGradient>
        </defs>
        <path 
            d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" 
            fill="url(#gemini-real)"
        />
    </svg>
);

// New Chrome Icon based on user's image
export const ChromeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#DB4437" d="M24 9.4c3.9 0 7.3 1.6 9.8 4.1l-3.3 3.3c-1.4-1.3-3.2-2.1-5.5-2.1-4.2 0-7.7 3.5-7.7 7.7s3.5 7.7 7.7 7.7c2.8 0 4.8-1.2 6.1-2.5l3.4 3.4c-2.2 2.1-5.2 3.4-8.5 3.4-7.2 0-13-5.8-13-13s5.8-13 13-13z"/>
        <path fill="#4285F4" d="M42.8 24c0-1.2-.1-2.4-.3-3.6h-18.5v6.8h10.6c-.5 2.2-2 4.1-4.2 5.4l5.4 5.4c3.1-2.9 5-7.2 5-12z"/>
        <path fill="#0F9D58" d="M14.9 31.1c-2.1-2.2-3.4-5.2-3.4-8.5 0-3.3 1.3-6.3 3.4-8.5l-5.4-5.4c-3.1 2.9-5 7.2-5 12 0 4.8 1.9 9.1 5 12l5.4-5.6z"/>
        <path fill="#F4B400" d="M42.8 24c0 1.2-.1 2.4-.3 3.6-1.1 4.7-5.1 8-9.9 8-2.8 0-5.3-1-7.3-2.6l5.4-5.4c1.4 1.3 3.2 2.1 5.5 2.1 2.9 0 5.4-1.8 6.5-4.3h-12.2v-6.8h18.5c.2 1.2.3 2.4.3 3.6z"/>
    </svg>
);

// New Terminal Icon based on user's image
export const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path fill="#212121" d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-4-2-4z"/>
        <path fill="white" d="M6.4 14.8l3.6-3.6-3.6-3.6 1.4-1.4 5 5-5 5-1.4-1.4z m6.6 0h5v-2h-5v2z"/>
    </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.8,5.7,0.8,9.9C44,28.2,43.6,31.6,43.2,33.9z"/>
        <path fill="#FFFFFF" d="M20 31L20 17 32 24z"/>
    </svg>
);

export const DriveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#1E88E5" d="M14 4H34L44 22L34 40H14L4 22Z" opacity=".2"/>
        <path fill="#4CAF50" d="M15.2 6L24 22.5L32.8 6z"/>
        <path fill="#FFC107" d="M6 39.5L15.2 23L24 39.5z"/>
        <path fill="#1E88E5" d="M42 39.5L32.8 23L24 39.5z"/>
    </svg>
);

export const MapsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
        <path fill="#4CAF50" d="M37,42V13l-13-6L11,13v29l13,6L37,42z"/>
        <path fill="#81C784" d="M24,7l13,6v29l-13-6V7z"/>
        <path fill="#FFC107" d="M24,25c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S27.3,25,24,25z"/>
        <path fill="#F44336" d="M24,13c-3.3,0-6,2.7-6,6c0,3.3,6,11,6,11s6-7.7,6-11C30,15.7,27.3,13,24,13z M24,22c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S25.7,22,24,22z"/>
    </svg>
);


export const StartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className={className}>
        <path fill="#0078D4" d="M22.5 22.5H4V4h18.5V22.5zm0 21H4V25h18.5V43.5zM44 22.5H25.5V4H44V22.5zm0 21H25.5V25H44V43.5z"/>
    </svg>
);