"use client";

import * as React from "react";

interface UseIdleTimeoutOptions {
  timeout: number;
  onIdle: () => void;
  onActive?: () => void;
  events?: string[];
  initialState?: boolean;
}

/**
 * A hook that detects when the user is idle
 * @param options Configuration options
 * @returns Whether the user is idle
 */
export function useIdleTimeout({
  timeout,
  onIdle,
  onActive,
  events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"],
  initialState = false,
}: UseIdleTimeoutOptions): boolean {
  const [isIdle, setIsIdle] = React.useState<boolean>(initialState);
  const timeoutRef = React.useRef<number | null>(null);

  const resetTimer = React.useCallback(() => {
    if (typeof window === "undefined") return;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (isIdle) {
      setIsIdle(false);
      onActive?.();
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsIdle(true);
      onIdle();
    }, timeout);
  }, [isIdle, onActive, onIdle, timeout]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Setup the timer initially
    resetTimer();

    // Add event listeners
    const eventListeners = events.map((event) => {
      return { event, handler: resetTimer };
    });

    eventListeners.forEach(({ event, handler }) => {
      window.addEventListener(event, handler);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      eventListeners.forEach(({ event, handler }) => {
        window.removeEventListener(event, handler);
      });
    };
  }, [events, resetTimer, timeout]);

  return isIdle;
}
