import { useEffect, useState, useRef, useCallback } from "react";

interface SseOptions {
  /** URL for the SSE endpoint */
  url: string;
  /** Whether to connect immediately (default: true) */
  autoConnect?: boolean;
  /** Custom headers for the EventSource connection */
  headers?: Record<string, string>;
  /** Reconnect timeout in milliseconds (default: 5000) */
  reconnectTimeout?: number;
  /** Map of event types to listen for (in addition to 'message') */
  events?: string[];
  /** Whether to use withCredentials (default: false) */
  withCredentials?: boolean;
  /** Optional retry limit, after which reconnection attempts will stop */
  maxRetries?: number;
}

type SseStatus = "IDLE" | "CONNECTING" | "OPEN" | "CLOSED" | "ERROR";

interface SseEvent {
  type: string;
  data: any;
  id?: string;
  retry?: number;
  lastEventId?: string;
  timestamp: number;
}

/**
 * Custom hook for Server-Sent Events (SSE) with reconnection logic
 *
 * @param options Configuration options for the SSE connection
 * @returns Object containing connection status and control functions
 */
export function useSseListener(options: SseOptions) {
  const {
    url,
    autoConnect = true,
    headers = {},
    reconnectTimeout = 5000,
    events = [],
    withCredentials = false,
    maxRetries,
  } = options;

  const [status, setStatus] = useState<SseStatus>("IDLE");
  const [events$, setEvents] = useState<SseEvent[]>([]);
  const [lastEvent, setLastEvent] = useState<SseEvent | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const eventSourceRef = useRef<EventSource | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    cleanup();

    if (maxRetries !== undefined && retryCount >= maxRetries) {
      setStatus("CLOSED");
      return;
    }

    try {
      setStatus("CONNECTING");

      // For custom headers, we need to use a proxy server or polyfill
      // since native EventSource doesn't support custom headers
      if (Object.keys(headers).length > 0) {
        // This implementation assumes you're using a proxy server or middleware
        // that handles the headers, or you're using a polyfill like 'event-source-polyfill'
        const queryParams = new URLSearchParams();

        // Add headers as query parameters for the proxy to handle
        Object.entries(headers).forEach(([key, value]) => {
          queryParams.append(`header-${key}`, value);
        });

        const urlWithHeaders = `${url}${url.includes("?") ? "&" : "?"}${queryParams.toString()}`;
        eventSourceRef.current = new EventSource(urlWithHeaders, {
          withCredentials,
        });
      } else {
        eventSourceRef.current = new EventSource(url, { withCredentials });
      }

      // Handle connection opening
      eventSourceRef.current.onopen = () => {
        setStatus("OPEN");
        setError(null);
        setRetryCount(0); // Reset retry count on successful connection
      };

      // Handle generic messages
      eventSourceRef.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          const newEvent: SseEvent = {
            type: "message",
            data: parsedData,
            id: event.lastEventId,
            lastEventId: event.lastEventId,
            timestamp: Date.now(),
          };

          setEvents((prev) => [...prev, newEvent]);
          setLastEvent(newEvent);
        } catch (e) {
          // Handle non-JSON data
          const newEvent: SseEvent = {
            type: "message",
            data: event.data,
            id: event.lastEventId,
            lastEventId: event.lastEventId,
            timestamp: Date.now(),
          };

          setEvents((prev) => [...prev, newEvent]);
          setLastEvent(newEvent);
        }
      };

      // Add listeners for custom events
      events.forEach((eventType) => {
        eventSourceRef.current?.addEventListener(eventType, (event) => {
          try {
            const parsedData = JSON.parse(event.data);
            const newEvent: SseEvent = {
              type: eventType,
              data: parsedData,
              id: event.lastEventId,
              lastEventId: event.lastEventId,
              timestamp: Date.now(),
            };

            setEvents((prev) => [...prev, newEvent]);
            setLastEvent(newEvent);
          } catch (e) {
            // Handle non-JSON data
            const newEvent: SseEvent = {
              type: eventType,
              data: event.data,
              id: event.lastEventId,
              lastEventId: event.lastEventId,
              timestamp: Date.now(),
            };

            setEvents((prev) => [...prev, newEvent]);
            setLastEvent(newEvent);
          }
        });
      });

      // Handle errors
      eventSourceRef.current.onerror = (e) => {
        setStatus("ERROR");
        setError(new Error("SSE connection error"));

        // Attempt to reconnect
        cleanup();
        setRetryCount((prev) => prev + 1);

        timeoutRef.current = setTimeout(() => {
          connect();
        }, reconnectTimeout);
      };
    } catch (e) {
      setStatus("ERROR");
      setError(e instanceof Error ? e : new Error("Unknown SSE error"));

      // Attempt to reconnect
      cleanup();
      setRetryCount((prev) => prev + 1);

      timeoutRef.current = setTimeout(() => {
        connect();
      }, reconnectTimeout);
    }
  }, [
    url,
    headers,
    cleanup,
    events,
    reconnectTimeout,
    withCredentials,
    retryCount,
    maxRetries,
  ]);

  const disconnect = useCallback(() => {
    cleanup();
    setStatus("CLOSED");
  }, [cleanup]);

  // Connect automatically if autoConnect is true
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      cleanup();
    };
  }, [autoConnect, connect, cleanup]);

  return {
    status,
    events: events$,
    lastEvent,
    error,
    connect,
    disconnect,
    retryCount,
  };
}
