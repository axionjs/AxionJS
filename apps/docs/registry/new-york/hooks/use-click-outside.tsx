"use client";

import * as React from "react";

/**
 * A hook that detects clicks outside of an element
 * @param handler The callback to run when a click outside is detected
 * @param active Whether the detection is active
 * @returns A ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  active = true,
): React.RefObject<T> {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handler, active]);

  return ref;
}
