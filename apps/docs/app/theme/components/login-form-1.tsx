"use client";

import * as React from "react";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSignIcon, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { cn } from "@/lib/utils";

// Define login form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Password input component
function PasswordInput({
  id,
  value,
  onChange,
  error,
  autoComplete,
  ...props
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  "aria-required"?: string;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
      >
        <span className="text-xs font-medium">
          {showPassword ? "Hide" : "Show"}
        </span>
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
}

export function LoginForm1({
  onLogin,
  redirectTo = "/dashboard",
  onSocialLogin,
  formAction,
  signupUrl = "/signup",
  forgotPasswordUrl = "/reset-password",
  socialProviders = [],
  welcomeText = "Welcome back",
  descriptionText = "Enter your credentials to access your account",
  showRememberMe = true,
  className,
}: {
  onLogin?: (values: FormValues) => Promise<void>;
  redirectTo?: string;
  onSocialLogin?: (provider: string) => Promise<void>;
  formAction?: string;
  signupUrl?: string;
  forgotPasswordUrl?: string;
  socialProviders?: {
    id: string;
    name: string;
    icon: React.ReactNode;
    className?: string;
  }[];
  welcomeText?: string;
  descriptionText?: string;
  showRememberMe?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const emailId = useId();
  const passwordId = useId();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  // Handle social login
  const handleSocialLogin = async (providerId: string) => {
    try {
      setIsPending(true);

      if (onSocialLogin) {
        await onSocialLogin(providerId);
      } else {
        // Simulate API call for social login
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Logging in with ${providerId}`);

        toast({
          title: "Social login",
          description: `Logged in with ${providerId}`,
        });

        router.push(redirectTo);
      }
    } catch (error) {
      console.error(`Social login error with ${providerId}:`, error);

      toast({
        title: "Login failed",
        description: `Could not log in with ${providerId}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  // Handle form submission
  async function onSubmit(values: FormValues) {
    try {
      setIsPending(true);

      if (onLogin) {
        // Use the provided login function
        await onLogin(values);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Login values:", values);

        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });

        router.push(redirectTo);
      }
    } catch (error) {
      console.error("Login error:", error);

      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto shadow-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {welcomeText}
        </CardTitle>
        <CardDescription className="text-center">
          {descriptionText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            action={formAction}
            noValidate
          >
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
                        {...field}
                        autoComplete="email"
                        type="email"
                        aria-required="true"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor={passwordId}>Password</FormLabel>
                    <Link
                      href={forgotPasswordUrl}
                      className="text-sm text-primary hover:underline"
                      tabIndex={-1}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      id={passwordId}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      error={form.formState.errors.password?.message}
                      autoComplete="current-password"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showRememberMe && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked === "boolean") {
                      setRememberMe(checked);
                      form.setValue("rememberMe", checked);
                    }
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Remember me
                </label>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
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
                <>
                  <span>Sign in</span>
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {socialProviders.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              type="button"
              className={cn(
                "flex items-center justify-center gap-2 transition-colors",
                provider.className
              )}
              onClick={() => handleSocialLogin(provider.id)}
              disabled={isPending}
              aria-label={`Sign in with ${provider.name}`}
            >
              {provider.icon}
              <span className="hidden sm:inline">{provider.name}</span>
            </Button>
          ))}
        </div>
        <div className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href={signupUrl}
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LoginForm1;
