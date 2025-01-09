import React, { useState } from 'react';
import {
  sortAsc,
  sortDesc,
  flipDominoes,
  removeDuplicates,
  filterByNumber,
  findDoubles,
  Domino,
  generateDots,
} from './util';

const App: React.FC = () => {
  const [dominoes, setDominoes] = useState<Domino[]>([
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
  ]);

  const [input, setInput] = useState('');

  // Handlers
  const handleSortAsc = () => setDominoes(sortAsc(dominoes));
  const handleSortDesc = () => setDominoes(sortDesc(dominoes));
  const handleFlip = () => setDominoes(flipDominoes(dominoes));
  const handleRemoveDuplicates = () => setDominoes(removeDuplicates(dominoes));
  const handleReset = () =>
    setDominoes([
      [6, 1],
      [4, 3],
      [5, 1],
      [3, 4],
      [1, 1],
      [3, 4],
      [1, 2],
    ]);

  const handleRemoveNumber = () => {
    const numberToRemove = parseInt(input, 10);
    if (!isNaN(numberToRemove)) {
      setDominoes(filterByNumber(dominoes, numberToRemove));
    }
    setInput('');
  };

  // Renders dots for a domino value
  const renderDots = (number: number) => {
    const positions = generateDots(number);

    return (
      <div className="grid grid-cols-3 gap-1 w-16 h-20 relative">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            const position = getPosition(index);
            return (
              <div
                key={index}
                className={`h-3 w-3 rounded-full bg-black ${
                  positions.includes(position) ? '' : 'opacity-0'
                }`}
              />
            );
          })}
      </div>
    );
  };

  const getPosition = (index: number) => {
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'middle-left',
      'center',
      'middle-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ];
    return positions[index];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dominoes</h1>

      {/* Source */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Source</label>
        <textarea
          className="border w-full p-2 rounded"
          value={JSON.stringify(dominoes)}
          readOnly
        />
      </div>

      {/* Double Numbers */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Double Numbers</label>
        <textarea
          className="border w-full p-2 rounded"
          value={findDoubles(dominoes).join(', ')}
          readOnly
        />
      </div>

      {/* Dominoes Display */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {dominoes.map(([left, right], index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between border-2 border-black rounded-lg bg-white shadow-lg w-20 h-40"
          >
            {/* Top Side */}
            <div className="w-full flex-1 flex items-center justify-center border-b-2 border-black">
              {renderDots(left)}
            </div>

            {/* Divider */}
            <div className="w-full h-1 bg-black" />

            {/* Bottom Side */}
            <div className="w-full flex-1 flex items-center justify-center">
              {renderDots(right)}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex space-x-2 mb-4">
        <button onClick={handleSortAsc} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sort (ASC)
        </button>
        <button onClick={handleSortDesc} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sort (DESC)
        </button>
        <button onClick={handleFlip} className="px-4 py-2 bg-blue-500 text-white rounded">
          Flip
        </button>
        <button onClick={handleRemoveDuplicates} className="px-4 py-2 bg-blue-500 text-white rounded">
          Remove Dup
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-blue-500 text-white rounded">
          Reset
        </button>
      </div>

      {/* Remove Number */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Input Number"
        />
        <button onClick={handleRemoveNumber} className="px-4 py-2 bg-red-500 text-white rounded">
          Remove
        </button>
      </div>
    </div>
  );
};

export default App;
