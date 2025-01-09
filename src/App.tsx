import React, { useState } from "react";
import {
  sortAsc,
  sortDesc,
  flipDominoes,
  removeDuplicates,
  filterByNumber,
  findDoubles,
  Domino,
  generateDots,
} from "./util";

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

  const [input, setInput] = useState("");

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
    setInput("");
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
                className={`h-5 w-5 rounded-full bg-red-500 ${
                  positions.includes(position) ? "" : "opacity-0"
                }`}
              />
            );
          })}
      </div>
    );
  };

  const getPosition = (index: number) => {
    const positions = [
      "top-left",
      "top-center",
      "top-right",
      "middle-left",
      "center",
      "middle-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ];
    return positions[index];
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-[50px] font-bold mb-4 text-center glowing-text-aqua">
          Dominoes Card Stack
        </h1>

        {/* Source */}
        <div className="mb-4">
          <label className="block text-2xl font-medium mb-1 glowing-text-red p-5">Source</label>
          <textarea
            className="border-2 shadow-glow w-full h-32 bg-black p-4 rounded-lg text-center text-xl glowing-text-aqua font-mono focus:outline-none resize-none"
            value={JSON.stringify(dominoes)} // Indented JSON for readability
            readOnly
          />
        </div>

        {/* Double Numbers */}
        <div className="mb-4">
          <label className="block text-2xl font-medium mb-1 glowing-text-red p-5">
            Double Numbers
          </label>
          <textarea
            className="border border-gray-500 w-full h-16 shadow-glow glowing-text-aqua bg-black p-4 rounded-lg text-center text-xl font-mono focus:outline-none"
            value={findDoubles(dominoes).join(", ")}
            readOnly
          />
        </div>

        {/* Dominoes Display */}
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          {dominoes.map(([left, right], index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between border-2 border-black rounded-2xl bg-gradient-to-b from-amber-300 to-amber-100 shadow-lg w-[100px]"
            >
              {/* Top Side */}
              <div className="w-full flex-1 flex items-center justify-center border-b-2 border-black p-3">
                {renderDots(left)}
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-black" />

              {/* Bottom Side */}
              <div className="w-full flex-1 flex items-center justify-center p-3">
                {renderDots(right)}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex space-x-3 mb-5 justify-center">
          <button
            onClick={handleSortAsc}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Sort (ASC)
          </button>
          <button
            onClick={handleSortDesc}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Sort (DESC)
          </button>
          <button
            onClick={handleFlip}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Flip
          </button>
          <button
            onClick={handleRemoveDuplicates}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Remove Dup
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* Remove Number */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-500 bg-gray-100 p-3 rounded-lg w-full text-center text-lg font-mono focus:outline-none"
            placeholder="Input Number"
          />
          <button
            onClick={handleRemoveNumber}
            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
