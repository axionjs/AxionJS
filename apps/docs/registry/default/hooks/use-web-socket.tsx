import { useEffect, useRef, useState, useCallback } from "react";

interface WebSocketOptions {
  /** WebSocket URL to connect to */
  url: string;
  /** Protocols string or array of protocol strings */
  protocols?: string | string[];
  /** Whether to auto-connect on mount (default: true) */
  autoConnect?: boolean;
  /** Whether to auto-reconnect on close/error (default: true) */
  autoReconnect?: boolean;
  /** Retry backoff in milliseconds (default: 1000) */
  reconnectInterval?: number;
  /** Maximum reconnect attempts (default: Infinity) */
  maxReconnectAttempt?: number;
  /** Maximum reconnect interval with exponential backoff (default: 30000) */
  maxReconnectInterval?: number;
  /** Whether to use exponential backoff for reconnect (default: true) */
  exponentialBackoff?: boolean;
  /** Callback when connection opens */
  onOpen?: (event: WebSocketEventMap["open"]) => void;
  /** Callback when connection closes */
  onClose?: (event: WebSocketEventMap["close"]) => void;
  /** Callback when connection errors */
  onError?: (event: WebSocketEventMap["error"]) => void;
  /** Callback when message is received */
  onMessage?: (event: WebSocketEventMap["message"]) => void;
  /** WebSocket BinaryType ("blob" | "arraybuffer") */
  binaryType?: BinaryType;
  /** Handle automatic JSON parsing/stringifying (default: false) */
  jsonMode?: boolean;
}

type ReadyState = number;

interface WebSocketMessage {
  data: any;
  timestamp: number;
  type: string;
}

const ReadyStateStatus = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
} as const;

/**
 * Custom hook for managing WebSocket connections with reconnection logic
 *
 * @param options Configuration options for the WebSocket connection
 * @returns Object containing WebSocket state and control functions
 */
