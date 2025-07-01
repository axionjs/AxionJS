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
  UserIcon,
  Check,
  ArrowRight,
  Shield,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import PasswordInput from "@/registry/default/ui/password-input";
import { useToast } from "@/registry/default/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/registry/default/ui/separator";
import { Badge } from "@/registry/default/ui/badge";

// Define validation schema with strong password requirements
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
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
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    marketingConsent: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

// Define benefit items for the right panel
interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultBenefits: BenefitItem[] = [
  {
    icon: <Check className="h-5 w-5 text-primary" />,
    title: "Free access to basic features",
    description: "Get started with essential tools at no cost",
  },
  {
    icon: <Check className="h-5 w-5 text-primary" />,
    title: "Premium support via email",
    description: "Receive priority assistance when you need help",
  },
  {
    icon: <Check className="h-5 w-5 text-primary" />,
    title: "Regular feature updates",
    description: "Enjoy continuous improvements and new capabilities",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Enhanced security features",
    description: "Keep your data safe with advanced protection",
  },
];

// Social login providers
interface SocialProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

const defaultSocialProviders: SocialProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: (
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    className: "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    className: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30",
  },
];

interface SignupFormProps {
  /**
   * Function to handle form submission
   */
  onSignup?: (data: FormValues) => Promise<void>;
  /**
   * Function to handle social login
   */
  onSocialSignup?: (provider: string) => Promise<void>;
  /**
   * URL to redirect to after successful signup
   */
  redirectTo?: string;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * URL for the login page
   */
  loginUrl?: string;
  /**
   * URL for the terms page
   */
  termsUrl?: string;
  /**
   * URL for the privacy policy page
   */
  privacyUrl?: string;
  /**
   * Custom title for the form
   */
  title?: string;
  /**
   * Custom description for the form
   */
  description?: string;
  /**
   * Custom benefits to show on the right side
   */
  benefits?: BenefitItem[];
  /**
   * Social providers for alternative signup
   */
  socialProviders?: SocialProvider[];
  /**
   * Custom CSS class for the container
   */
  className?: string;
  /**
   * Custom promo title for the right panel
   */
  promoTitle?: string;
  /**
   * Custom promo description for the right panel
   */
  promoDescription?: string;
  /**
   * Whether to show marketing consent checkbox
   */
  showMarketingConsent?: boolean;
  /**
   * Custom color theme
   */
  colorTheme?: "default" | "blue" | "green" | "purple";
}

