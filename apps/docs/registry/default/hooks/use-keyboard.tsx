"use client";

import * as React from "react";

type KeyHandler = (event: KeyboardEvent) => void;
type KeyMap = Record<string, KeyHandler>;

interface UseKeyboardOptions {
  target?: React.RefObject<HTMLElement> | null;
  event?: "keydown" | "keyup" | "keypress";
  enabled?: boolean;
}

/**
 * A hook for handling keyboard events
 * @param keyMap Map of keys to handlers
 * @param options Configuration options
 */
export function useKeyboard(
  keyMap: KeyMap,
  { target = null, event = "keydown", enabled = true }: UseKeyboardOptions = {},
) {
  React.useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const targetElement = target?.current ?? document;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in keyMap) {
        keyMap[key](e);
      }
    };

    targetElement.addEventListener(event, handler);
    return () => targetElement.removeEventListener(event, handler);
  }, [keyMap, target, event, enabled]);
}
