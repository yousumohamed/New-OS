import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { BackIcon, ForwardIcon, ReloadIcon } from '../icons/WindowIcons';

interface BrowserProps {
    windowId: string;
    data?: { initialUrl?: string };
}

const Browser: React.FC<BrowserProps> = ({ windowId, data }) => {
    const { dispatch } = useDesktop();
    const initialUrl = data?.initialUrl || 'https://www.google.com';

    const [history, setHistory] = useState([initialUrl]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [inputValue, setInputValue] = useState(history[0]);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const isNavigating = useRef(false);
    
    useEffect(() => {
        // This effect ensures that if the component is reused for a different URL, it resets.
        setHistory([initialUrl]);
        setHistoryIndex(0);
        setInputValue(initialUrl);
    }, [initialUrl]);

    const navigate = (url: string, type: 'new' | 'back' | 'forward' | 'reload') => {
        let urlToLoad = url;
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
        } catch (error) {
            const domain = history[historyIndex].split('/')[2] || 'Browser';
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
            <div className="flex-grow bg-white">
                <iframe
                    ref={iframeRef}
                    src={history[historyIndex]}
                    className="w-full h-full border-none"
                    title="Browser"
                    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                    referrerPolicy="no-referrer"
                    onLoad={handleIframeLoad}
                ></iframe>
            </div>
            <div className="flex-shrink-0 p-1 bg-zinc-200 dark:bg-zinc-700 text-xs text-center text-zinc-500">
                Note: Some websites may not load due to security restrictions (X-Frame-Options).
            </div>
        </div>
    );
};

export default Browser;