export default function SignupForm({
  onSignup,
  onSocialSignup,
  redirectTo,
  formAction,
  loginUrl = "/login",
  termsUrl = "/terms",
  privacyUrl = "/privacy",
  title = "Join our community",
  description = "Create an account to get started",
  benefits = defaultBenefits,
  socialProviders = defaultSocialProviders,
  className,
  promoTitle = "Join thousands of users",
  promoDescription = "Create your account today and get access to all features",
  showMarketingConsent = false,
  colorTheme = "default",
}: SignupFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  // Get theme classes based on color theme
  const getThemeClasses = () => {
    switch (colorTheme) {
      case "blue":
        return {
          gradientFrom: "from-blue-500/5",
          gradientTo: "to-blue-500/30",
          textHighlight: "text-blue-600 dark:text-blue-400",
          buttonHover: "hover:bg-blue-600",
          accent: "bg-blue-500/10",
        };
      case "green":
        return {
          gradientFrom: "from-green-500/5",
          gradientTo: "to-green-500/30",
          textHighlight: "text-green-600 dark:text-green-400",
          buttonHover: "hover:bg-green-600",
          accent: "bg-green-500/10",
        };
      case "purple":
        return {
          gradientFrom: "from-purple-500/5",
          gradientTo: "to-purple-500/30",
          textHighlight: "text-purple-600 dark:text-purple-400",
          buttonHover: "hover:bg-purple-600",
          accent: "bg-purple-500/10",
        };
      default:
        return {
          gradientFrom: "from-primary/5",
          gradientTo: "to-primary/30",
          textHighlight: "text-primary",
          buttonHover: "hover:bg-primary/90",
          accent: "bg-primary/10",
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Password strength calculation
  const calculatePasswordStrength = () => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains number
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength();
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      marketingConsent: false,
    },
    mode: "onBlur",
  });

  // Handle social signup
  const handleSocialSignup = async (providerId: string) => {
    try {
      setIsLoading(true);

      if (onSocialSignup) {
        await onSocialSignup(providerId);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Signing up with ${providerId}`);

        toast({
          title: "Account created",
          description: `Signed up with ${providerId}`,
        });

        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch (error) {
      console.error(`Social signup error with ${providerId}:`, error);

      toast({
        title: "Signup failed",
        description: `Could not sign up with ${providerId}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  async function handleSubmit(data: FormValues) {
    try {
      setIsLoading(true);

      if (onSignup) {
        await onSignup(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Signup data:", data);

        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        });

        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch (error) {
      console.error("Signup error:", error);

      toast({
        title: "Signup failed",
        description:
          "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex min-h-screen flex-col lg:flex-row", className)}>
      {/* Left side - Form */}
      <div className="w-full flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>

          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
              action={formAction}
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={firstNameId}>First name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={firstNameId}
                            placeholder="John"
                            className="peer ps-9"
                            autoComplete="given-name"
                            aria-required="true"
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <UserIcon size={16} aria-hidden="true" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={lastNameId}>Last name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={lastNameId}
                            placeholder="Doe"
                            className="peer ps-9"
                            autoComplete="family-name"
                            aria-required="true"
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <UserIcon size={16} aria-hidden="true" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                    <FormLabel htmlFor={passwordId}>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id={passwordId}
                        value={password}
                        onChange={(value) => {
                          setPassword(value);
                          field.onChange(value);
                        }}
                        autoComplete="new-password"
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={confirmPasswordId}>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id={confirmPasswordId}
                          type="password"
                          placeholder="••••••••"
                          className="peer ps-9"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            field.onChange(e.target.value);
                          }}
                          autoComplete="new-password"
                          aria-required="true"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <Check size={16} aria-hidden="true" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="terms-checkbox"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-required="true"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel
                        htmlFor="terms-checkbox"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        I agree to the{" "}
                        <Link
                          href={termsUrl}
                          className={cn(
                            "hover:underline",
                            themeClasses.textHighlight,
                          )}
                          target="_blank"
                        >
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href={privacyUrl}
                          className={cn(
                            "hover:underline",
                            themeClasses.textHighlight,
                          )}
                          target="_blank"
                        >
                          privacy policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {showMarketingConsent && (
                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="marketing-checkbox"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel
                          htmlFor="marketing-checkbox"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          I agree to receive marketing emails and updates
                        </FormLabel>
                        <FormDescription className="text-xs">
                          We'll send occasional updates about new features and
                          promotions
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className={cn("w-full h-11", themeClasses.buttonHover)}
                disabled={isLoading}
                variant="linkHover"
                aria-label="Create account"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create account</span>
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    variant="outline"
                    type="button"
                    className={cn("h-11 transition-colors", provider.className)}
                    onClick={() => handleSocialSignup(provider.id)}
                    disabled={isLoading}
                    aria-label={`Sign up with ${provider.name}`}
                  >
                    {provider.icon}
                    <span className="hidden xs:inline">{provider.name}</span>
                  </Button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href={loginUrl}
                  className={cn(
                    "font-medium hover:underline",
                    themeClasses.textHighlight,
                  )}
                >
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Promotional content - hidden on small screens */}
      <div className="hidden lg:block lg:w-1/2 bg-muted">
        <div
          className={cn(
            "h-full flex items-center justify-center p-12 bg-gradient-to-br",
            themeClasses.gradientFrom,
            themeClasses.gradientTo,
          )}
        >
          <div className="max-w-md space-y-6 p-6 bg-background/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center">
                <Badge variant="default" className="mr-2 text-xs px-2 py-0.5">
                  New
                </Badge>
                <h2 className="text-2xl font-bold">{promoTitle}</h2>
              </div>
              <p className="text-muted-foreground">{promoDescription}</p>
            </div>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className={cn(
                      "rounded-full p-1 mt-0.5",
                      themeClasses.accent,
                    )}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <span className="font-medium">{benefit.title}</span>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">
                "I've been using this platform for 3 months now, and it has
                completely transformed how I work. The features are intuitive
                and powerful."
              </p>
              <div className="mt-3 flex items-center">
                <div className="rounded-full bg-primary/10 h-8 w-8 flex items-center justify-center text-xs font-medium">
                  JD
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">
                    Product Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
