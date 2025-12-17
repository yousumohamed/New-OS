
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HelpIcon, AppleIcon, FlagIcon, MineIcon, SnakeIcon, TicTacToeIcon, MemoryMatchIcon, HangmanIcon, MinesweeperIcon, TwentyFortyEightIcon, StartIcon, EditorIcon, SettingsIcon, CalculatorIcon, ExplorerIcon, BrowserIcon, RecycleBinIcon, TerminalIcon, VideoPlayerIcon, GeminiIcon } from '../icons/AppIcons';

// --- Main Component & Game Launcher ---
const MiniGames: React.FC = () => {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    const games = [
        { id: 'snake', name: 'Snake', component: <SnakeGame />, Icon: SnakeIcon },
        { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', component: <TicTacToeGame />, Icon: TicTacToeIcon },
        { id: 'memory-match', name: 'Memory Match', component: <MemoryMatchGame />, Icon: MemoryMatchIcon },
        { id: 'hangman', name: 'Hangman', component: <HangmanGame />, Icon: HangmanIcon },
        { id: 'minesweeper', name: 'Minesweeper', component: <MinesweeperGame />, Icon: MinesweeperIcon },
        { id: '2048', name: '2048', component: <TwentyFortyEightGame />, Icon: TwentyFortyEightIcon },
    ];

    const selectedGame = games.find(g => g.id === activeGame);

    return (
        <div className="w-full h-full bg-blue-os text-white flex flex-col">
            {activeGame && selectedGame ? (
                <>
                    <div className="flex-shrink-0 bg-black/20 p-2 flex items-center justify-between">
                        <h2 className="text-lg font-bold">{selectedGame.name}</h2>
                        <button onClick={() => setActiveGame(null)} className="px-3 py-1 text-sm rounded bg-zinc-700 hover:bg-zinc-600">
                            Back to Menu
                        </button>
                    </div>
                    <div className="flex-grow overflow-auto">
                        {selectedGame.component}
                    </div>
                </>
            ) : (
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Mini Games Arcade</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {games.map(game => (
                            <GameButton key={game.id} name={game.name} Icon={game.Icon} onClick={() => setActiveGame(game.id)} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const GameButton: React.FC<{ name: string; Icon: React.FC<{className?: string}>; onClick: () => void; }> = ({ name, Icon, onClick }) => (
    <button onClick={onClick} className="bg-white/10 hover:bg-white/20 rounded-lg p-4 flex flex-col items-center justify-center space-y-3 transition-transform duration-200 hover:scale-105">
        <Icon className="w-16 h-16" />
        <span className="font-semibold text-center">{name}</span>
    </button>
);


// --- Help Modal Component ---
const HelpModal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-zinc-800 rounded-lg p-6 w-11/12 max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="space-y-3 text-zinc-300">{children}</div>
        <button onClick={onClose} className="mt-6 w-full bg-blue-os py-2 rounded">Got it!</button>
      </div>
    </div>
  );
};


// --- Snake Game ---
const SnakeGame: React.FC = () => {
    const [level, setLevel] = useState<'Easy' | 'Medium' | 'Hard' | null>(null);
    const gridSize = 20;
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: -1 }); // Start moving up
    const [isGameOver, setIsGameOver] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    
    const speed = level === 'Easy' ? 200 : level === 'Medium' ? 120 : 80;

    const generateFood = (currentSnake: {x: number, y: number}[]) => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        setFood(newFood);
    };
    
    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        generateFood([{ x: 10, y: 10 }]);
        setDirection({ x: 0, y: -1 });
        setIsGameOver(false);
    }
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
            case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
            case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
            case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
        }
    }, [direction]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (isGameOver || !level) return;
        const gameLoop = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

                // Wall collision
                if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
                    setIsGameOver(true);
                    return prevSnake;
                }
                // Self collision
                for (let i = 1; i < newSnake.length; i++) {
                    if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                        setIsGameOver(true);
                        return prevSnake;
                    }
                }

                newSnake.unshift(head);
                
                if (head.x === food.x && head.y === food.y) {
                    generateFood(newSnake);
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, speed);
        return () => clearInterval(gameLoop);
    }, [snake, direction, food, isGameOver, speed, level]);

    if (!level) {
        return <LevelSelector onSelect={setLevel} title="Choose Your Speed" levels={['Easy', 'Medium', 'Hard']} />;
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 relative h-full">
            {isHelpOpen && <HelpModal title="How to Play Snake" onClose={() => setIsHelpOpen(false)}>
                <p>Use the <strong className="text-white">Arrow Keys</strong> to move the snake.</p>
                <p>Eat the apples to grow longer. Don't run into the walls or your own tail!</p>
            </HelpModal>}
            <button onClick={() => setIsHelpOpen(true)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/20"><HelpIcon className="w-6 h-6"/></button>
            <div className="w-full max-w-lg mx-auto aspect-square">
                <div className="grid w-full h-full border bg-zinc-800" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                    {isGameOver && <GameOver score={snake.length -1} onRestart={() => { resetGame(); setLevel(null); }} />}
                    {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                        const x = i % gridSize;
                        const y = Math.floor(i / gridSize);
                        const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                        const isHead = isSnake && snake[0].x === x && snake[0].y === y;
                        const isFood = food.x === x && food.y === y;
                        return (
                            <div key={i} className="aspect-square">
                                {isHead ? <div className="w-full h-full bg-green-400 rounded-sm" /> :
                                isSnake ? <div className="w-full h-full bg-green-600 rounded-sm" /> :
                                isFood ? <AppleIcon className="w-full h-full text-red-500" /> : null}
                            </div>
                        );
                    })}
                </div>
            </div>
            <p className="mt-4 text-xl">Score: {snake.length - 1}</p>
        </div>
    );
};

