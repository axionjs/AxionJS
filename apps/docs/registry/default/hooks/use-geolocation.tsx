import { useState, useEffect, useCallback, useRef } from "react";

interface GeolocationOptions {
  /** Whether to watch position continuously (default: false) */
  watch?: boolean;
  /** Geolocation API enableHighAccuracy option (default: false) */
  enableHighAccuracy?: boolean;
  /** Geolocation API timeout in milliseconds (default: 10000) */
  timeout?: number;
  /** Geolocation API maximumAge in milliseconds (default: 0) */
  maximumAge?: number;
  /** Automatically request permission on mount (default: true) */
  autoRequest?: boolean;
}

interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

interface GeolocationState {
  isSupported: boolean;
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  isLoading: boolean;
  permissionState: PermissionState | null;
}

/**
 * Custom hook for accessing and watching browser geolocation
 *
 * @param options Configuration options for the geolocation API
 * @returns Object containing geolocation state and control functions
 */
export function useGeolocation(options: GeolocationOptions = {}) {
  const {
    watch = false,
    enableHighAccuracy = false,
    timeout = 10000,
    maximumAge = 0,
    autoRequest = true,
  } = options;

  const [state, setState] = useState<GeolocationState>({
    isSupported: typeof navigator !== "undefined" && "geolocation" in navigator,
    position: null,
    error: null,
    isLoading: false,
    permissionState: null,
  });

  const watchIdRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // Check permission status
  const checkPermission = useCallback(async () => {
    if (typeof navigator === "undefined" || !("permissions" in navigator)) {
      return null;
    }

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation" as PermissionName,
      });

      if (isMountedRef.current) {
        setState((prev) => ({ ...prev, permissionState: permission.state }));
      }

      // Listen for permission changes
      permission.addEventListener("change", () => {
        if (isMountedRef.current) {
          setState((prev) => ({ ...prev, permissionState: permission.state }));
        }
      });

      return permission.state;
    } catch (error) {
      console.error("Error checking geolocation permission:", error);
      return null;
    }
  }, []);

  // Get current position
  const getPosition = useCallback(() => {
    if (!state.isSupported) {
      setState((prev) => ({
        ...prev,
        error: {
          code: 0,
          message: "Geolocation is not supported in this browser",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError,
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    const geoOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (watch) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          if (isMountedRef.current) {
            setState((prev) => ({
              ...prev,
              position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.speed,
                timestamp: position.timestamp,
              },
              error: null,
              isLoading: false,
            }));
          }
        },
        (error) => {
          if (isMountedRef.current) {
            setState((prev) => ({
              ...prev,
              error,
              isLoading: false,
            }));
          }
        },
        geoOptions,
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMountedRef.current) {
            setState((prev) => ({
              ...prev,
              position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.speed,
                timestamp: position.timestamp,
              },
              error: null,
              isLoading: false,
            }));
          }
        },
        (error) => {
          if (isMountedRef.current) {
            setState((prev) => ({
              ...prev,
              error,
              isLoading: false,
            }));
          }
        },
        geoOptions,
      );
    }
  }, [state.isSupported, enableHighAccuracy, timeout, maximumAge, watch]);

  // Stop watching position
  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  // Initialize
  useEffect(() => {
    isMountedRef.current = true;
    checkPermission();

    if (autoRequest) {
      getPosition();
    }

    return () => {
      isMountedRef.current = false;
      stopWatching();
    };
  }, [autoRequest, checkPermission, getPosition, stopWatching]);

  return {
    ...state,
    getPosition,
    stopWatching,
    checkPermission,
  };
}