export function useWebSocket(options: WebSocketOptions) {
  const {
    url,
    protocols,
    autoConnect = true,
    autoReconnect = true,
    reconnectInterval = 1000,
    maxReconnectAttempt = Infinity,
    maxReconnectInterval = 30000,
    exponentialBackoff = true,
    onOpen,
    onClose,
    onError,
    onMessage,
    binaryType = "blob",
    jsonMode = false,
  } = options;

  const socket = useRef<WebSocket | null>(null);
  const reconnectCount = useRef<number>(0);
  const reconnectTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const [readyState, setReadyState] = useState<ReadyState>(
    ReadyStateStatus.CLOSED,
  );
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [error, setError] = useState<Event | null>(null);

  // Event handler refs to avoid dependency changes
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const onErrorRef = useRef(onError);
  const onMessageRef = useRef(onMessage);

  // Update callback refs when they change
  useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    onErrorRef.current = onError;
    onMessageRef.current = onMessage;
  }, [onOpen, onClose, onError, onMessage]);

  // Function to calculate the reconnect delay with exponential backoff
  const getReconnectDelay = useCallback(() => {
    if (!exponentialBackoff) {
      return reconnectInterval;
    }

    // Calculate exponential backoff: min(reconnectInterval * 2 ^ reconnectCount, maxReconnectInterval)
    const delay = reconnectInterval * Math.pow(2, reconnectCount.current);
    return Math.min(delay, maxReconnectInterval);
  }, [reconnectInterval, maxReconnectInterval, exponentialBackoff]);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!isMountedRef.current) return;

    // Clear any existing reconnect timeout
    if (reconnectTimeoutId.current !== null) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }

    // Close existing socket if it exists
    if (socket.current) {
      socket.current.close();
    }

    try {
      // Create new WebSocket connection
      socket.current = new WebSocket(url, protocols);

      // Set binary type (blob or arraybuffer)
      socket.current.binaryType = binaryType;

      // Set initial ready state
      setReadyState(ReadyStateStatus.CONNECTING);

      // Event handlers
      socket.current.onopen = (event) => {
        if (!isMountedRef.current) return;

        setReadyState(ReadyStateStatus.OPEN);
        setError(null);
        reconnectCount.current = 0;

        if (onOpenRef.current) {
          onOpenRef.current(event);
        }
      };

      socket.current.onclose = (event) => {
        if (!isMountedRef.current) return;

        setReadyState(ReadyStateStatus.CLOSED);

        if (onCloseRef.current) {
          onCloseRef.current(event);
        }

        // Handle reconnection
        if (autoReconnect && reconnectCount.current < maxReconnectAttempt) {
          const delay = getReconnectDelay();
          reconnectCount.current += 1;

          reconnectTimeoutId.current = setTimeout(() => {
            if (isMountedRef.current) {
              connect();
            }
          }, delay);
        }
      };

      socket.current.onerror = (event) => {
        if (!isMountedRef.current) return;

        setError(event);

        if (onErrorRef.current) {
          onErrorRef.current(event);
        }
      };

      socket.current.onmessage = (event) => {
        if (!isMountedRef.current) return;

        let parsedData: any = event.data;
        let messageType = typeof event.data;

        // Handle JSON parsing if jsonMode is enabled
        if (jsonMode && typeof event.data === "string") {
          try {
            parsedData = JSON.parse(event.data);
            messageType = "json";
          } catch (err) {
            // If parsing fails, keep the original data
            messageType = "text";
          }
        }

        const message: WebSocketMessage = {
          data: parsedData,
          timestamp: Date.now(),
          type: messageType,
        };

        setLastMessage(message);
        setMessages((prev) => [...prev, message]);

        if (onMessageRef.current) {
          onMessageRef.current(event);
        }
      };
    } catch (err) {
      console.error("WebSocket connection error:", err);
      setError(new ErrorEvent("error", { error: err }));

      // Handle reconnection on connection error
      if (autoReconnect && reconnectCount.current < maxReconnectAttempt) {
        const delay = getReconnectDelay();
        reconnectCount.current += 1;

        reconnectTimeoutId.current = setTimeout(() => {
          if (isMountedRef.current) {
            connect();
          }
        }, delay);
      }
    }
  }, [
    url,
    protocols,
    binaryType,
    autoReconnect,
    maxReconnectAttempt,
    getReconnectDelay,
    jsonMode,
  ]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socket.current && socket.current.readyState === ReadyStateStatus.OPEN) {
      socket.current.close();
    }

    if (reconnectTimeoutId.current !== null) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }
  }, []);

  // Send message through WebSocket
  const send = useCallback(
    (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
      if (
        !socket.current ||
        socket.current.readyState !== ReadyStateStatus.OPEN
      ) {
        throw new Error("WebSocket is not connected");
      }

      // Handle JSON stringifying if jsonMode is enabled and data is not already a string
      if (
        jsonMode &&
        typeof data !== "string" &&
        !(data instanceof Blob) &&
        !(data instanceof ArrayBuffer)
      ) {
        try {
          socket.current.send(JSON.stringify(data));
        } catch (err) {
          throw new Error("Failed to stringify data to JSON");
        }
        return;
      }

      socket.current.send(data);
    },
    [jsonMode],
  );

  // Connect on mount if autoConnect is true
  useEffect(() => {
    isMountedRef.current = true;

    if (autoConnect) {
      connect();
    }

    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, [connect, disconnect, autoConnect]);

  // Reconnect if URL changes
  useEffect(() => {
    if (socket.current) {
      disconnect();
      connect();
    }
  }, [url, protocols, connect, disconnect]);

  return {
    readyState,
    isConnecting: readyState === ReadyStateStatus.CONNECTING,
    isOpen: readyState === ReadyStateStatus.OPEN,
    isClosing: readyState === ReadyStateStatus.CLOSING,
    isClosed: readyState === ReadyStateStatus.CLOSED,
    lastMessage,
    messages,
    error,
    connect,
    disconnect,
    send,
    socket: socket.current,
    READY_STATE: ReadyStateStatus,
  };
}
