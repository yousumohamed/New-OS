import React from 'react';

// App Icons - Colorful, real-world style
export const ExplorerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6Z" fill="#FFCA28"/>
        <path d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6Z" fill="url(#paint0_linear_11_8)"/>
        <defs>
            <linearGradient id="paint0_linear_11_8" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDD835"/>
                <stop offset="1" stopColor="#FFC107"/>
            </linearGradient>
        </defs>
    </svg>
);
export const EditorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#29B6F6"/>
        <path d="M13 3.5V9H18.5L13 3.5Z" fill="#E1F5FE" fillOpacity="0.5"/>
        <path d="M16 18H8V16H16V18Z" fill="#FFFFFF"/>
        <path d="M16 14H8V12H16V14Z" fill="#FFFFFF"/>
    </svg>
);
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.43 12.98C19.53 12.67 19.53 12.33 19.43 12.02L21.54 10.37C21.83 10.14 21.91 9.74 21.72 9.44L19.72 6.06C19.53 5.76 19.13 5.68 18.83 5.91L16.72 7.56C16.14 7.15 15.5 6.82 14.81 6.59L14.42 4.25C14.36 3.9 14.03 3.63 13.66 3.63H10.34C9.97 3.63 9.64 3.9 9.58 4.25L9.19 6.59C8.5 6.82 7.86 7.15 7.28 7.56L5.17 5.91C4.87 5.68 4.47 5.76 4.28 6.06L2.28 9.44C2.09 9.74 2.17 10.14 2.46 10.37L4.57 12.02C4.47 12.33 4.47 12.67 4.57 12.98L2.46 14.63C2.17 14.86 2.09 15.26 2.28 15.56L4.28 18.94C4.47 19.24 4.87 19.32 5.17 19.09L7.28 17.44C7.86 17.85 8.5 18.18 9.19 18.41L9.58 20.75C9.64 21.1 9.97 21.37 10.34 21.37H13.66C14.03 21.37 14.36 21.1 14.42 20.75L14.81 18.41C15.5 18.18 16.14 17.85 16.72 17.44L18.83 19.09C19.13 19.32 19.53 19.24 19.72 18.94L21.72 15.56C21.91 15.26 21.83 14.86 21.54 14.63L19.43 12.98Z" fill="#78909C"/>
        <path d="M12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5Z" fill="#B0BEC5"/>
    </svg>
);
export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 2H17C18.1 2 19 2.9 19 4V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V4C5 2.9 5.9 2 7 2Z" fill="#546E7A"/>
        <path d="M8 6H16V10H8V6Z" fill="#CFD8DC"/>
        <path d="M9 12H11V14H9V12Z" fill="#CFD8DC"/>
        <path d="M13 12H15V14H13V12Z" fill="#CFD8DC"/>
        <path d="M9 15H11V17H9V15Z" fill="#CFD8DC"/>
        <path d="M13 15H15V17H13V15Z" fill="#CFD8DC"/>
        <path d="M9 18H15V20H9V18Z" fill="#CFD8DC"/>
    </svg>
);
export const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor: '#ff8a80'}} /><stop offset="33%" style={{stopColor: '#8c9eff'}} /><stop offset="66%" style={{stopColor: '#80d8ff'}} /><stop offset="100%" style={{stopColor: '#a7ffeb'}} /></linearGradient></defs>
        <path fill="url(#gemini-grad)" d="M512 0c-11.264 0-22.016 4.992-28.672 14.336l-256 384c-12.8 19.2-8.704 44.8 9.216 57.344s44.8 8.704 57.344-9.216L512 96l218.112 327.168c12.288 18.432 37.888 23.04 56.32 10.752s23.04-37.888 10.752-56.32l-256-384C534.016 4.992 523.264 0 512 0z"/>
        <path fill="url(#gemini-grad)" d="M512 1024c11.264 0 22.016-4.992 28.672-14.336l256-384c12.8-19.2 8.704-44.8-9.216-57.344s-44.8-8.704-57.344 9.216L512 928 293.888 599.808c-12.288-18.432-37.888-23.04-56.32-10.752s-23.04 37.888-10.752 56.32l256 384C489.984 1019.008 500.736 1024 512 1024z"/>
        <path fill="url(#gemini-grad)" d="M128 512c0-11.264 4.992-22.016 14.336-28.672l384-256c19.2-12.8 44.8-8.704 57.344 9.216s8.704 44.8-9.216 57.344L192 512l327.168 218.112c18.432 12.288 23.04 37.888 10.752 56.32s-37.888 23.04-56.32 10.752l-384-256C132.992 534.016 128 523.264 128 512z"/>
        <path fill="url(#gemini-grad)" d="M896 512c0 11.264-4.992 22.016-14.336 28.672l-384 256c-19.2 12.8-44.8 8.704-57.344-9.216s-8.704-44.8 9.216-57.344L832 512 504.832 293.888c-18.432-12.288-23.04-37.888-10.752-56.32s37.888-23.04 56.32-10.752l384 256C891.008 489.984 896 500.736 896 512z"/>
    </svg>
);
export const BrowserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#fff"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E0E0E0" strokeWidth="0.5"/>
        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#4285F4"/>
        <path d="M19.071 4.92896C18.4111 5.58891 17.6591 6.13639 16.8433 6.55163C15.801 4.31291 13.5684 2.80164 11.0183 2.80164C8.46823 2.80164 6.23558 4.31291 5.19328 6.55163C4.37752 6.13639 3.62551 5.58891 2.96556 4.92896C5.03914 2.85538 8.07638 2 11.0183 2C13.9602 2 16.9974 2.85538 19.071 4.92896Z" fill="#EA4335"/>
        <path d="M4.92896 2.96556C5.58891 3.62551 6.13639 4.37752 6.55163 5.19328C4.31291 6.23558 2.80164 8.46823 2.80164 11.0183C2.80164 13.5684 4.31291 15.801 6.55163 16.8433C6.13639 17.6591 5.58891 18.4111 4.92896 19.071C2.85538 16.9974 2 13.9602 2 11.0183C2 8.07638 2.85538 5.03914 4.92896 2.96556Z" fill="#FABC05"/>
        <path d="M20.9974 11.0183C20.9974 13.9602 20.142 16.9974 18.0685 19.071C17.4085 18.4111 16.861 17.6591 16.4458 16.8433C18.6845 15.801 19.9974 13.5684 19.9974 11.0183C19.9974 8.46823 18.6845 6.23558 16.4458 5.19328C16.861 4.37752 17.4085 3.62551 18.0685 2.96556C20.142 5.03914 20.9974 8.07638 20.9974 11.0183Z" fill="#34A853"/>
    </svg>
);
export const RecycleBinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18H14V11H10V18ZM11 2L10 3H7V5H17V3H14L13 2H11ZM4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V6H4Z" fill="#BDBDBD"/>
        <path d="M6 18V6H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V6H18V18H6Z" fill="#9E9E9E"/>
    </svg>
);
export const VideoPlayerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="#FF5252"/>
        <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18Z" fill="#42A5F5"/>
    </svg>
);
export const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="16" x="2" y="4" fill="#212121" rx="2"/>
        <path d="M5 8L8 11L5 14" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 15H15" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
