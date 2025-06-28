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
    .max(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
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
  description = "Secure your account with an additional layer of protection",
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
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Card className="border-0 shadow-lg bg-card">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === "email"
                ? description
                : "We've sent a verification code to your email"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-2">
            <div
              className={`h-2 w-8 rounded-full transition-colors ${
                step === "email" ? "bg-primary" : "bg-primary/30"
              }`}
            />
            <div
              className={`h-2 w-8 rounded-full transition-colors ${
                step === "verification" ? "bg-primary" : "bg-muted"
              }`}
            />
          </div>

          {/* Alert Messages */}
          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="border-l-4"
            >
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription className="font-medium">
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {step === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    disabled={isPending}
                    {...emailForm.register("email")}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 font-medium"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending verification code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Code sent to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="code"
                  className="text-sm font-medium text-foreground"
                >
                  Verification Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl font-mono tracking-[0.5em] h-16 bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isPending}
                  {...verificationForm.register("code")}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, "");
                    e.target.value = value;
                    verificationForm.setValue("code", value);
                  }}
                />
                {verificationForm.formState.errors.code && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {verificationForm.formState.errors.code.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 font-medium"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying code...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full h-12 font-medium text-muted-foreground hover:text-foreground"
                  onClick={resetForm}
                  disabled={isPending}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Use different email
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => handleEmailSubmit({ email })}
                    disabled={isPending}
                  >
                    Resend code
                  </button>
                </p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
