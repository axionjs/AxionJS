import { useState, useCallback, useRef, useEffect } from "react";

interface FullscreenOptions {
  /** Element to request fullscreen. Falls back to document.documentElement if not provided */
  element?: React.RefObject<HTMLElement>;
  /** Function to run when fullscreen is entered */
  onEnter?: () => void;
  /** Function to run when fullscreen is exited */
  onExit?: () => void;
  /** Whether to automatically apply fallback strategies for iOS (default: true) */
  iosFallback?: boolean;
}

/**
 * Custom hook for controlling fullscreen mode with cross-browser support
 *
 * @param options Configuration options for fullscreen behavior
 * @returns Object containing fullscreen state and control functions
 */
export function useFullscreen(options: FullscreenOptions = {}) {
  const { element, onEnter, onExit, iosFallback = true } = options;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isIOS = useRef(false);
  const onEnterRef = useRef(onEnter);
  const onExitRef = useRef(onExit);

  // Update callback refs when they change
  useEffect(() => {
    onEnterRef.current = onEnter;
    onExitRef.current = onExit;
  }, [onEnter, onExit]);

  // Check browser support for fullscreen API
  useEffect(() => {
    if (typeof document === "undefined") return;

    const fullscreenEnabled =
      document.fullscreenEnabled ||
      // @ts-ignore - Vendor prefixes
      document.webkitFullscreenEnabled ||
      // @ts-ignore - Vendor prefixes
      document.mozFullScreenEnabled ||
      // @ts-ignore - Vendor prefixes
      document.msFullscreenEnabled;

    isIOS.current =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;

    setIsSupported(!!fullscreenEnabled || (iosFallback && isIOS.current));
  }, [iosFallback]);

  // Function to get the target element
  const getTargetElement = useCallback(() => {
    if (element && element.current) {
      return element.current;
    }
    return document.documentElement;
  }, [element]);

  // Track fullscreen changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        // @ts-ignore - Vendor prefixes
        document.webkitFullscreenElement ||
        // @ts-ignore - Vendor prefixes
        document.mozFullScreenElement ||
        // @ts-ignore - Vendor prefixes
        document.msFullscreenElement;

      const newIsFullscreen = !!fullscreenElement;
      setIsFullscreen(newIsFullscreen);

      if (newIsFullscreen && onEnterRef.current) {
        onEnterRef.current();
      } else if (!newIsFullscreen && onExitRef.current) {
        onExitRef.current();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  // Enter fullscreen
  const enter = useCallback(async () => {
    if (!isSupported) {
      setError(new Error("Fullscreen not supported"));
      return false;
    }

    const target = getTargetElement();
    setError(null);

    try {
      if (isIOS.current && iosFallback) {
        // iOS Safari doesn't support true fullscreen
        // Apply a CSS class that makes the element take the full screen
        if (target) {
          target.style.position = "fixed";
          target.style.top = "0";
          target.style.right = "0";
          target.style.bottom = "0";
          target.style.left = "0";
          target.style.width = "100vw";
          target.style.height = "100vh";
          target.style.zIndex = "9999";
          target.style.backgroundColor = "#000";

          // Force orientation change if possible
          if (screen.orientation && screen.orientation.lock) {
            try {
              await screen.orientation.lock("landscape");
            } catch (e) {
              // Ignore orientation errors
            }
          }

          setIsFullscreen(true);
          if (onEnterRef.current) {
            onEnterRef.current();
          }
          return true;
        }
      } else {
        // Standard fullscreen API
        if (target.requestFullscreen) {
          await target.requestFullscreen();
          return true;
        } else if (target.webkitRequestFullscreen) {
          // @ts-ignore - Vendor prefixes
          await target.webkitRequestFullscreen();
          return true;
        } else if (target.mozRequestFullScreen) {
          // @ts-ignore - Vendor prefixes
          await target.mozRequestFullScreen();
          return true;
        } else if (target.msRequestFullscreen) {
          // @ts-ignore - Vendor prefixes
          await target.msRequestFullscreen();
          return true;
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Error entering fullscreen"),
      );
      return false;
    }

    setError(new Error("Fullscreen request failed"));
    return false;
  }, [isSupported, getTargetElement, iosFallback]);

  // Exit fullscreen
  const exit = useCallback(async () => {
    if (!isFullscreen) return true;
    setError(null);

    try {
      if (isIOS.current && iosFallback) {
        // iOS Safari fallback cleanup
        const target = getTargetElement();
        if (target) {
          target.style.position = "";
          target.style.top = "";
          target.style.right = "";
          target.style.bottom = "";
          target.style.left = "";
          target.style.width = "";
          target.style.height = "";
          target.style.zIndex = "";
          target.style.backgroundColor = "";

          setIsFullscreen(false);
          if (onExitRef.current) {
            onExitRef.current();
          }
          return true;
        }
      } else {
        // Standard fullscreen API
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          return true;
        } else if (document.webkitExitFullscreen) {
          // @ts-ignore - Vendor prefixes
          await document.webkitExitFullscreen();
          return true;
        } else if (document.mozCancelFullScreen) {
          // @ts-ignore - Vendor prefixes
          await document.mozCancelFullScreen();
          return true;
        } else if (document.msExitFullscreen) {
          // @ts-ignore - Vendor prefixes
          await document.msExitFullscreen();
          return true;
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Error exiting fullscreen"),
      );
      return false;
    }

    setError(new Error("Exit fullscreen failed"));
    return false;
  }, [isFullscreen, getTargetElement, iosFallback]);

  // Toggle fullscreen
  const toggle = useCallback(async () => {
    if (isFullscreen) {
      return exit();
    } else {
      return enter();
    }
  }, [isFullscreen, enter, exit]);

  return {
    isFullscreen,
    isSupported,
    error,
    enter,
    exit,
    toggle,
  };
}
