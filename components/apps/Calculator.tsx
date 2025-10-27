import React, { useState, useEffect } from 'react';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [operand1, setOperand1] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const handleDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperator = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (operand1 === null) {
            setOperand1(inputValue);
        } else if (operator) {
            const result = performCalculation();
            setDisplay(String(result));
            setOperand1(result);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };
    
    const performCalculation = () => {
        const inputValue = parseFloat(display);
        if (operand1 === null || operator === null) return inputValue;
        
        switch (operator) {
            case '+': return operand1 + inputValue;
            case '-': return operand1 - inputValue;
            case '*': return operand1 * inputValue;
            case '/': return operand1 / inputValue;
            default: return inputValue;
        }
    };

    const handleEquals = () => {
        if (operator && operand1 !== null) {
            const result = performCalculation();
            setDisplay(String(result));
            setOperand1(null);
            setOperator(null);
            setWaitingForOperand(true);
        }
    };
    
    const handleClear = () => {
        setDisplay('0');
        setOperand1(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key >= '0' && event.key <= '9') handleDigit(event.key);
            else if (event.key === '.') handleDecimal();
            else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') handleOperator(event.key);
            else if (event.key === 'Enter' || event.key === '=') handleEquals();
            else if (event.key === 'Escape') handleClear();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [display, operator, operand1]);

    const buttonClass = "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 rounded-lg text-2xl";
    const operatorClass = "bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-2xl";
    const specialClass = "bg-zinc-400 dark:bg-zinc-500 hover:bg-zinc-500 dark:hover:bg-zinc-400 rounded-lg text-xl"

    return (
        <div className="flex justify-center items-center h-full bg-zinc-100 dark:bg-zinc-800">
            <div className="w-full max-w-xs p-4 space-y-4">
                <div className="bg-zinc-200 dark:bg-zinc-900 p-4 rounded-lg text-4xl text-right font-mono break-all">{display}</div>
                <div className="grid grid-cols-4 gap-2">
                    <button onClick={handleClear} className={`${specialClass} col-span-2`}>AC</button>
                    <button onClick={() => {}} className={specialClass}>+/-</button>
                    <button onClick={() => handleOperator('/')} className={operatorClass}>÷</button>

                    <button onClick={() => handleDigit('7')} className={buttonClass}>7</button>
                    <button onClick={() => handleDigit('8')} className={buttonClass}>8</button>
                    <button onClick={() => handleDigit('9')} className={buttonClass}>9</button>
                    <button onClick={() => handleOperator('*')} className={operatorClass}>×</button>

                    <button onClick={() => handleDigit('4')} className={buttonClass}>4</button>
                    <button onClick={() => handleDigit('5')} className={buttonClass}>5</button>
                    <button onClick={() => handleDigit('6')} className={buttonClass}>6</button>
                    <button onClick={() => handleOperator('-')} className={operatorClass}>−</button>

                    <button onClick={() => handleDigit('1')} className={buttonClass}>1</button>
                    <button onClick={() => handleDigit('2')} className={buttonClass}>2</button>
                    <button onClick={() => handleDigit('3')} className={buttonClass}>3</button>
                    <button onClick={() => handleOperator('+')} className={operatorClass}>+</button>

                    <button onClick={() => handleDigit('0')} className={`${buttonClass} col-span-2`}>0</button>
                    <button onClick={handleDecimal} className={buttonClass}>.</button>
                    <button onClick={handleEquals} className={operatorClass}>=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;