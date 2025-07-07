"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/new-york/ui/button";
import { UnsubscribeForm } from "@/registry/new-york/dynamic-components/subscribe-newsletter/components/unsubscribe-form";
import { verifyUnsubscribeToken } from "@/registry/new-york/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";

export function Unsubscribe() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const verifiedEmail = await verifyUnsubscribeToken(token);
        setEmail(verifiedEmail);
      } catch (err) {
        setError("Failed to verify token");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    verifyToken();
  }, [token]);

  if (!token) {
    return (
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl">Invalid Request</CardTitle>
          <CardDescription>
            The unsubscribe link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <XCircle className="h-16 w-16 text-destructive mb-4" />
          <p className="text-center mb-6">
            This link appears to be invalid or has expired. Please check the
            link and try again.
          </p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center py-10">
          <Loader2 className="h-16 w-16 animate-spin mb-4 text-primary" />
          <p className="text-center">Verifying your unsubscribe request...</p>
        </CardContent>
      </Card>
    );
  }

  if (email) {
    return <UnsubscribeForm token={token} email={email} />;
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-xl">Invalid Unsubscribe Link</CardTitle>
        <CardDescription>
          The unsubscribe link is invalid or has expired.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <p className="text-center mb-6">
          {error ||
            "This link appears to be invalid or has expired. Please check the link and try again."}
        </p>
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
