import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { BackIcon, ForwardIcon, ReloadIcon } from '../icons/WindowIcons';

interface BrowserProps {
    windowId: string;
    data?: { initialUrl?: string };
}

const Browser: React.FC<BrowserProps> = ({ windowId, data }) => {
    const { dispatch } = useDesktop();
    const initialUrl = data?.initialUrl || 'https://josevault.netlify.app/';

    const [history, setHistory] = useState([initialUrl]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [inputValue, setInputValue] = useState(history[0]);
    const [isBlocked, setIsBlocked] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const isNavigating = useRef(false);
    
    useEffect(() => {
        setHistory([initialUrl]);
        setHistoryIndex(0);
        setInputValue(initialUrl);
        setIsBlocked(false);
    }, [initialUrl]);

    const navigate = (url: string, type: 'new' | 'back' | 'forward' | 'reload') => {
        let urlToLoad = url;
        setIsBlocked(false); // Reset block state on new navigation attempt

        if (type === 'new') {
            if (!urlToLoad.startsWith('http://') && !urlToLoad.startsWith('https://')) {
                urlToLoad = 'https://' + urlToLoad;
            }
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(urlToLoad);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        } else {
             isNavigating.current = true;
        }

        setInputValue(urlToLoad);
        if (iframeRef.current) {
            iframeRef.current.src = urlToLoad;
        }
    };

    const handleGo = () => navigate(inputValue, 'new');
    const handleBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            navigate(history[newIndex], 'back');
        }
    };
    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            navigate(history[newIndex], 'forward');
        }
    };
    const handleReload = () => {
        if (iframeRef.current) {
            setIsBlocked(false);
            iframeRef.current.src = history[historyIndex];
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleGo();
    };
    
    const handleIframeLoad = () => {
        if (isNavigating.current) {
            isNavigating.current = false;
            return;
        }
        try {
            const newUrl = iframeRef.current?.contentWindow?.location.href;
            const title = iframeRef.current?.contentWindow?.document.title;
            
            if (newUrl && newUrl !== 'about:blank' && newUrl !== history[historyIndex]) {
                navigate(newUrl, 'new');
            }
            if (title) {
                 dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title } });
            }
            setIsBlocked(false);
        } catch (error) {
            setIsBlocked(true);
            const domain = new URL(history[historyIndex]).hostname || 'Browser';
            dispatch({ type: 'SET_WINDOW_TITLE', payload: { windowId, title: domain } });
        }
    }

    const navButtonClass = "p-2 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className="w-full h-full flex flex-col bg-zinc-100 dark:bg-zinc-800">
            <div className="flex-shrink-0 p-2 bg-zinc-200 dark:bg-zinc-700 flex items-center gap-2">
                <button onClick={handleBack} disabled={historyIndex === 0} className={navButtonClass}><BackIcon className="w-5 h-5" /></button>
                <button onClick={handleForward} disabled={historyIndex === history.length - 1} className={navButtonClass}><ForwardIcon className="w-5 h-5" /></button>
                <button onClick={handleReload} className={navButtonClass}><ReloadIcon className="w-5 h-5" /></button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow p-2 rounded-full bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-os"
                    placeholder="Enter a URL"
                />
            </div>
            <div className="flex-grow bg-white relative">
                 {isBlocked && (
                    <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center items-center text-center p-4 z-10">
                        <h2 className="text-xl font-semibold mb-2">Could not load website</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            The website at <strong className="font-mono">{new URL(history[historyIndex]).hostname}</strong> refused to connect.
                        </p>
                        <p className="text-sm text-zinc-500 mt-2">
                            Many sites prevent being embedded in other pages for security reasons.
                        </p>
                        <a 
                            href={history[historyIndex]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 px-4 py-2 bg-blue-os text-white rounded hover:bg-blue-os/80"
                        >
                            Open in New Tab
                        </a>
                    </div>
                )}
                <iframe
                    ref={iframeRef}
                    src={history[historyIndex]}
                    className={`w-full h-full border-none ${isBlocked ? 'invisible' : ''}`}
                    title="Browser"
                    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                    referrerPolicy="no-referrer"
                    onLoad={handleIframeLoad}
                ></iframe>
            </div>
        </div>
    );
};

export default Browser;