"use client";

import * as React from "react";

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
  enabled?: boolean;
}

/**
 * A hook that observes when an element intersects with the viewport
 * @param options The IntersectionObserver options
 * @returns A ref to attach to the element and whether it's intersecting
 */
export function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && onIntersect) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [enabled, root, rootMargin, threshold, onIntersect]);

  return { ref, isIntersecting };
}
