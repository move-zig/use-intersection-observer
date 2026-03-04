import { useCallback, useEffect, useRef, useState } from 'react';

import { thresholdMet } from './thresholdMet.mjs';

type IntersectionResult = [ isIntersecting: boolean, ref: (node: Element | null) => void ];

/**
 * Asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
 *
 * @param once Whether to track only once, stopping after the first time the element is intersected; or to keep track of its current intersected state on an ongoing basis
 * @param options An IntersectionObserverInit object; should be a stable reference
 * @returns A tuple containing a callback ref to be assigned to the element and the isIntersecting state
 */
export const useIntersectionObserver = (once = false, options?: IntersectionObserverInit): IntersectionResult => {
  const [ isIntersecting, setIsIntersecting ] = useState(false);
  const [ element, setElement ] = useState<Element | null>(null);

  // synchronously keep track of which element we're supposed to be observing
  const currentElement = useRef<Element | null>(null);

  // use a callback ref so we can detect when the element instance changes
  // and recreate the observer for the new element
  const ref = useCallback((node: Element | null) => {
    currentElement.current = node;
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observed = element; // the element this observer instance will observe

    const observer = new IntersectionObserver(entries => {
      // ignore callbacks from an observer that was created for a previous element
      // (cleanup may not have disconnected it yet)
      if (currentElement.current !== observed) {
        return;
      }

      const thisEntry = entries[0];
      if (!thisEntry) {
        observer.disconnect();
        return;
      }

      if (thisEntry.isIntersecting) {
        setIsIntersecting(true);
        if (once && thresholdMet(thisEntry.intersectionRatio, options?.threshold)) {
          // we don't need it any more
          observer.disconnect();
        }
      } else if (!once) {
        setIsIntersecting(false);
      }
    }, options);

    observer.observe(observed);

    return () => { observer.disconnect(); };
  }, [ element, options, once ]);

  return [ isIntersecting, ref ];
};
