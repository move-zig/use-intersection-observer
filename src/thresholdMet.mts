export const thresholdMet = (ratio: number, threshold?: number | number[]) => {
  if (typeof threshold === 'undefined') {
    return true;
  }
  if (typeof threshold === 'number') {
    return ratio >= threshold;
  }
  const lastThreshold = threshold[threshold.length - 1];
  if (lastThreshold) {
    return ratio >= lastThreshold;
  }
};
