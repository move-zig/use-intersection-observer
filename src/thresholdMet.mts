export const thresholdMet = (ratio: number, threshold?: number | number[]) => {
  return ratio >= getThreshold(threshold);
};

const getThreshold = (threshold?: number | number[]): number => {
  if (Array.isArray(threshold)) {
    return Math.max(...threshold);
  }
  return threshold ?? 0;
};
