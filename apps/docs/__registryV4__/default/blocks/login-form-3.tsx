"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/registry/default/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/registry/default/ui/form";
import { useToast } from "@/registry/default/hooks/use-toast";
import PasswordInput from "@/registry/default/ui/password-input";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  /**
   * Optional callback that runs after successful form submission
   */
  onLoginSuccess?: (data: FormValues) => void;
  /**
   * Optional callback that runs if login fails
   */
  onLoginError?: (error: unknown) => void;
  /**
   * Custom form action for server actions
   */
  formAction?: string;
  /**
   * Redirect URL after successful login
   */
  redirectTo?: string;
}

export function LoginForm3({
  onLoginSuccess,
  onLoginError,
  formAction,
  redirectTo = "/dashboard",
}: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsPending(true);

      // If formAction is provided, the form will be submitted there
      // Otherwise, we handle submission client-side
      if (!formAction) {
        // Simulate API call, replace with your actual login API
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(values);
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });

      // Call success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess(values);
      }

      // Redirect user after successful login
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      console.error("Login error:", error);

      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });

      // Call error callback if provided
      if (onLoginError) {
        onLoginError(error);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 dark:from-teal-500 dark:to-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              aria-hidden="true"
            >
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M17 18h1" />
              <path d="M12 18h1" />
              <path d="M7 18h1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Sign in to continue to your account
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            action={formAction}
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <input
                        type="email"
                        className="peer h-14 w-full rounded-lg border border-gray-300 bg-transparent px-4 pt-4 pb-1.5 text-base text-gray-900 outline-none transition-all focus:border-emerald-500 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-emerald-400"
                        placeholder=" "
                        {...field}
                        autoComplete="email"
                        aria-label="Email address"
                        aria-required="true"
                      />
                      <label className="pointer-events-none absolute left-4 top-1 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-emerald-500 dark:text-gray-500 dark:peer-focus:text-emerald-400">
                        Email address
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        value={password}
                        onChange={(value) => {
                          setPassword(value);
                          field.onChange(value);
                        }}
                        error={form.formState.errors.password?.message}
                        aria-label="Password"
                        aria-required="true"
                        className="h-14"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  aria-label="Remember me"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/reset-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="gooeyRight"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
              disabled={isPending}
              aria-label="Sign in to your account"
            >
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                type="button"
                className="h-12 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                aria-label="Sign in with GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 dark:text-gray-300"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="h-12 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                aria-label="Sign in with Google"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 dark:text-gray-300"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="h-12 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                aria-label="Sign in with Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 dark:text-gray-300"
                  aria-hidden="true"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-6 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}

export default LoginForm3;
