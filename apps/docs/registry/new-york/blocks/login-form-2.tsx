"use client";

import * as React from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AtSignIcon, LockIcon, Github } from "lucide-react";

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
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/registry/new-york/ui/checkbox";

// Form schema (without zod dependency for lighter implementation)
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface LoginFormProps {
  /**
   * Function to handle login submission
   */
  onLogin?: (values: any) => Promise<void>;
  /**
   * URL to redirect to after successful login
   */
  redirectTo?: string;
  /**
   * Function to handle social login
   */
  onSocialLogin?: (provider: string) => Promise<void>;
  /**
   * URL for the signup page
   */
  signupUrl?: string;
  /**
   * URL for the forgot password page
   */
  forgotPasswordUrl?: string;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * Custom CSS class for the container
   */
  className?: string;
  /**
   * Color theme for gradient
   */
  colorTheme?: "professional" | "cool-gray" | "warm-gray" | "subtle-blue";
  /**
   * Whether to show left panel on mobile
   */
  showLeftPanelOnMobile?: boolean;
}

export function LoginForm2({
  onLogin,
  redirectTo = "/dashboard",
  onSocialLogin,
  signupUrl = "/signup",
  forgotPasswordUrl = "/reset-password",
  formAction,
  className,
  colorTheme = "professional",
  showLeftPanelOnMobile = false,
}: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
  });
  const formRef = React.useRef<HTMLFormElement>(null);

  const emailId = useId();
  const passwordId = useId();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Custom validation
  const validateForm = (data) => {
    const errors = {
      email: "",
      password: "",
    };

    if (!validateEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validatePassword(data.password)) {
      errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  // Handle form submission
  async function handleSubmit(values) {
    if (!validateForm(values)) {
      return;
    }

    try {
      setIsPending(true);

      if (onLogin) {
        await onLogin(values);
      } else {
        // Default login logic - replace with your actual login implementation
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
        console.log("Login values:", values);
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });

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
    } finally {
      setIsPending(false);
    }
  }

  // Handle social login
  const handleSocialLogin = async (provider: string) => {
    try {
      setIsPending(true);

      if (onSocialLogin) {
        await onSocialLogin(provider);
      } else {
        // Simulate social login
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Logging in with ${provider}`);

        toast({
          title: "Social login",
          description: `Logged in with ${provider}`,
        });

        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    } catch (error) {
      console.error(`Social login error with ${provider}:`, error);

      toast({
        title: "Login failed",
        description: `Could not log in with ${provider}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  // Get gradient classes based on color theme
  const getGradientClasses = () => {
    switch (colorTheme) {
      case "cool-gray":
        return "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700";
      case "warm-gray":
        return "from-gray-200 to-stone-300 dark:from-gray-700 dark:to-stone-800 text-gray-800 dark:text-white hover:from-gray-300 hover:to-stone-400 dark:hover:from-gray-600 dark:hover:to-stone-700";
      case "subtle-blue":
        return "from-gray-200 to-blue-100 dark:from-gray-700 dark:to-blue-900 text-gray-800 dark:text-white hover:from-gray-300 hover:to-blue-200 dark:hover:from-gray-600 dark:hover:to-blue-800";
      case "professional":
      default:
        return "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-white hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600";
    }
  };

  // Get panel gradient classes
  const getPanelGradient = () => {
    switch (colorTheme) {
      case "cool-gray":
        return "from-gray-600 to-gray-800";
      case "warm-gray":
        return "from-stone-600 to-gray-800";
      case "subtle-blue":
        return "from-gray-700 to-blue-900";
      case "professional":
      default:
        return "from-gray-700 to-gray-900";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={cn(
        "flex min-h-[80vh] w-full items-center justify-center p-4",
        className
      )}
    >
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-xl">
        {/* Left panel - only shown on md+ screens by default */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            `bg-gradient-to-br ${getPanelGradient()} p-8 md:p-12 flex flex-col justify-between`,
            showLeftPanelOnMobile ? "block" : "hidden md:flex"
          )}
        >
          <motion.div variants={staggerChildren}>
            <motion.h1
              variants={fadeIn}
              className="text-3xl font-bold text-white"
            >
              Welcome back
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-2 text-white/80">
              Log in to your account to continue your journey with us
            </motion.p>
          </motion.div>

          <motion.div variants={staggerChildren} className="space-y-8">
            <motion.div
              variants={fadeIn}
              className="flex items-start space-x-4"
            >
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                  aria-hidden="true"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">
                  Fast & Secure
                </h3>
                <p className="text-white/70">
                  Our platform ensures your data is always safe and secure
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex items-start space-x-4"
            >
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Protected</h3>
                <p className="text-white/70">
                  Advanced encryption and security protocols to protect your
                  account
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right panel - Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Sign in
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Enter your credentials to access your account
            </p>
          </motion.div>

          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(handleSubmit)}
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
                          type="email"
                          autoComplete="email"
                          aria-required="true"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <AtSignIcon size={16} aria-hidden="true" />
                        </div>
                      </div>
                    </FormControl>
                    {formErrors.email && (
                      <FormMessage>{formErrors.email}</FormMessage>
                    )}
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
                        className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id={passwordId}
                          placeholder="Enter your password"
                          className="peer ps-9"
                          {...field}
                          type="password"
                          autoComplete="current-password"
                          aria-required="true"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <LockIcon size={16} aria-hidden="true" />
                        </div>
                      </div>
                    </FormControl>
                    {formErrors.password && (
                      <FormMessage>{formErrors.password}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          const value = checked === true;
                          field.onChange(value);
                        }}
                        className="data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800 dark:data-[state=checked]:bg-gray-600 dark:data-[state=checked]:border-gray-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="pt-2"
              >
                <motion.div
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    type="submit"
                    className={cn(
                      "w-full h-12 bg-gradient-to-r shadow-md",
                      getGradientClasses()
                    )}
                    disabled={isPending}
                    aria-label="Sign in to your account"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isPending ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Loader2
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                          <span>Signing in...</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="sign-in"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-medium"
                        >
                          Sign in
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative my-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="grid grid-cols-3 gap-3"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    type="button"
                    className="h-12 border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-colors w-full"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isPending}
                    aria-label="Sign in with GitHub"
                  >
                    <Github className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    type="button"
                    className="h-12 border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-colors w-full"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isPending}
                    aria-label="Sign in with Google"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                  </Button>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    type="button"
                    className="h-12 border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-colors w-full"
                    onClick={() => handleSocialLogin("apple")}
                    disabled={isPending}
                    aria-label="Sign in with Apple"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                    </svg>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href={signupUrl}
                  className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                >
                  Sign up
                </Link>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginForm2;
