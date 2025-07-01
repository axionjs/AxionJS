"use client";

import * as React from "react";
import { useWebSocket } from "@/registry/new-york/hooks/use-web-socket";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Input } from "@/registry/new-york/ui/input";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";

export function UseWebSocketPreview() {
  // In a real application, you would use a real WebSocket URL
  // For this demo, we'll simulate the WebSocket behavior
  const mockWsUrl = "wss://echo.example.com";
  const [mockConnected, setMockConnected] = React.useState(false);
  const [mockMessages, setMockMessages] = React.useState<any[]>([]);
  const [messageInput, setMessageInput] = React.useState("");
  const [jsonMode, setJsonMode] = React.useState(false);

  // Mock implementation of the WebSocket hook
  const {
    readyState,
    isOpen,
    isConnecting,
    isClosed,
    lastMessage,
    messages,
    connect,
    disconnect,
    send,
  } = {
    // Mock the hook's return values
    readyState: mockConnected ? 1 : 3,
    isOpen: mockConnected,
    isConnecting: false,
    isClosed: !mockConnected,
    lastMessage:
      mockMessages.length > 0 ? mockMessages[mockMessages.length - 1] : null,
    messages: mockMessages,
    connect: () => {
      setMockConnected(true);
      // Simulate connection delay
      setTimeout(() => {
        // Simulate server welcome message
        const welcomeMsg = {
          data: jsonMode
            ? { type: "welcome", message: "Connected to echo server" }
            : "Connected to echo server",
          timestamp: Date.now(),
          type: jsonMode ? "json" : "text",
        };
        setMockMessages((prev) => [...prev, welcomeMsg]);
      }, 500);
    },
    disconnect: () => {
      setMockConnected(false);
    },
    send: (data: any) => {
      if (!mockConnected) {
        throw new Error("WebSocket is not connected");
      }

      // Process the message
      const processedData =
        jsonMode && typeof data === "object"
          ? data
          : typeof data === "string"
            ? data
            : String(data);

      // Add sent message to the list
      const sentMsg = {
        data: processedData,
        timestamp: Date.now(),
        type: jsonMode ? "json" : "text",
        sent: true,
      };
      setMockMessages((prev) => [...prev, sentMsg]);

      // Echo the message back after a delay (simulating server response)
      setTimeout(() => {
        const echoMsg = {
          data: jsonMode
            ? { type: "echo", originalMessage: processedData }
            : `Echo: ${processedData}`,
          timestamp: Date.now(),
          type: jsonMode ? "json" : "text",
          sent: false,
        };
        setMockMessages((prev) => [...prev, echoMsg]);
      }, 1000);
    },
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    try {
      if (jsonMode) {
        // Try to parse as JSON
        const jsonData = JSON.parse(messageInput);
        send(jsonData);
      } else {
        send(messageInput);
      }

      // Clear input after sending
      setMessageInput("");
    } catch (err) {
      // Handle JSON parse error
      console.error("Failed to parse JSON:", err);
      alert("Invalid JSON format");
    }
  };

  // Get the status badge color based on readyState
  const getStatusColor = () => {
    switch (readyState) {
      case 0: // CONNECTING
        return "bg-yellow-500";
      case 1: // OPEN
        return "bg-green-500";
      case 2: // CLOSING
        return "bg-orange-500";
      case 3: // CLOSED
      default:
        return "bg-red-500";
    }
  };

  // Get the status text based on readyState
  const getStatusText = () => {
    switch (readyState) {
      case 0:
        return "CONNECTING";
      case 1:
        return "OPEN";
      case 2:
        return "CLOSING";
      case 3:
      default:
        return "CLOSED";
    }
  };

  return (
    <Card className="w-full not-prose">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>WebSocket Demo</span>
            <div className={`h-3 w-3 rounded-full ${getStatusColor()}`} />
            <Badge variant="outline">{getStatusText()}</Badge>
          </div>
          <Badge variant="secondary">{mockWsUrl}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={isOpen ? "secondary" : "default"}
              onClick={isOpen ? disconnect : connect}
            >
              {isOpen ? "Disconnect" : "Connect"}
            </Button>
            <div className="flex items-center space-x-2 ml-auto">
              <Switch
                id="json-mode"
                checked={jsonMode}
                onCheckedChange={setJsonMode}
              />
              <Label htmlFor="json-mode">JSON Mode</Label>
            </div>
          </div>

          <Tabs defaultValue="messages">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="control">Connection Status</TabsTrigger>
            </TabsList>
            <TabsContent value="messages" className="space-y-4">
              <ScrollArea className="h-[240px] rounded-md border">
                <div className="p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <MessageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        {isOpen
                          ? "No messages yet. Send a message below!"
                          : "Connect to start messaging"}
                      </p>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <MessageBubble
                        key={index}
                        message={msg}
                        jsonMode={jsonMode}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>

              <div className="flex items-center gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={
                    jsonMode
                      ? '{"type": "message", "text": "Hello"}'
                      : "Type a message..."
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={!isOpen}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!isOpen || !messageInput.trim()}
                >
                  Send
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="control">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${getStatusColor()}`}
                      />
                      <p>{getStatusText()}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">URL</p>
                    <p className="text-sm break-all">{mockWsUrl}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Messages Received</p>
                    <p>{messages.filter((m) => !m.sent).length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Messages Sent</p>
                    <p>{messages.filter((m) => m.sent).length}</p>
                  </div>
                </div>

                {lastMessage && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Last Message</p>
                    <div className="rounded-md bg-muted p-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{lastMessage.sent ? "Sent" : "Received"}</span>
                        <span>
                          {new Date(lastMessage.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {typeof lastMessage.data === "object"
                          ? JSON.stringify(lastMessage.data, null, 2)
                          : String(lastMessage.data)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>
          This is a simulated WebSocket connection for demonstration purposes.
        </p>
      </CardFooter>
    </Card>
  );
}

function MessageBubble({
  message,
  jsonMode,
}: {
  message: any;
  jsonMode: boolean;
}) {
  const isSent = message.sent;

  return (
    <div
      className={`flex not-prose ${isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          isSent ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        <div className="text-xs mb-1 flex justify-between gap-2">
          <Badge variant="outline" className="h-5 px-1">
            {isSent ? "Sent" : "Received"}
          </Badge>
          <span className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        {jsonMode || typeof message.data === "object" ? (
          <pre
            className={`text-xs overflow-x-auto whitespace-pre-wrap ${isSent ? "text-primary-foreground" : ""}`}
          >
            {JSON.stringify(message.data, null, 2)}
          </pre>
        ) : (
          <div>{String(message.data)}</div>
        )}
      </div>
    </div>
  );
}

