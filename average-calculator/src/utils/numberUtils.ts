const removeDuplicates = (numbers: number[]): number[] => {
  return [...new Set(numbers)];
};

const updateWindow = (
  currentWindow: number[],
  newNumbers: number[],
  size: number
): number[] => {
  const combined = [...currentWindow, ...newNumbers];
  if (combined.length <= size) {
    return combined;
  }
  return combined.slice(-size);
};

const calculateAverage = (numbers: number[]): number => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return numbers.length ? sum / numbers.length : 0;
};

export default { removeDuplicates, updateWindow, calculateAverage };
