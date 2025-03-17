"use client";

import * as React from "react";
import { useSseListener } from "@/registry/new-york/hooks/use-sse-listener";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";

export function UseSseListenerPreview() {
  // Mock implementation for demo purposes
  const mockSseUrl = "https://api.example.com/sse";
  const [mockEvents, setMockEvents] = React.useState<any[]>([]);
  const [isMocking, setIsMocking] = React.useState(false);

  // Mock event generator
  React.useEffect(() => {
    if (!isMocking) return;

    const interval = setInterval(() => {
      const eventTypes = ["update", "notification", "alert", "message"];
      const randomType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      const newEvent = {
        type: randomType,
        data: {
          id: Math.floor(Math.random() * 1000),
          message: `This is a mock ${randomType} event`,
          timestamp: new Date().toISOString(),
        },
        timestamp: Date.now(),
      };

      setMockEvents((prev) => [...prev, newEvent]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMocking]);

  // SSE connection
  const { status, events, lastEvent, error, connect, disconnect, retryCount } =
    {
      // Mock the SSE hook for preview purposes
      status: isMocking ? "OPEN" : "CLOSED",
      events: mockEvents,
      lastEvent:
        mockEvents.length > 0 ? mockEvents[mockEvents.length - 1] : null,
      error: null,
      connect: () => setIsMocking(true),
      disconnect: () => setIsMocking(false),
      retryCount: 0,
    };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const getStatusColor = () => {
    switch (status) {
      case "OPEN":
        return "bg-green-500";
      case "CONNECTING":
        return "bg-yellow-500";
      case "ERROR":
        return "bg-red-500";
      case "CLOSED":
      case "IDLE":
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            SSE Listener
            <div className={`h-3 w-3 rounded-full ${getStatusColor()}`}></div>
            <Badge variant="outline">{status}</Badge>
          </div>
          <Badge variant="secondary">{mockSseUrl}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={handleConnect}
              disabled={status === "OPEN" || status === "CONNECTING"}
            >
              Connect
            </Button>
            <Button
              variant="outline"
              onClick={handleDisconnect}
              disabled={status === "CLOSED" || status === "IDLE"}
            >
              Disconnect
            </Button>
            <Button
              variant="outline"
              onClick={() => setMockEvents([])}
              disabled={mockEvents.length === 0}
            >
              Clear Events
            </Button>
          </div>

          <Tabs defaultValue="events">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
              <TabsTrigger value="lastEvent">Last Event</TabsTrigger>
              <TabsTrigger value="status">Connection Status</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {events.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No events received yet. Connect to start receiving events.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {events.map((event, index) => (
                      <EventCard key={index} event={event} />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="lastEvent">
              <div className="h-[200px] w-full rounded-md border p-4">
                {!lastEvent ? (
                  <p className="text-muted-foreground text-center py-8">
                    No events received yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Badge>{lastEvent.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(lastEvent.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(lastEvent.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="status">
              <div className="h-[200px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${getStatusColor()}`}
                      ></div>
                      <p>{status}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Retry Count</p>
                    <p>{retryCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">URL</p>
                    <p className="text-xs truncate">{mockSseUrl}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Events Received</p>
                    <p>{events.length}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-sm font-medium">Error</p>
                    <p className="text-xs text-red-500">
                      {error ? error.message : "None"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>This is a simulated SSE connection for demonstration purposes.</p>
      </CardFooter>
    </Card>
  );
}

export function RealTimeNotificationPreview() {
  // Mock implementation
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);

  // Add a new notification every few seconds when connected
  React.useEffect(() => {
    if (!isConnected) return;

    const notificationTypes = [
      { type: "message", icon: <MessageIcon />, title: "New Message" },
      {
        type: "friend_request",
        icon: <UserPlusIcon />,
        title: "Friend Request",
      },
      { type: "like", icon: <HeartIcon />, title: "New Like" },
      { type: "comment", icon: <MessageSquareIcon />, title: "New Comment" },
    ];

    const interval = setInterval(() => {
      const randomType =
        notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const newNotification = {
        id: Date.now(),
        ...randomType,
        message: `You received a new ${randomType.type.replace("_", " ")}`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(Math.max(0, unreadCount - 1));
  };

  const toggleConnection = () => {
    setIsConnected((prev) => !prev);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={toggleConnection}>
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              variant={isConnected ? "default" : "outline"}
              className="flex gap-1 items-center"
            >
              <div
                className={`h-2 w-2 rounded-full ${isConnected ? "bg-white" : "bg-muted-foreground"}`}
              ></div>
              {isConnected ? "Live" : "Disconnected"}
            </Badge>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </Button>
            )}
          </div>

          <ScrollArea className="h-[300px]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <BellIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {isConnected
                    ? "Waiting for notifications..."
                    : "Connect to receive notifications"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${
                      notification.read ? "bg-background" : "bg-muted"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <div className="rounded-md border p-3 text-sm">
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline">{event.type}</Badge>
        <span className="text-xs text-muted-foreground">
          {new Date(event.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <div className="rounded-md bg-muted p-2">
        <pre className="text-xs overflow-auto">
          {JSON.stringify(event.data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Icons

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

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

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
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
