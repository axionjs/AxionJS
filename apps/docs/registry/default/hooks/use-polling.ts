"use client";
import { useEffect, useRef, useCallback, useState, useReducer } from "react";

interface PollingOptions<T> {
  /** The function to call on each polling interval */
  fetchFn: () => Promise<T>;
  /** Polling interval in milliseconds (default: 5000) */
  interval?: number;
  /** Whether to start polling immediately (default: true) */
  autoStart?: boolean;
  /** Maximum number of consecutive errors before stopping (default: Infinity) */
  maxErrors?: number;
  /** Whether to immediately run fetchFn on start (default: true) */
  runImmediately?: boolean;
  /** Initial data to use before first fetch completes */
  initialData?: T;
  /** Define custom error handling logic */
  onError?: (error: Error) => void;
  /** Callback when data is successfully fetched */
  onSuccess?: (data: T) => void;
  /** Check if response is considered an error */
  isDataValid?: (data: T) => boolean;
}

type PollingStatus = "IDLE" | "POLLING" | "PAUSED" | "ERROR" | "STOPPED";

interface PollingState<T> {
  data: T | null;
  error: Error | null;
  status: PollingStatus;
  lastUpdated: number | null;
  errorCount: number;
}

type PollingAction<T> =
  | { type: "START_POLLING" }
  | { type: "PAUSE_POLLING" }
  | { type: "STOP_POLLING" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: Error }
  | { type: "RESET_ERRORS" };

/**
 * Custom hook for polling an API endpoint at regular intervals
 *
 * @param options Configuration options for polling
 * @returns Object containing polling state and control functions
 */
export function usePolling<T>(options: PollingOptions<T>) {
  const {
    fetchFn,
    interval = 5000,
    autoStart = true,
    maxErrors = Infinity,
    runImmediately = true,
    initialData = null as unknown as T,
    onError,
    onSuccess,
    isDataValid,
  } = options;

  const initialState: PollingState<T> = {
    data: initialData,
    error: null,
    status: "IDLE",
    lastUpdated: null,
    errorCount: 0,
  };

  const reducer = (
    state: PollingState<T>,
    action: PollingAction<T>,
  ): PollingState<T> => {
    switch (action.type) {
      case "START_POLLING":
        return {
          ...state,
          status: "POLLING",
        };
      case "PAUSE_POLLING":
        return {
          ...state,
          status: "PAUSED",
        };
      case "STOP_POLLING":
        return {
          ...state,
          status: "STOPPED",
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          data: action.payload,
          error: null,
          lastUpdated: Date.now(),
          errorCount: 0,
          status: state.status === "ERROR" ? "POLLING" : state.status,
        };
      case "FETCH_ERROR":
        const newErrorCount = state.errorCount + 1;
        return {
          ...state,
          error: action.payload,
          errorCount: newErrorCount,
          status: newErrorCount >= maxErrors ? "ERROR" : state.status,
        };
      case "RESET_ERRORS":
        return {
          ...state,
          errorCount: 0,
          error: null,
          status: state.status === "ERROR" ? "POLLING" : state.status,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const executeFetch = useCallback(async () => {
    try {
      const result = await fetchFn();

      if (!isMountedRef.current) return;

      if (isDataValid && !isDataValid(result)) {
        throw new Error("Invalid data received");
      }

      dispatch({ type: "FETCH_SUCCESS", payload: result });

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      if (!isMountedRef.current) return;

      const err =
        error instanceof Error
          ? error
          : new Error("Unknown error during polling");

      dispatch({ type: "FETCH_ERROR", payload: err });

      if (onError) {
        onError(err);
      }
    }
  }, [fetchFn, isDataValid, onSuccess, onError]);

  const startPolling = useCallback(() => {
    if (state.status === "POLLING") return;

    dispatch({ type: "START_POLLING" });

    if (runImmediately) {
      executeFetch();
    }

    const poll = () => {
      if (!isMountedRef.current || state.status !== "POLLING") return;

      executeFetch().finally(() => {
        if (isMountedRef.current && state.status === "POLLING") {
          timeoutRef.current = setTimeout(poll, interval);
        }
      });
    };

    timeoutRef.current = setTimeout(poll, runImmediately ? interval : 0);
  }, [state.status, executeFetch, interval, runImmediately]);

  const pausePolling = useCallback(() => {
    dispatch({ type: "PAUSE_POLLING" });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopPolling = useCallback(() => {
    dispatch({ type: "STOP_POLLING" });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetErrors = useCallback(() => {
    dispatch({ type: "RESET_ERRORS" });

    if (state.status === "ERROR") {
      startPolling();
    }
  }, [state.status, startPolling]);

  const fetchNow = useCallback(() => {
    if (state.status === "POLLING" || state.status === "PAUSED") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      executeFetch().finally(() => {
        if (isMountedRef.current && state.status === "POLLING") {
          timeoutRef.current = setTimeout(executeFetch, interval);
        }
      });
    }
  }, [state.status, executeFetch, interval]);

  // Start polling on mount if autoStart is true
  useEffect(() => {
    if (autoStart) {
      startPolling();
    }

    return () => {
      isMountedRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoStart, startPolling]);

  return {
    ...state,
    isPolling: state.status === "POLLING",
    isPaused: state.status === "PAUSED",
    isStopped: state.status === "STOPPED",
    isError: state.status === "ERROR",
    startPolling,
    pausePolling,
    stopPolling,
    resetErrors,
    fetchNow,
  };
}
