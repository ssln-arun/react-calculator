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
      h-10 sm:h-12 md:h-14 w-full rounded-xl flex items-center justify-center 
      text-xl font-semibold transition-all duration-150 active:scale-95 shadow
    `;
    const numberStyle = 'text-gray-800 bg-gray-100 hover:bg-gray-200';
    const functionStyle = 'text-gray-800 bg-gray-200 hover:bg-gray-300';
    const gradient = (symbol?: string) => {
      switch (symbol) {
        case '+': return 'bg-gradient-to-r from-pink-500 to-red-500 text-white';
        case '-': return 'bg-gradient-to-r from-orange-400 to-pink-400 text-white';
        case '*': return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
        case '/': return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white';
        case '=': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
        default: return 'text-white bg-gray-500';
      }
    };
    if (type === 'number') return `${base} ${numberStyle}`;
    if (type === 'function') return `${base} ${functionStyle}`;
    if (type === 'operator') return `${base} ${gradient(symbol)}`;
    return base;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-6 sm:p-10">
        <div className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Calculator
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-right text-2xl text-gray-900 break-words min-h-[60px]">
          {input || '0'}
        </div>
        <div className="text-right text-green-600 text-xl my-3">
          {result !== null ? `= ${result}` : ''}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4">
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
          <div className="col-span-2">
            <button onClick={calculate} className={`${buttonClass('operator', '=')} w-full`}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;