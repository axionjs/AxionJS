"use client";

import { useState, useTransition } from "react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert";
import { Loader2 } from "lucide-react";
import { initiateOAuthLogin } from "@/registry/new-york/dynamic-components/social-auth/actions/oauth-actions";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface OAuthLoginProps {
  onSuccess?: (provider: string, user: any) => void;
  onError?: (error: string) => void;
  title?: string;
  description?: string;
  className?: string;
  redirectUrl?: string;
  providers?: "github"[];
}

export function OAuthLogin({
  onSuccess,
  onError,
  title = "Welcome",
  description = "Sign in to your account to continue",
  className = "",
  redirectUrl,
  providers = ["github"],
}: OAuthLoginProps) {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOAuthLogin = (provider: "github") => {
    setMessage(null);
    setLoadingProvider(provider);

    startTransition(async () => {
      try {
        const result = await initiateOAuthLogin(provider, redirectUrl);

        if (result.error) {
          setMessage({ type: "error", text: result.error });
          onError?.(result.error);
        } else if (result.redirectUrl) {
          // Redirect to OAuth provider
          window.location.href = result.redirectUrl;
        } else if (result.user) {
          setMessage({
            type: "success",
            text: result.success || "Login successful",
          });
          onSuccess?.(provider, result.user);
        }
      } catch (error) {
        const errorMessage = "Authentication failed. Please try again.";
        setMessage({ type: "error", text: errorMessage });
        onError?.(errorMessage);
      } finally {
        setLoadingProvider(null);
      }
    });
  };

  const getProviderConfig = (provider: "github") => {
    const configs = {
      github: {
        name: "GitHub",
        icon: GitHubIcon,
        className: "border-gray-300 hover:bg-gray-50 text-gray-900",
      },
    };
    return configs[provider];
  };

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {providers.map((provider) => {
            const config = getProviderConfig(provider);
            const isLoading = loadingProvider === provider && isPending;

            return (
              <Button
                key={provider}
                variant="outline"
                className={`w-full ${config.className}`}
                onClick={() => handleOAuthLogin(provider)}
                disabled={isPending}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <config.icon className="mr-2 h-4 w-4" />
                )}
                Continue with {config.name}
              </Button>
            );
          })}
        </div>

        <div className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardContent>
    </Card>
  );
}