// --- Tic-Tac-Toe Game ---
const TicTacToeGame: React.FC = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const winner = calculateWinner(board);
    
    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    }
    
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (board.every(Boolean)) {
        status = 'Draw!';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full relative">
            {isHelpOpen && <HelpModal title="How to Play Tic-Tac-Toe" onClose={() => setIsHelpOpen(false)}>
                <p>Two players take turns marking spaces in a 3×3 grid.</p>
                <p>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</p>
            </HelpModal>}
            <button onClick={() => setIsHelpOpen(true)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/20"><HelpIcon className="w-6 h-6"/></button>
            <div className="text-2xl mb-4">{status}</div>
            <div className="grid grid-cols-3 gap-2 w-64 h-64">
                {board.map((value, i) => (
                    <button key={i} onClick={() => handleClick(i)} className="bg-white/10 text-5xl font-bold flex items-center justify-center rounded">
                        {value}
                    </button>
                ))}
            </div>
            <button onClick={resetGame} className="mt-6 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded">New Game</button>
        </div>
    );
};
function calculateWinner(squares: ('X' | 'O' | null)[]) {
    const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// --- Memory Match Game ---
type Card = { id: number; type: string; icon: React.FC<{className?: string}>; isFlipped: boolean; isMatched: boolean; };
const MemoryMatchGame: React.FC = () => {
    const [level, setLevel] = useState<number | null>(null); // e.g., 8 pairs for 4x4
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const icons = [StartIcon, EditorIcon, SettingsIcon, CalculatorIcon, ExplorerIcon, BrowserIcon, RecycleBinIcon, TerminalIcon, VideoPlayerIcon, GeminiIcon];

    const setupGame = (pairCount: number) => {
        const gameIcons = icons.slice(0, pairCount);
        const initialCards: Card[] = [];
        gameIcons.forEach((icon, index) => {
            initialCards.push({ id: index * 2, type: `card${index}`, icon, isFlipped: false, isMatched: false });
            initialCards.push({ id: index * 2 + 1, type: `card${index}`, icon, isFlipped: false, isMatched: false });
        });
        setCards(initialCards.sort(() => Math.random() - 0.5));
        setMoves(0);
        setFlippedCards([]);
    };

    const handleCardClick = (id: number) => {
        const newCards = [...cards];
        const clickedCard = newCards.find(c => c.id === id);
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) return;

        clickedCard.isFlipped = true;
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            setMoves(m => m + 1);
            const [firstId, secondId] = flippedCards;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard?.type === secondCard?.type) {
                // Match
                const newCards = cards.map(c => c.type === firstCard.type ? { ...c, isMatched: true } : c);
                setCards(newCards);
                setFlippedCards([]);
            } else {
                // No match
                setTimeout(() => {
                    const newCards = cards.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c);
                    setCards(newCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }, [flippedCards, cards]);
    
    const isGameWon = cards.length > 0 && cards.every(c => c.isMatched);

    if (!level) {
        return <LevelSelector onSelect={(l) => {
            const pairCount = l === 'Easy' ? 4 : l === 'Medium' ? 6 : 8;
            setLevel(pairCount);
            setupGame(pairCount);
        }} title="Choose Grid Size" levels={['Easy', 'Medium', 'Hard']} />;
    }
    
    const gridSize = level === 4 ? 'grid-cols-4' : level === 6 ? 'grid-cols-4' : 'grid-cols-4';
    const cardSize = level === 8 ? 'w-16 h-16' : 'w-20 h-20';


    return (
        <div className="flex flex-col items-center justify-center p-4 h-full relative">
             {isHelpOpen && <HelpModal title="How to Play Memory Match" onClose={() => setIsHelpOpen(false)}>
                <p>Click a card to flip it over. Then, click another card to find its match.</p>
                <p>If the cards match, they stay face up. If not, they flip back over. The goal is to match all the pairs!</p>
            </HelpModal>}
            <button onClick={() => setIsHelpOpen(true)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/20"><HelpIcon className="w-6 h-6"/></button>
            {isGameWon && <GameOver score={moves} onRestart={() => setLevel(null)} message="You won!" scoreLabel='Moves'/>}
            <div className={`grid ${gridSize} gap-2`}>
                {cards.map(card => (
                    <div key={card.id} onClick={() => handleCardClick(card.id)} 
                         className={`aspect-square ${cardSize} rounded-lg transition-transform duration-500 ${card.isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                        <div className="relative w-full h-full [transform-style:preserve-3d]">
                            <div className="absolute w-full h-full bg-zinc-700 rounded-lg [backface-visibility:hidden]"></div>
                            <div className={`absolute w-full h-full flex items-center justify-center rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden] ${card.isMatched ? 'bg-green-500' : 'bg-blue-400'}`}>
                                <card.icon className="w-3/4 h-3/4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-xl">Moves: {moves}</p>
        </div>
    );
};

// --- Hangman Game ---
const words = ['REACT', 'JAVASCRIPT', 'TAILWIND', 'COMPONENT', 'DESKTOP', 'OPERATING', 'SYSTEM'];
const HangmanGame: React.FC = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    
    const resetGame = useCallback(() => {
        setWord(words[Math.floor(Math.random() * words.length)]);
        setGuessedLetters([]);
    }, []);

    useEffect(resetGame, [resetGame]);

    const incorrectGuesses = guessedLetters.filter(letter => !word.includes(letter));
    const isGameOver = incorrectGuesses.length >= 6;
    const isGameWon = word && word.split('').every(letter => guessedLetters.includes(letter));

    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full relative">
            {isHelpOpen && <HelpModal title="How to Play Hangman" onClose={() => setIsHelpOpen(false)}>
                <p>Guess the secret word one letter at a time.</p>
                <p>You can make up to 6 incorrect guesses before the game is over. Good luck!</p>
            </HelpModal>}
            <button onClick={() => setIsHelpOpen(true)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/20"><HelpIcon className="w-6 h-6"/></button>
            {(isGameOver || isGameWon) && <GameOver onRestart={resetGame} message={isGameWon ? "You won!" : "Game Over"} customContent={<p>The word was: <strong className="text-white">{word}</strong></p>} />}
            <HangmanDrawing incorrectGuesses={incorrectGuesses.length} />
            <div className="flex gap-2 text-3xl my-4 tracking-widest">
                {word.split('').map((letter, i) => (
                    <span key={i} className="w-8 border-b-4">{guessedLetters.includes(letter) ? letter : ''}</span>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                    <button key={letter} onClick={() => handleGuess(letter)} disabled={isGameOver || isGameWon || guessedLetters.includes(letter)}
                        className="w-10 h-10 bg-white/10 rounded disabled:bg-zinc-700 disabled:text-zinc-500 hover:bg-white/20">
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

const HangmanDrawing: React.FC<{ incorrectGuesses: number }> = ({ incorrectGuesses }) => (
    <div className="w-64 h-64 relative">
        {/* Gallows */}
        <div className="absolute bottom-2 left-1/4 w-3/4 h-2 bg-white" />
        <div className="absolute left-1/4 top-2 bottom-2 w-2 bg-white" />
        <div className="absolute left-1/4 top-2 w-1/2 h-2 bg-white" />
        <div className="absolute left-[calc(50%+1rem)] top-2 w-2 h-6 bg-white" />
        {/* Body Parts */}
        {incorrectGuesses > 0 && <div className="absolute left-[calc(50%-0.25rem)] top-8 w-10 h-10 border-2 rounded-full border-white" />}
        {incorrectGuesses > 1 && <div className="absolute left-1/2 top-16 w-0.5 h-12 bg-white" />}
        {incorrectGuesses > 2 && <div className="absolute left-[calc(50%-2rem)] top-20 w-8 h-0.5 bg-white -rotate-45" />}
        {incorrectGuesses > 3 && <div className="absolute left-[calc(50%+0.25rem)] top-20 w-8 h-0.5 bg-white rotate-45" />}
        {incorrectGuesses > 4 && <div className="absolute left-[calc(50%-1.75rem)] top-[calc(50%+1.5rem)] w-8 h-0.5 bg-white rotate-45" />}
        {incorrectGuesses > 5 && <div className="absolute left-[calc(50%+0.25rem)] top-[calc(50%+1.5rem)] w-8 h-0.5 bg-white -rotate-45" />}
    </div>
);


// --- Minesweeper Game ---
type Cell = { isMine: boolean, isRevealed: boolean, isFlagged: boolean, adjacentMines: number };
type Level = { name: string; width: number; height: number; mines: number; };
const LEVELS: Level[] = [
    { name: 'Easy', width: 9, height: 9, mines: 10 },
    { name: 'Medium', width: 16, height: 16, mines: 40 },
    { name: 'Hard', width: 30, height: 16, mines: 99 },
];
const MinesweeperGame: React.FC = () => {
    const [level, setLevel] = useState<Level | null>(null);
    const [board, setBoard] = useState<Cell[][]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [firstClick, setFirstClick] = useState(true);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [flagCount, setFlagCount] = useState(0);
    const [time, setTime] = useState(0);
    const timerRef = useRef<number | undefined>();

    const setupBoard = useCallback((startRow: number, startCol: number, currentLevel: Level) => {
        const { width, height, mines } = currentLevel;
        let newBoard: Cell[][] = Array(height).fill(null).map(() => Array(width).fill(null).map(() => ({ isMine: false, isRevealed: false, isFlagged: false, adjacentMines: 0 })));
        
        // Place mines
        let minesPlaced = 0;
        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * height);
            const col = Math.floor(Math.random() * width);
            const isStartCell = row === startRow && col === startCol;
            if (!newBoard[row][col].isMine && !isStartCell) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate adjacent mines
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                if (!newBoard[r][c].isMine) {
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = r + dr;
                            const nc = c + dc;
                            if (nr >= 0 && nr < height && nc >= 0 && nc < width && newBoard[nr][nc].isMine) {
                                count++;
                            }
                        }
                    }
                    newBoard[r][c].adjacentMines = count;
                }
            }
        }
        setBoard(newBoard);
        return newBoard;
    }, []);
    
    const resetGame = (selectedLevel: Level) => {
        setLevel(selectedLevel);
        const { width, height } = selectedLevel;
        setBoard(Array(height).fill(null).map(() => Array(width).fill(null).map(() => ({ isMine: false, isRevealed: false, isFlagged: false, adjacentMines: 0 }))));
        setIsGameOver(false);
        setIsGameWon(false);
        setFirstClick(true);
        setFlagCount(0);
        setTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const revealCell = (row: number, col: number, currentBoard: Cell[][]) => {
        const { width, height } = level!;
        if (row < 0 || row >= height || col < 0 || col >= width || currentBoard[row][col].isRevealed || currentBoard[row][col].isFlagged) return;
        
        currentBoard[row][col].isRevealed = true;
        
        if (currentBoard[row][col].adjacentMines === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    revealCell(row + dr, col + dc, currentBoard);
                }
            }
        }
    };
    
    const handleCellClick = (row: number, col: number) => {
        if (isGameOver || isGameWon) return;

        let currentBoard = board;
        if (firstClick) {
            currentBoard = setupBoard(row, col, level!);
            setFirstClick(false);
        }

        const newBoard = JSON.parse(JSON.stringify(currentBoard));
        if (newBoard[row][col].isMine) {
            setIsGameOver(true);
            // Reveal all mines
            newBoard.forEach((r: Cell[]) => r.forEach(c => { if (c.isMine) c.isRevealed = true; }));
        } else {
            revealCell(row, col, newBoard);
        }
        setBoard(newBoard);
    };

    const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
        e.preventDefault();
        if (isGameOver || isGameWon || board[row][col].isRevealed) return;
        const newBoard = [...board];
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setBoard(newBoard);
        setFlagCount(fc => fc + (newBoard[row][col].isFlagged ? 1 : -1));
    };

    useEffect(() => {
        if (!level || isGameOver || isGameWon) return;
        const revealedCount = board.flat().filter(c => c.isRevealed).length;
        if (revealedCount > 0 && revealedCount === level.width * level.height - level.mines) {
            setIsGameWon(true);
        }
    }, [board, level, isGameOver, isGameWon]);

    useEffect(() => {
      if (!firstClick && !isGameOver && !isGameWon) {
        timerRef.current = window.setInterval(() => setTime(t => t + 1), 1000);
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [firstClick, isGameOver, isGameWon]);
    

    if (!level) {
        return <LevelSelector onSelect={(l) => resetGame(LEVELS.find(lvl => lvl.name === l)!)} title="Choose Difficulty" levels={['Easy', 'Medium', 'Hard']} />;
    }

    return (
      <div className="flex flex-col items-center p-2 relative">
            {isHelpOpen && <HelpModal title="How to Play Minesweeper" onClose={() => setIsHelpOpen(false)}>
                <p><strong className="text-white">Left-click</strong> to reveal a cell.</p>
                <p><strong className="text-white">Right-click</strong> to place a flag where you think a mine is.</p>
                <p>The numbers show how many mines are adjacent to that cell. The goal is to reveal all non-mine cells!</p>
            </HelpModal>}
            {(isGameOver || isGameWon) && <GameOver onRestart={() => setLevel(null)} message={isGameWon ? "You Win!" : "Game Over"} customContent={<p>Time: <strong className="text-white">{time}s</strong></p>} />}
            
            <div className="flex justify-between w-full max-w-lg mb-2 p-2 bg-zinc-700 rounded items-center">
                <div className="text-lg font-mono">💣 {level.mines - flagCount}</div>
                <button onClick={() => setIsHelpOpen(true)} className="p-2 rounded-full hover:bg-white/20"><HelpIcon className="w-6 h-6"/></button>
                <div className="text-lg font-mono">⏰ {time}</div>
            </div>
            <div className="grid bg-zinc-700" style={{ gridTemplateColumns: `repeat(${level.width}, 1fr)` }}>
                {board.map((row, r) => row.map((cell, c) => (
                    <CellComponent key={`${r}-${c}`} cell={cell} onClick={() => handleCellClick(r,c)} onRightClick={(e) => handleRightClick(e, r, c)} />
                )))}
            </div>
        </div>
    );
};
const CellComponent: React.FC<{ cell: Cell; onClick: () => void; onRightClick: (e: React.MouseEvent) => void }> = ({ cell, onClick, onRightClick }) => {
    const numberColors = ['text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-yellow-600', 'text-cyan-500', 'text-black', 'text-gray-500'];
    
    if (cell.isRevealed) {
        return (
            <div className={`w-6 h-6 flex items-center justify-center bg-zinc-600 border border-zinc-500`}>
                {cell.isMine ? <MineIcon className="w-4 h-4 text-black"/> : cell.adjacentMines > 0 ? <span className={`font-bold ${numberColors[cell.adjacentMines - 1]}`}>{cell.adjacentMines}</span> : ''}
            </div>
        );
    }
    return (
        <button onClick={onClick} onContextMenu={onRightClick} className={`w-6 h-6 bg-zinc-500 hover:bg-zinc-400 border border-zinc-400`}>
            {cell.isFlagged && <FlagIcon className="w-4 h-4 mx-auto text-red-500" />}
        </button>
    );
};

// --- 2048 Game ---
const TwentyFortyEightGame: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    
    // FIX: Memoize helper functions with useCallback and define them before they are used.
    const addRandomTile = useCallback((board: number[][]) => {
        const emptyCells: {r: number, c: number}[] = [];
        board.forEach((row, r) => row.forEach((val, c) => { if (val === 0) emptyCells.push({r, c}); }));
        if (emptyCells.length > 0) {
            const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[r][c] = Math.random() > 0.9 ? 4 : 2;
        }
    }, []);
    
    const initBoard = useCallback(() => {
        let newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setIsGameOver(false);
    }, [addRandomTile]);

    useEffect(initBoard, [initBoard]);

    const slide = useCallback((row: number[]): [number[], number] => {
        let arr = row.filter(val => val);
        let scoreToAdd = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                scoreToAdd += arr[i];
                arr.splice(i + 1, 1);
            }
        }
        while (arr.length < 4) arr.push(0);
        return [arr, scoreToAdd];
    }, []);
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isGameOver) return;
        let boardChanged = false;
        let currentBoard = JSON.parse(JSON.stringify(board));
        let scoreToAdd = 0;
        
        const move = (b: number[][], direction: 'up' | 'down' | 'left' | 'right'): { newBoard: number[][], score: number } => {
            let totalScore = 0;
            const rotate = (matrix: number[][]) => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]).reverse());
            
            let tempBoard = JSON.parse(JSON.stringify(b));
            
            let rotations = 0;
            if(direction === 'up') { tempBoard = rotate(tempBoard); rotations = 1; }
            if(direction === 'right') { tempBoard = rotate(rotate(tempBoard)); rotations = 2; }
            if(direction === 'down') { tempBoard = rotate(rotate(rotate(tempBoard))); rotations = 3; }

            for (let i = 0; i < 4; i++) {
                const [newRow, newScore] = slide(tempBoard[i]);
                if (JSON.stringify(newRow) !== JSON.stringify(tempBoard[i])) boardChanged = true;
                tempBoard[i] = newRow;
                totalScore += newScore;
            }

            for(let i=0; i<4-rotations; i++) {
                // FIX: Added missing argument to the 'rotate' function call.
                tempBoard = rotate(tempBoard);
            }

            return { newBoard: tempBoard, score: totalScore };
        };

        let moveResult;
        if (e.key === 'ArrowUp') moveResult = move(currentBoard, 'up');
        if (e.key === 'ArrowDown') moveResult = move(currentBoard, 'down');
        if (e.key === 'ArrowLeft') moveResult = move(currentBoard, 'left');
        if (e.key === 'ArrowRight') moveResult = move(currentBoard, 'right');
        
        if (moveResult) {
            currentBoard = moveResult.newBoard;
            scoreToAdd = moveResult.score;
        }
        
        if (boardChanged) {
            addRandomTile(currentBoard);
            setBoard(currentBoard);
            setScore(s => s + scoreToAdd);
            // Check for game over
            const hasEmpty = currentBoard.flat().includes(0);
            let hasMoves = false;
            if (!hasEmpty) {
                if (JSON.stringify(move(currentBoard, 'up').newBoard) !== JSON.stringify(currentBoard)) hasMoves = true;
                if (JSON.stringify(move(currentBoard, 'down').newBoard) !== JSON.stringify(currentBoard)) hasMoves = true;
                if (JSON.stringify(move(currentBoard, 'left').newBoard) !== JSON.stringify(currentBoard)) hasMoves = true;
                if (JSON.stringify(move(currentBoard, 'right').newBoard) !== JSON.stringify(currentBoard)) hasMoves = true;
                if (!hasMoves) setIsGameOver(true);
            }
        }
    }, [board, isGameOver, addRandomTile, slide]);
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full relative">
            {isHelpOpen && <HelpModal title="How to Play 2048" onClose={() => setIsHelpOpen(false)}>
                <p>Use the <strong className="text-white">Arrow Keys</strong> to slide the tiles.</p>
                <p>Tiles with the same number merge into one when they touch. Combine tiles to reach the <strong className="text-white">2048</strong> tile!</p>
            </HelpModal>}
            <button onClick={() => setIsHelpOpen(true)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/20"><HelpIcon className="w-6 h-6"/></button>
            <div className="flex justify-between w-full max-w-sm mb-4">
                <p className="text-2xl font-bold">Score: {score}</p>
                <button onClick={initBoard} className="px-3 py-1 bg-zinc-700 rounded">New Game</button>
            </div>
            <div className="bg-zinc-700 p-2 rounded-lg relative">
                {isGameOver && <GameOver onRestart={initBoard} message="Game Over!" />}
                <div className="grid grid-cols-4 gap-2">
                    {board.flat().map((val, i) => <Tile key={i} value={val} />)}
                </div>
            </div>
        </div>
    );
};
const Tile: React.FC<{ value: number }> = ({ value }) => {
    const tileColors: {[key: number]: string} = {
        0: 'bg-zinc-600', 2: 'bg-gray-200 text-gray-800', 4: 'bg-gray-300 text-gray-800', 8: 'bg-orange-300 text-white',
        16: 'bg-orange-400 text-white', 32: 'bg-orange-500 text-white', 64: 'bg-red-500 text-white', 128: 'bg-yellow-400 text-white',
        256: 'bg-yellow-500 text-white', 512: 'bg-yellow-600 text-white', 1024: 'bg-indigo-500 text-white', 2048: 'bg-indigo-700 text-white'
    };
    const fontSize = value > 1000 ? 'text-2xl' : 'text-3xl';
    return (
        <div className={`w-20 h-20 flex items-center justify-center rounded-md font-bold ${fontSize} ${tileColors[value] || 'bg-black text-white'}`}>
            {value > 0 ? value : ''}
        </div>
    );
};

// --- Reusable UI Components ---
const LevelSelector: React.FC<{onSelect: (level: any) => void, title: string, levels: string[]}> = ({ onSelect, title, levels }) => (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
        <h2 className="text-2xl mb-4">{title}</h2>
        <div className="flex gap-4">
            {levels.map(level => (
                <button key={level} onClick={() => onSelect(level)} className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20">{level}</button>
            ))}
        </div>
    </div>
);
const GameOver: React.FC<{ score?: number, onRestart: () => void, message?: string, scoreLabel?: string, customContent?: React.ReactNode }> = ({ score, onRestart, message = "Game Over", scoreLabel = "Score", customContent }) => (
    <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-10 animate-fade-in">
        <h2 className="text-4xl font-bold mb-2">{message}</h2>
        {score !== undefined && <p className="text-xl mb-4">{scoreLabel}: {score}</p>}
        {customContent}
        <button onClick={onRestart} className="mt-4 px-6 py-2 bg-blue-os rounded-lg text-lg">Play Again</button>
    </div>
);


export default MiniGames;
