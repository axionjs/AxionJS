"use client";

import * as React from "react";
import { useAsync } from "@/registry/new-york/hooks/use-async";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { Badge } from "@/registry/new-york/ui/badge";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

export function AsyncPreview() {
  // Mock async function to fetch a user
  const fetchUser = React.useCallback(async (id: number): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate error for specific ID
    if (id === 3) {
      throw new Error("Failed to fetch user #3");
    }

    // Return mock user data
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
    };
  }, []);

  const [userState, userActions] = useAsync<User>(fetchUser);
  const [userId, setUserId] = React.useState(1);

  const handleFetchUser = () => {
    userActions.execute(userId);
  };

  return (
    <div className="space-y-4 not-prose">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium">
            User ID (use 3 to trigger an error)
          </label>
          <div className="flex mt-1 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setUserId((prev) => Math.max(1, prev - 1))}
              disabled={userState.status === "pending"}
            >
              -
            </Button>
            <div className="flex-1 flex items-center justify-center border rounded-md">
              {userId}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setUserId((prev) => prev + 1)}
              disabled={userState.status === "pending"}
            >
              +
            </Button>
          </div>
        </div>
        <Button
          onClick={handleFetchUser}
          disabled={userState.status === "pending"}
          className="mt-auto"
        >
          {userState.status === "pending" ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            "Fetch User"
          )}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          {userState.status === "idle" && (
            <div className="text-center py-6 text-muted-foreground">
              Click "Fetch User" to load data
            </div>
          )}

          {userState.status === "pending" && (
            <div className="space-y-2 py-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[220px]" />
            </div>
          )}

          {userState.status === "success" && userState.value && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">User Details</h3>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Success
                </Badge>
              </div>
              <p className="text-sm">ID: {userState.value.id}</p>
              <p className="text-sm">Name: {userState.value.name}</p>
              <p className="text-sm">Email: {userState.value.email}</p>
            </div>
          )}

          {userState.status === "error" && userState.error && (
            <div className="text-destructive py-2">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-4 w-4 mr-2" />
                <p className="font-medium">Error</p>
              </div>
              <p className="text-sm">{userState.error.message}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => userActions.reset()}
              >
                Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function DataFetchingPreview() {
  interface Post {
    id: number;
    title: string;
    body: string;
  }

  const fetchPosts = React.useCallback(async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return mock data
    return [
      { id: 1, title: "First Post", body: "This is the first post content..." },
      {
        id: 2,
        title: "Second Post",
        body: "This is the second post content...",
      },
      { id: 3, title: "Third Post", body: "This is the third post content..." },
    ] as Post[];
  }, []);

  const [postsState, postsActions] = useAsync<Post[]>(fetchPosts);

  // Load posts on component mount
  React.useEffect(() => {
    postsActions.execute();
  }, [postsActions]);

  return (
    <Card className="not-prose">
      <CardHeader>
        <div className="flex items-center justify-between ">
          <CardTitle>Posts</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => postsActions.execute()}
            disabled={postsState.status === "pending"}
          >
            <RefreshCw
              className={`h-4 w-4 ${postsState.status === "pending" ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {postsState.status === "pending" && (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {postsState.status === "error" && (
          <div className="py-4 text-center text-destructive">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Failed to load posts. Please try again.</p>
          </div>
        )}

        {postsState.status === "success" && postsState.value && (
          <div className="space-y-4">
            {postsState.value.map((post) => (
              <div
                key={post.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
