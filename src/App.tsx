import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleInput = (value: string) => setInput(input + value);
  const clearInput = () => { setInput(''); setResult(null); };
  const calculate = () => {
    try { setResult(eval(input)); }
    catch { setResult(null); }
  };

  const buttonClass = (type: 'number' | 'operator' | 'function', symbol?: string) => {
    const base = `
      h-12 w-12 md:h-14 md:w-14 rounded-xl flex items-center justify-center text-xl font-bold
      transition-transform duration-100 active:scale-95 shadow-inner
    `;
    const numberStyle = 'text-gray-600 bg-gray-200 hover:bg-gray-300';
    const functionStyle = 'text-gray-600 bg-gray-200 hover:bg-gray-300';
    const gradient = (symbol?: string) => {
      switch (symbol) {
        case '+': return 'bg-gradient-to-r from-pink-400 to-red-400 text-transparent bg-clip-text';
        case '-': return 'bg-gradient-to-r from-orange-400 to-pink-400 text-transparent bg-clip-text';
        case '*': return 'bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text';
        case '/': return 'bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text';
        case '=': return 'bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text';
        default: return 'text-white';
      }
    };
    if (type === 'number') return `${base} ${numberStyle}`;
    if (type === 'function') return `${base} ${functionStyle}`;
    if (type === 'operator') return `${base} ${gradient(symbol)}`;
    return base;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-colors duration-300">
      <div className="bg-white rounded-2xl shadow-xl w-72 p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-2xl font-semibold text-gray-800">
            CALCULATOR
          </div>
        </div>

          <div className="text-right text-gray-800 text-sm break-all">{input || '0'}</div>
          <div className="text-right text-black text-base break-all py-5">
            {result !== null ? `= ${result}` : ''}
          </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={clearInput} className={buttonClass('function')}>C</button>
          <button onClick={() => handleInput('(')} className={buttonClass('function')}>(</button>
          <button onClick={() => handleInput(')')} className={buttonClass('function')}>)</button>
          <button onClick={() => handleInput('/')} className={buttonClass('operator', '/')}>÷</button>

          <button onClick={() => handleInput('7')} className={buttonClass('number')}>7</button>
          <button onClick={() => handleInput('8')} className={buttonClass('number')}>8</button>
          <button onClick={() => handleInput('9')} className={buttonClass('number')}>9</button>
          <button onClick={() => handleInput('*')} className={buttonClass('operator', '*')}>×</button>

          <button onClick={() => handleInput('4')} className={buttonClass('number')}>4</button>
          <button onClick={() => handleInput('5')} className={buttonClass('number')}>5</button>
          <button onClick={() => handleInput('6')} className={buttonClass('number')}>6</button>
          <button onClick={() => handleInput('-')} className={buttonClass('operator', '-')}>−</button>

          <button onClick={() => handleInput('1')} className={buttonClass('number')}>1</button>
          <button onClick={() => handleInput('2')} className={buttonClass('number')}>2</button>
          <button onClick={() => handleInput('3')} className={buttonClass('number')}>3</button>
          <button onClick={() => handleInput('+')} className={buttonClass('operator', '+')}>+</button>

          <button onClick={() => handleInput('0')} className={buttonClass('number')}>0</button>
          <button onClick={() => handleInput('.')} className={buttonClass('number')}>.</button>
          <button onClick={calculate} className={buttonClass('operator', '=')}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;