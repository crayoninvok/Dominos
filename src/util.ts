export type Domino = [number, number];

export const add = (dominoes: Domino[], newDomino: Domino): Domino[] => {
  return [...dominoes, newDomino];
};

export const sortAsc = (dominoes: Domino[]): Domino[] => {
  return [...dominoes].sort((a, b) => a[0] - b[0]);
};

export const sortDesc = (dominoes: Domino[]): Domino[] => {
  return [...dominoes].sort((a, b) => b[0] - a[0]);
};

export const flipDominoes = (dominoes: Domino[]): Domino[] => {
  return dominoes.map(([a, b]) => [b, a]);
};

export const removeDuplicates = (dominoes: Domino[]): Domino[] => {
  const seen = new Set();
  return dominoes.filter(([a, b]) => {
    const key = `${a}-${b}`;
    const reverseKey = `${b}-${a}`;
    if (seen.has(key) || seen.has(reverseKey)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const filterByNumber = (dominoes: Domino[], number: number): Domino[] => {
  return dominoes.filter(([a, b]) => a !== number && b !== number);
};

export const findDoubles = (dominoes: Domino[]): number[] => {
  return dominoes.filter(([a, b]) => a === b).map(([a]) => a);
};

/**
 * Function to generate dot positions for a given domino value
 * @param number - The number on the domino (1 to 6)
 * @returns An array of strings representing the positions of dots
 */
export const generateDots = (number: number): string[] => {
  const dotPositions: Record<number, string[]> = {
    1: ['center'],
    2: ['top-left', 'bottom-right'],
    3: ['top-left', 'center', 'bottom-right'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'],
    6: [
      'top-left',
      'top-right',
      'middle-left',
      'middle-right',
      'bottom-left',
      'bottom-right',
    ],
  };

  return dotPositions[number] || [];
};
