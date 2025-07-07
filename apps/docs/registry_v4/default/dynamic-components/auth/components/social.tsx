"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/registry/default/ui/button";
import { loginWithOAuth } from "@/registry/default/dynamic-components/auth/actions/auth-actions";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const onClick = async (provider: "google" | "github") => {
    try {
      startTransition(() => {
        loginWithOAuth(provider, callbackUrl);
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        disabled={isPending}
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        disabled={isPending}
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