export const GamesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.5 6V3.5C16.5 2.67 15.83 2 15 2H9C8.17 2 7.5 2.67 7.5 3.5V6H2V20H22V6H16.5ZM9 4H15V6H9V4ZM16.5 8.5H19V11H16.5V8.5ZM13 12.5H10V15.5H13V12.5ZM16.5 14H19V16.5H16.5V14Z" fill="#651FFF"/>
        <path d="M5 8.5H7.5V11H5V8.5ZM5 14H7.5V16.5H5V14Z" fill="#FF4081"/>
    </svg>
);

// Windows/System Icons - Colorful
export const StartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11H11V3H3V11ZM3 21H11V13H3V21ZM13 21H21V13H13V21ZM13 3V11H21V3H13Z" fill="url(#start-grad)"/>
        <defs>
            <linearGradient id="start-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#29B6F6"/>
                <stop offset="100%" stopColor="#03A9F4"/>
            </linearGradient>
        </defs>
    </svg>
);
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2Z"/>
        <path fill="white" d="M16.56 14.26C16.27 14.12 14.88 13.43 14.64 13.33C14.4 13.23 14.23 13.18 14.06 13.48C13.89 13.78 13.34 14.46 13.17 14.66C13 14.86 12.83 14.88 12.54 14.74C12.25 14.6 11.23 14.24 10.06 13.18C9.13 12.31 8.53 11.25 8.36 10.95C8.19 10.65 8.31 10.5 8.45 10.36C8.58 10.21 8.73 10 8.88 9.83C9.03 9.66 9.08 9.54 9.23 9.24C9.38 8.94 9.33 8.69 9.23 8.5C9.13 8.31 8.61 7.04 8.39 6.49C8.17 5.94 7.95 6.01 7.78 6.01C7.61 6.01 7.44 5.99 7.27 5.99C7.1 5.99 6.81 6.06 6.56 6.36C6.31 6.66 5.67 7.25 5.67 8.5C5.67 9.75 6.59 10.95 6.74 11.15C6.89 11.35 8.61 14.11 11.33 15.2C12.09 15.52 12.69 15.69 13.19 15.81C13.8 15.96 14.33 15.9 14.81 15.55C15.35 15.15 16.25 14.21 16.56 13.81C16.87 13.41 16.87 13.06 16.82 12.96C16.77 12.86 16.66 12.81 16.56 12.76L16.56 14.26Z"/>
    </svg>
);
export const VerifiedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#25D366"/>
    </svg>
);

