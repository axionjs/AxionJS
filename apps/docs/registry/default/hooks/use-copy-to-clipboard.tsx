"use client";

import * as React from "react";

interface UseCopyToClipboardReturn {
  value: string;
  copy: (text: string) => Promise<boolean>;
  isCopied: boolean;
}

/**
 * A hook that provides copy to clipboard functionality
 * @returns An object with the copied value, copy function, and isCopied state
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [value, setValue] = React.useState<string>("");
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copy = React.useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state
    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      setIsCopied(true);

      // Reset the isCopied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setValue("");
      setIsCopied(false);
      return false;
    }
  }, []);

  return { value, copy, isCopied };
}