export function ChatApplicationPreview() {
  // Mock state
  const [users, setUsers] = React.useState([
    { id: 1, name: "John Doe", status: "online" },
    { id: 2, name: "Jane Smith", status: "offline" },
    { id: 3, name: "Alice Johnson", status: "online" },
  ]);

  const [selectedUser, setSelectedUser] = React.useState<number | null>(null);
  const [messages, setMessages] = React.useState<Record<number, any[]>>({
    1: [
      { id: 1, text: "Hey there!", sent: false, timestamp: Date.now() - 60000 },
      {
        id: 2,
        text: "How's it going?",
        sent: true,
        timestamp: Date.now() - 50000,
      },
      {
        id: 3,
        text: "Good, thanks for asking!",
        sent: false,
        timestamp: Date.now() - 40000,
      },
    ],
    3: [
      { id: 1, text: "Hello!", sent: false, timestamp: Date.now() - 30000 },
      {
        id: 2,
        text: "Did you finish the project?",
        sent: true,
        timestamp: Date.now() - 20000,
      },
      {
        id: 3,
        text: "Almost done!",
        sent: false,
        timestamp: Date.now() - 10000,
      },
    ],
  });

  const [connectionStatus, setConnectionStatus] = React.useState<
    "connected" | "disconnected"
  >("disconnected");
  const [newMessage, setNewMessage] = React.useState("");

  // Handle connect/disconnect
  const toggleConnection = () => {
    setConnectionStatus((prev) =>
      prev === "connected" ? "disconnected" : "connected"
    );
  };

  // Handle sending a message
  const sendMessage = () => {
    if (!selectedUser || !newMessage.trim() || connectionStatus !== "connected")
      return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sent: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), newMsg],
    }));

    setNewMessage("");

    // Simulate response after a random delay
    setTimeout(
      () => {
        const responses = [
          "That sounds great!",
          "I see what you mean.",
          "Interesting point.",
          "Let me think about that.",
          "I'll get back to you soon.",
        ];

        const responseMsg = {
          id: Date.now(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sent: false,
          timestamp: Date.now(),
        };

        setMessages((prev) => ({
          ...prev,
          [selectedUser]: [...(prev[selectedUser] || []), responseMsg],
        }));
      },
      1000 + Math.random() * 2000
    );
  };

  return (
    <Card className="w-full not-prose">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>WebSocket Chat Application</span>
          <Badge
            variant={connectionStatus === "connected" ? "default" : "outline"}
          >
            {connectionStatus === "connected" ? "Connected" : "Disconnected"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1 border rounded-md overflow-hidden">
            <div className="p-3 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Contacts</h3>
                <Button variant="outline" size="sm" onClick={toggleConnection}>
                  {connectionStatus === "connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="p-2 space-y-1">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 rounded-md cursor-pointer ${
                      selectedUser === user.id
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedUser(user.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {messages[user.id]?.length || 0} messages
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          user.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="md:col-span-2 border rounded-md overflow-hidden flex flex-col">
            <div className="p-3 border-b">
              {selectedUser ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    {users.find((u) => u.id === selectedUser)?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {users.find((u) => u.id === selectedUser)?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {users.find((u) => u.id === selectedUser)?.status}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Select a contact to start chatting
                </p>
              )}
            </div>

            <ScrollArea className="flex-1 h-[240px]">
              <div className="p-4 space-y-4">
                {selectedUser && messages[selectedUser] ? (
                  messages[selectedUser].map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] ${
                          msg.sent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{msg.text}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {selectedUser
                        ? "No messages yet. Send a message to start the conversation!"
                        : "Select a contact to start chatting"}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  disabled={!selectedUser || connectionStatus !== "connected"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={
                    !selectedUser ||
                    !newMessage.trim() ||
                    connectionStatus !== "connected"
                  }
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>
          This is a simulated chat application using WebSockets for real-time
          communication.
        </p>
      </CardFooter>
    </Card>
  );
}

// Icons
function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
