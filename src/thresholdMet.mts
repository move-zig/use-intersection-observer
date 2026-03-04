export const thresholdMet = (ratio: number, threshold?: number | number[]) => {
  if (typeof threshold === 'undefined') {
    return true;
  }
  if (typeof threshold === 'number') {
    return ratio >= threshold;
  }
  const largest = Math.max(...threshold);
  if (largest) {
    return ratio >= largest;
  }
};
