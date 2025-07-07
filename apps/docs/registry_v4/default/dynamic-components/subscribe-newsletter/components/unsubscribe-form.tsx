"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/default/ui/button";
import { useUnsubscribeForm } from "@/registry/default/dynamic-components/subscribe-newsletter/hooks/use-unsubscribe-form";

export function UnsubscribeForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { isLoading, isUnsubscribed, message, handleUnsubscribe } =
    useUnsubscribeForm(token);
  if (isUnsubscribed) {
    return (
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Successfully Unsubscribed</CardTitle>
          <CardDescription>
            You have been removed from our mailing list
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-primary mb-4" />
          <p className="text-center mb-6">{message}</p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-xl">Unsubscribe from Newsletter</CardTitle>
        <CardDescription>
          You are about to unsubscribe <strong>{email}</strong> from our
          newsletter.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-center mb-6">
          If you unsubscribe, you will no longer receive our newsletters. You
          can always subscribe again in the future.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button onClick={handleUnsubscribe} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Unsubscribe"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
