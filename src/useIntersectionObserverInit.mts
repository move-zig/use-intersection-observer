import { useMemo } from 'react';

// For the caller to memoize an IntersectionObserverInit if needed
export const useIntersectionObserverInit = (o: IntersectionObserverInit) => {
  const thresholdKey = Array.isArray(o.threshold)
    ? o.threshold.join(',')
    : o.threshold;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => o, [ o.root, o.rootMargin, thresholdKey ]);
};
