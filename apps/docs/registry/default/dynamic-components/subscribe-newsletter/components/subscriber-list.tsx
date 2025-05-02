"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader } from "@/registry/default/ui/card";
import { Input } from "@/registry/default/ui/input";
import { Button } from "@/registry/default/ui/button";
import { Badge } from "@/registry/default/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { deleteSubscriber } from "@/registry/default/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";
import { useToast } from "@/registry/default/hooks/use-toast";
import { MoreVertical, Search, Trash2, AlertCircle } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  createdAt: Date;
};

export function SubscriberList({
  initialSubscribers,
}: {
  initialSubscribers: Subscriber[];
}) {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.name &&
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleDelete = async (id: string) => {
    const result = await deleteSubscriber(id);

    if (result.success) {
      setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));

      toast({
        title: "Subscriber deleted",
        description: "The subscriber has been permanently deleted",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete subscriber",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subscribers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredSubscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No subscribers found</h3>
            <p className="text-muted-foreground mt-2">
              {searchTerm
                ? "No subscribers match your search criteria."
                : "There are no subscribers yet."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">
                    {subscriber.email}
                  </TableCell>
                  <TableCell>{subscriber.name || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subscriber.status === "ACTIVE" ? "default" : "secondary"
                      }
                    >
                      {subscriber.status === "ACTIVE"
                        ? "Active"
                        : "Unsubscribed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(subscriber.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
