"use client";

import * as React from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Loader2,
  AtSignIcon,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert";
import { cn } from "@/lib/utils";

// Define validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

// Status for the password reset flow
type ResetStatus = "idle" | "loading" | "success" | "error";

interface ResetPasswordFormProps {
  /**
   * Function to handle form submission
   */
  onSubmit?: (data: FormValues) => Promise<void>;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * URL for the login page
   */
  loginUrl?: string;
  /**
   * Custom title for the form
   */
  title?: string;
  /**
   * Custom description for the form
   */
  description?: string;
  /**
   * Custom button text
   */
  buttonText?: string;
  /**
   * Custom CSS class for the container
   */
  className?: string;
  /**
   * Custom message for success state
   */
  successMessage?: string;
  /**
   * Custom error message
   */
  errorMessage?: string;
  /**
   * Show a loading skeleton while the form is loading
   */
  isLoading?: boolean;
}

export default function ResetPasswordForm1({
  onSubmit,
  formAction,
  loginUrl = "/login",
  title = "Reset password",
  description = "Enter your email address and we'll send you a link to reset your password",
  buttonText = "Send reset link",
  className,
  successMessage = "We've sent a password reset link to your email address.",
  errorMessage = "We couldn't process your request. Please try again.",
  isLoading = false,
}: ResetPasswordFormProps) {
  const [status, setStatus] = React.useState<ResetStatus>("idle");
  const [emailValue, setEmailValue] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  const emailId = useId();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  // Focus success message for accessibility when status changes
  React.useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.focus();
    } else if (status === "error" && errorRef.current) {
      errorRef.current.focus();
    }
  }, [status]);

  async function handleSubmit(data: FormValues) {
    try {
      setStatus("loading");
      setEmailValue(data.email);

      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Reset password request:", data);
      }

      setStatus("success");

      // Focus success message for screen readers
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Reset password error:", error);
      setStatus("error");

      // Focus error message for screen readers
      setTimeout(() => {
        if (errorRef.current) {
          errorRef.current.focus();
        }
      }, 100);
    }
  }

  // Function to handle resend
  const handleResend = () => {
    form.handleSubmit(handleSubmit)();
  };

  // Check if the form is in a loading state
  const isFormLoading = status === "loading" || isLoading;

  return (
    <Card className={cn("w-full max-w-md mx-auto shadow-lg", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {status !== "success" ? (
        <>
          {status === "error" && (
            <div className="px-6">
              <Alert
                variant="destructive"
                ref={errorRef}
                tabIndex={-1}
                role="alert"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}

          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
              action={formAction}
              noValidate
            >
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={emailId}>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={emailId}
                            placeholder="name@example.com"
                            className="peer ps-9"
                            type="email"
                            autoComplete="email"
                            aria-required="true"
                            {...field}
                            disabled={isFormLoading}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <AtSignIcon size={16} aria-hidden="true" />
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        We'll send a password reset link to this email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full relative"
                  disabled={isFormLoading}
                  aria-label={
                    isFormLoading ? "Sending reset link..." : buttonText
                  }
                >
                  {isFormLoading ? (
                    <>
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <AtSignIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>{buttonText}</span>
                    </>
                  )}
                  <span className="absolute inset-0" aria-hidden="true" />
                </Button>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link
                    href={loginUrl}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </>
      ) : (
        <CardContent className="space-y-4">
          <div
            className="flex flex-col items-center text-center space-y-2"
            ref={successRef}
            tabIndex={-1}
            role="alert"
            aria-live="polite"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <CheckCircle
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-lg font-medium">Check your email</h3>
            <p className="text-sm text-muted-foreground">
              {successMessage}
              {emailValue && (
                <>
                  <br />
                  <br />
                  We've sent an email to: <strong>{emailValue}</strong>
                </>
              )}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setStatus("idle")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to reset password
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the email?
              </p>
              <Button
                variant="link"
                type="button"
                className="text-primary font-medium text-sm hover:underline"
                onClick={handleResend}
                disabled={isFormLoading}
              >
                {isFormLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-3 w-3 animate-spin"
                      aria-hidden="true"
                    />
                    Resending...
                  </>
                ) : (
                  "Click to resend"
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Please check your spam folder if you don't see the email in your
                inbox.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href={loginUrl}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
