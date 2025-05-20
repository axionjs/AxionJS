"use client";

import * as React from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Loader2, AtSignIcon, ArrowLeft, Check } from "lucide-react";

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
import PasswordInput from "@/registry/new-york/ui/password-input";
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { cn } from "@/lib/utils";

// Schema for the request step (email only)
const requestSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Schema for the reset step (passwords)
const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RequestFormValues = z.infer<typeof requestSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

// Define the different steps in the password reset flow
type ResetStep = "request" | "reset" | "success";

interface PasswordRequirementProps {
  met: boolean;
  text: string;
}

// Component to display password requirements with visual feedback
function PasswordRequirement({ met, text }: PasswordRequirementProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm transition-colors",
        met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
      )}
    >
      <div
        className={cn(
          "rounded-full p-1 transition-colors",
          met ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
        )}
      >
        <Check className="h-3 w-3" aria-hidden="true" />
      </div>
      <span>{text}</span>
    </div>
  );
}

interface ResetPasswordFormProps {
  /**
   * Initial step to show
   */
  initialStep?: ResetStep;
  /**
   * Callback for when the request step is submitted
   */
  onRequestSubmit?: (data: RequestFormValues) => Promise<void>;
  /**
   * Callback for when the reset step is submitted
   */
  onResetSubmit?: (data: ResetFormValues) => Promise<void>;
  /**
   * URL to redirect to after successful reset
   */
  loginUrl?: string;
  /**
   * Form action for server-side form handling
   */
  formAction?: string;
}

export default function ResetPasswordForm({
  initialStep = "request",
  onRequestSubmit,
  onResetSubmit,
  loginUrl = "/login",
  formAction,
}: ResetPasswordFormProps) {
  const [step, setStep] = React.useState<ResetStep>(initialStep);
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { toast } = useToast();

  const emailId = useId();
  const confirmPasswordId = useId();

  // Refs for accessibility focus management
  const requestFormRef = React.useRef<HTMLFormElement>(null);
  const resetFormRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Calculate password strength
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isMatchingConfirm =
    password === confirmPassword && confirmPassword !== "";

  // Calculate overall strength
  const passwordStrength =
    (hasMinLength ? 1 : 0) +
    (hasUppercase ? 1 : 0) +
    (hasLowercase ? 1 : 0) +
    (hasNumber ? 1 : 0);

  // Get strength label and class
  const getStrengthLabel = () => {
    if (password === "") return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const getStrengthClass = () => {
    if (password === "") return "bg-muted";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  async function handleRequestSubmit(data: RequestFormValues) {
    try {
      setIsLoading(true);

      // Use provided callback or simulate API call
      if (onRequestSubmit) {
        await onRequestSubmit(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Password reset request:", data);
      }

      toast({
        title: "Reset link sent",
        description:
          "If an account exists with that email, you'll receive a reset link.",
      });

      // Move to reset step (in a real app, this would typically happen when the user clicks the emailed link)
      setStep("reset");

      // Focus the reset form for accessibility
      setTimeout(() => {
        if (resetFormRef.current) {
          resetFormRef.current.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Reset request error:", error);

      toast({
        title: "Request failed",
        description: "We couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetSubmit(data: ResetFormValues) {
    try {
      setIsLoading(true);

      // Use provided callback or simulate API call
      if (onResetSubmit) {
        await onResetSubmit(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Password reset:", data);
      }

      toast({
        title: "Password reset successful",
        description:
          "Your password has been updated. You can now log in with your new password.",
      });

      setStep("success");

      // Focus the success message for accessibility
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Reset error:", error);

      toast({
        title: "Reset failed",
        description: "We couldn't reset your password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      {step === "request" && (
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <Form {...requestForm}>
            <form
              ref={requestFormRef}
              onSubmit={requestForm.handleSubmit(handleRequestSubmit)}
              className="space-y-4"
              action={formAction ? `${formAction}/request` : undefined}
              noValidate
            >
              <FormField
                control={requestForm.control}
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
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <AtSignIcon size={16} aria-hidden="true" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                variant="expandIcon"
                aria-label={
                  isLoading ? "Sending reset link..." : "Send reset link"
                }
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>

              <div className="text-center">
                <Link
                  href={loginUrl}
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          </Form>
        </>
      )}

      {step === "reset" && (
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Set new password</h1>
            <p className="text-muted-foreground">
              Please create a new secure password for your account
            </p>
          </div>

          <Form {...resetForm}>
            <form
              ref={resetFormRef}
              onSubmit={resetForm.handleSubmit(handleResetSubmit)}
              className="space-y-4"
              action={formAction ? `${formAction}/reset` : undefined}
              noValidate
              tabIndex={-1}
            >
              <FormField
                control={resetForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel htmlFor="new-password">New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="new-password"
                        value={password}
                        onChange={(value) => {
                          setPassword(value);
                          field.onChange(value);
                        }}
                        aria-required="true"
                        autoComplete="new-password"
                        aria-describedby="password-requirements"
                      />
                    </FormControl>

                    {/* Password strength meter */}
                    <div className="space-y-2" id="password-requirements">
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-300",
                            getStrengthClass()
                          )}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>

                      {password && (
                        <p className="text-xs text-muted-foreground">
                          Password strength:{" "}
                          <span
                            className={cn(
                              passwordStrength <= 2
                                ? "text-red-500"
                                : passwordStrength === 3
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            )}
                          >
                            {getStrengthLabel()}
                          </span>
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        <PasswordRequirement
                          met={hasMinLength}
                          text="At least 8 characters"
                        />
                        <PasswordRequirement
                          met={hasUppercase}
                          text="One uppercase letter"
                        />
                        <PasswordRequirement
                          met={hasLowercase}
                          text="One lowercase letter"
                        />
                        <PasswordRequirement
                          met={hasNumber}
                          text="One number"
                        />
                      </div>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={resetForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={confirmPasswordId}>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={confirmPasswordId}
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          field.onChange(e.target.value);
                        }}
                        aria-required="true"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <div className="h-5 flex items-center">
                      {confirmPassword && (
                        <p
                          className={cn(
                            "text-xs",
                            isMatchingConfirm
                              ? "text-green-600"
                              : "text-red-500"
                          )}
                        >
                          {isMatchingConfirm
                            ? "Passwords match"
                            : "Passwords don't match"}
                        </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                variant="gooeyLeft"
                aria-label={
                  isLoading ? "Updating password..." : "Reset password"
                }
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Updating password...</span>
                  </>
                ) : (
                  "Reset password"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
                  onClick={() => setStep("request")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Back to email step</span>
                </button>
              </div>
            </form>
          </Form>
        </>
      )}

      {step === "success" && (
        <div
          className="text-center space-y-4"
          ref={successRef}
          tabIndex={-1}
          role="alert"
        >
          <div className="rounded-full w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Password reset successful</h1>
          <p className="text-muted-foreground">
            Your password has been reset successfully. You can now log in with
            your new password.
          </p>
          <Button asChild className="mt-4">
            <Link href={loginUrl}>Go to login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
