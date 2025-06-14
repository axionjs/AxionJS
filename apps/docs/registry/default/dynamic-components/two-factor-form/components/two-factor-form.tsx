"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Alert, AlertDescription } from "@/registry/default/ui/alert";
import { Loader2, Shield, Mail } from "lucide-react";
import {
  requestTwoFactorCode,
  verifyTwoFactorCode,
} from "@/registry/default/dynamic-components/two-factor-form/actions/two-factor-actions";

// Validation schemas
const EmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const VerificationSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});

interface TwoFactorFormProps {
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
  title?: string;
  description?: string;
  className?: string;
}

export function TwoFactorForm({
  onSuccess,
  onError,
  title = "Two-Factor Authentication",
  description = "Enter your email to receive a verification code",
  className = "",
}: TwoFactorFormProps) {
  const [step, setStep] = useState<"email" | "verification">("email");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const emailForm = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const verificationForm = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleEmailSubmit = (values: z.infer<typeof EmailSchema>) => {
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await requestTwoFactorCode(values);

        if (result.error) {
          setMessage({ type: "error", text: result.error });
          onError?.(result.error);
        } else if (result.success) {
          setMessage({ type: "success", text: result.success });
          setEmail(values.email);
          setStep("verification");
        }
      } catch (error) {
        const errorMessage = "Something went wrong. Please try again.";
        setMessage({ type: "error", text: errorMessage });
        onError?.(errorMessage);
      }
    });
  };

  const handleVerificationSubmit = (
    values: z.infer<typeof VerificationSchema>,
  ) => {
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await verifyTwoFactorCode({
          email,
          code: values.code,
        });

        if (result.error) {
          setMessage({ type: "error", text: result.error });
          onError?.(result.error);
        } else if (result.success) {
          setMessage({ type: "success", text: result.success });
          onSuccess?.(email);
        }
      } catch (error) {
        const errorMessage = "Verification failed. Please try again.";
        setMessage({ type: "error", text: errorMessage });
        onError?.(errorMessage);
      }
    });
  };

  const resetForm = () => {
    setStep("email");
    setEmail("");
    setMessage(null);
    emailForm.reset();
    verificationForm.reset();
  };

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {step === "email"
            ? description
            : `Enter the 6-digit code sent to ${email}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {step === "email" ? (
          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  disabled={isPending}
                  {...emailForm.register("email")}
                />
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Code...
                </>
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </form>
        ) : (
          <form
            onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="text-center text-lg tracking-widest"
                disabled={isPending}
                {...verificationForm.register("code")}
              />
              {verificationForm.formState.errors.code && (
                <p className="text-sm text-red-600">
                  {verificationForm.formState.errors.code.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={resetForm}
                disabled={isPending}
              >
                Use Different Email
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