// File type icons - Colorful
export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => <ExplorerIcon className={className} />;
export const FileTxtIcon: React.FC<{ className?: string }> = ({ className }) => <EditorIcon className={className} />;
export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path fill="#81D4FA" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
        <path fill="#0288D1" d="m14.5 11l-3 4l-2-2l-5 7h16z"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="#FFC107"/>
    </svg>
);
export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path fill="#F44336" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
        <path fill="#FFCDD2" d="M13 3.5V9h5.5L13 3.5z"/>
        <path fill="#FFF" d="M9 15h6v2H9z M9 11h6v2H9z"/>
    </svg>
);
export const ExecutableIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path fill="#757575" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
        <path fill="#BDBDBD" d="M13 3.5V9h5.5L13 3.5z"/>
        <path fill="#FFF" d="M8 12l4 4l-4 4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const UnknownFileIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path fill="#B0BEC5" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
        <path fill="#ECEFF1" d="M13 3.5V9h5.5L13 3.5z"/>
        <path d="M12 18c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-1-4h2v-4h-2v4z" fill="#546E7A"/>
    </svg>
);
export const VideoFileIcon: React.FC<{ className?: string }> = ({ className }) => <VideoPlayerIcon className={className} />;

// Chatbot UI Icons
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
);
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
);
export const PaperclipIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
);
export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
);

// Mini Game Icons
export const SnakeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.998 19C16.998 16.79 15.208 15 12.998 15H10.998C8.78805 15 6.99805 13.21 6.99805 11C6.99805 8.79 8.78805 7 10.998 7H12.998C15.208 7 16.998 5.21 16.998 3" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="20" r="1" fill="#000"/>
    </svg>
);
export const TicTacToeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3V21" stroke="#42A5F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 3V21" stroke="#42A5F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 8H21" stroke="#42A5F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 16H21" stroke="#42A5F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4.5 4.5L7.5 7.5M7.5 4.5L4.5 7.5" stroke="#FF7043" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" stroke="#FFCA28" strokeWidth="2"/>
        <circle cx="19" cy="19" r="2" stroke="#FFCA28" strokeWidth="2"/>
    </svg>
);
export const MemoryMatchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="7" height="7" rx="1" fill="#EC407A"/>
        <rect x="13" y="4" width="7" height="7" rx="1" fill="#AB47BC"/>
        <rect x="4" y="13" width="7" height="7" rx="1" fill="#AB47BC"/>
        <rect x="13" y="13" width="7" height="7" rx="1" fill="#EC407A"/>
        <path d="M14.5 15.5L16 17L18.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 6L7 7.5L9.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const HangmanIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L12 6" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 22L18 22" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 22L8 2" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="9" r="3" stroke="#795548" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12V17" stroke="#795548" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 17L10 20" stroke="#795548" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 17L14 20" stroke="#795548" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 14L10 12" stroke="#795548" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 14L14 12" stroke="#795548" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
export const MinesweeperIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-3h2V7h-2v7z" fill="#F44336"/>
        <circle cx="12" cy="12" r="3" fill="#212121"/>
        <path d="M10.1 5.5L12 2" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13.9 18.5L12 22" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18.5 13.9L22 12" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.5 10.1L2 12" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
export const TwentyFortyEightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" x="2" y="2" fill="#BBADA0" rx="4"/>
        <rect x="4" y="4" width="7" height="7" rx="2" fill="#EEE4DA"/>
        <rect x="13" y="4" width="7" height="7" rx="2" fill="#EDE0C8"/>
        <rect x="4" y="13" width="7" height="7" rx="2" fill="#F2B179"/>
        <rect x="13" y="13" width="7" height="7" rx="2" fill="#F59563"/>
        <text x="7.5" y="10.5" fontFamily="Arial" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#776E65">2</text>
        <text x="16.5" y="10.5" fontFamily="Arial" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#776E65">4</text>
        <text x="7.5" y="19.5" fontFamily="Arial" fontSize="5" fontWeight="bold" textAnchor="middle" fill="white">8</text>
        <text x="16.5" y="19.5" fontFamily="Arial" fontSize="4" fontWeight="bold" textAnchor="middle" fill="white">16</text>
    </svg>
);
export const AppleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="14" r="7" fill="#FF4136"/>
        <path d="M15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8" stroke="#0074D9" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
export const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" fill="#F44336"/>
    </svg>
);
export const MineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#424242"/>
        <circle cx="12" cy="12" r="2" fill="#757575"/>
        <path d="M12 4V7" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 20V17" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 12L17 12" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 12L7 12" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
export const HelpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v2h-2v-2zm0 4h2v4h-2v-4z" />
    </svg>
);