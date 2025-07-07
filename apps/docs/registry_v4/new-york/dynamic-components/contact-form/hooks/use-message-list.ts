import { useState } from "react";

import {
  updateMessageStatus,
  deleteMessage,
} from "@/registry/new-york/dynamic-components/contact-form/actions/contact-actions";
import { useToast } from "@/registry/new-york/hooks/use-toast";

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: Date;
};

export function useMessageList(initialMessages: Message[]) {
  const [messages, setMessages] = useState(initialMessages);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const filteredMessages = messages.filter((message) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return message.status === "UNREAD";
    if (activeTab === "read") return message.status === "READ";
    return true;
  });

  const handleStatusUpdate = async (id: string, status: "READ" | "UNREAD") => {
    const result = await updateMessageStatus(id, status);

    if (result.success) {
      setMessages(
        messages.map((message) =>
          message.id === id ? { ...message, status } : message,
        ),
      );

      toast({
        title: "Status updated",
        description: `Message marked as ${status.toLowerCase()}`,
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteMessage(id);

    if (result.success) {
      setMessages(messages.filter((message) => message.id !== id));

      toast({
        title: "Message deleted",
        description: "The message has been permanently deleted",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  return {
    messages,
    setActiveTab,
    filteredMessages,
    handleStatusUpdate,
    handleDelete,
  };
}
