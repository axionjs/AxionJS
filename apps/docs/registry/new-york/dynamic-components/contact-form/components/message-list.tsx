"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

import {
  MoreVertical,
  Mail,
  MailOpen,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  Message,
  useMessageList,
} from "@/registry/new-york/dynamic-components/contact-form/hooks/use-message-list";

export function MessageList({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const {
    messages,
    setActiveTab,
    filteredMessages,
    handleStatusUpdate,
    handleDelete,
  } = useMessageList(initialMessages);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="secondary" className="ml-2">
                {messages.filter((m) => m.status === "UNREAD").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <MessageGrid
            messages={filteredMessages}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="unread" className="mt-6">
          <MessageGrid
            messages={filteredMessages}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="read" className="mt-6">
          <MessageGrid
            messages={filteredMessages}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <MessageGrid
            messages={filteredMessages}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {filteredMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No messages found</h3>
          <p className="text-muted-foreground mt-2">
            There are no messages in this category.
          </p>
        </div>
      )}
    </div>
  );
}

function MessageGrid({
  messages,
  onStatusUpdate,
  onDelete,
}: {
  messages: Message[];
  onStatusUpdate: (id: string, status: "READ" | "UNREAD") => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onStatusUpdate={onStatusUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function MessageCard({
  message,
  onStatusUpdate,
  onDelete,
}: {
  message: Message;
  onStatusUpdate: (id: string, status: "READ" | "UNREAD") => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={message.status === "UNREAD" ? "border-primary/50" : ""}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{message.name}</CardTitle>
            <CardDescription className="text-sm truncate">
              {message.email}
            </CardDescription>
          </div>
          <div className="flex items-center">
            {message.status === "UNREAD" && (
              <Badge variant="default" className="mr-2">
                New
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {message.status === "UNREAD" ? (
                  <DropdownMenuItem
                    onClick={() => onStatusUpdate(message.id, "READ")}
                  >
                    <MailOpen className="h-4 w-4 mr-2" />
                    Mark as read
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => onStatusUpdate(message.id, "UNREAD")}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Mark as unread
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => onDelete(message.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${expanded ? "" : "line-clamp-3"}`}>
          {message.message}
        </p>
        {message.message.length > 150 && (
          <Button
            variant="link"
            className="p-0 h-auto mt-1 text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        )}
      </CardContent>

      <CardFooter className="pt-1 text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
      </CardFooter>
    </Card>
  );
}
