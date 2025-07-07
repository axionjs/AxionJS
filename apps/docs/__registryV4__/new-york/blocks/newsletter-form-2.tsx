"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, Check, Info } from "lucide-react";

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
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { Switch } from "@/registry/new-york/ui/switch";

// Define form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  weeklyDigest: z.boolean().optional().default(true),
  productUpdates: z.boolean().optional().default(false),
  marketingEmails: z.boolean().optional().default(false),
  eventInvites: z.boolean().optional().default(false),
  subscribedToAll: z.boolean().optional().default(false),
});

type FormValues = z.infer<typeof formSchema>;

// Define subscription preference options
interface SubscriptionOption {
  id: keyof FormValues;
  label: string;
  description: string;
  icon?: React.ReactNode;
  frequency?: string;
}

const defaultSubscriptionOptions: SubscriptionOption[] = [
  {
    id: "weeklyDigest",
    label: "Weekly digest newsletter",
    description: "A roundup of the best content from our blog and community",
    frequency: "Weekly",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "productUpdates",
    label: "Product updates and announcements",
    description: "Be the first to know about new features and improvements",
    frequency: "Monthly",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "marketingEmails",
    label: "Marketing and promotions",
    description: "Exclusive offers, discounts, and special promotions",
    frequency: "Occasionally",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "eventInvites",
    label: "Event invitations",
    description: "Webinars, workshops, and other events we host",
    frequency: "As scheduled",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

interface NewsletterFormProps {
  /**
   * Function to handle form submission
   */
  onSubscribe?: (data: FormValues) => Promise<void>;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * Custom title for the form
   */
  title?: string;
  /**
   * Custom description for the form
   */
  description?: string;
  /**
   * Custom subscription options
   */
  subscriptionOptions?: SubscriptionOption[];
  /**
   * Whether to allow subscribing to all newsletters at once
   */
  allowSubscribeAll?: boolean;
  /**
   * Custom button text
   */
  buttonText?: string;
  /**
   * Custom success message
   */
  successMessage?: string;
  /**
   * Custom CSS class for the container
   */
  className?: string;
  /**
   * Color theme
   */
  colorTheme?: "default" | "blue" | "green" | "purple";
}

export default function NewsletterPreferencesForm({
  onSubscribe,
  formAction,
  title = "Stay in the loop",
  description = "Subscribe to receive the latest updates",
  subscriptionOptions = defaultSubscriptionOptions,
  allowSubscribeAll = true,
  buttonText = "Subscribe",
  successMessage = "You've been added to our newsletter.",
  className,
  colorTheme = "default",
}: NewsletterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [hasSubscriptions, setHasSubscriptions] = React.useState(false);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  // Get color theme classes
  const getThemeClasses = () => {
    switch (colorTheme) {
      case "blue":
        return {
          icon: "text-blue-500",
          background: "bg-blue-50 dark:bg-blue-900/20",
          highlight: "text-blue-600 dark:text-blue-400",
          primary: "bg-blue-600 hover:bg-blue-700 text-white",
          accent: "bg-blue-500/10 text-blue-500",
          border: "border-blue-200 dark:border-blue-700",
        };
      case "green":
        return {
          icon: "text-green-500",
          background: "bg-green-50 dark:bg-green-900/20",
          highlight: "text-green-600 dark:text-green-400",
          primary: "bg-green-600 hover:bg-green-700 text-white",
          accent: "bg-green-500/10 text-green-500",
          border: "border-green-200 dark:border-green-700",
        };
      case "purple":
        return {
          icon: "text-purple-500",
          background: "bg-purple-50 dark:bg-purple-900/20",
          highlight: "text-purple-600 dark:text-purple-400",
          primary: "bg-purple-600 hover:bg-purple-700 text-white",
          accent: "bg-purple-500/10 text-purple-500",
          border: "border-purple-200 dark:border-purple-700",
        };
      default:
        return {
          icon: "text-primary",
          background: "bg-primary/10",
          highlight: "text-primary",
          primary: "",
          accent: "bg-primary/10 text-primary",
          border: "border-border",
        };
    }
  };

  const themeClasses = getThemeClasses();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      weeklyDigest: true,
      productUpdates: false,
      marketingEmails: false,
      eventInvites: false,
      subscribedToAll: false,
    },
    mode: "onChange",
  });

  // Watch all subscription values
  const subscriptionValues = form.watch([
    "weeklyDigest",
    "productUpdates",
    "marketingEmails",
    "eventInvites",
  ]);

  // Watch subscribedToAll value
  const subscribedToAll = form.watch("subscribedToAll");

  // Update hasSubscriptions state based on subscription selections
  React.useEffect(() => {
    const hasAnySubscription = subscriptionValues.some((value) => !!value);
    setHasSubscriptions(hasAnySubscription);
  }, [subscriptionValues]);

  // Handle subscribedToAll changes
  React.useEffect(() => {
    if (subscribedToAll) {
      // Check all subscription boxes
      subscriptionOptions.forEach((option) => {
        if (option.id !== "subscribedToAll" && option.id !== "email") {
          form.setValue(option.id as any, true);
        }
      });
    }
  }, [subscribedToAll, form, subscriptionOptions]);

  async function onSubmit(data: FormValues) {
    if (!hasSubscriptions) {
      toast({
        title: "No preferences selected",
        description: "Please select at least one subscription preference.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      if (onSubscribe) {
        await onSubscribe(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Newsletter subscription:", data);
      }

      setIsSubmitted(true);

      toast({
        title: "Subscription successful!",
        description: successMessage,
      });

      // Focus success message for accessibility
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Subscription error:", error);

      toast({
        title: "Subscription failed",
        description:
          "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-lg mx-auto p-6 rounded-xl",
        themeClasses.background,
        className,
      )}
    >
      {!isSubmitted ? (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className={cn("rounded-full p-2", themeClasses.accent)}>
              <Mail
                className={cn("h-6 w-6", themeClasses.highlight)}
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>

          <Form {...form}>
            <form
              ref={formRef}
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
                    <FormLabel htmlFor="email-input" className="sr-only">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="email-input"
                          placeholder="Enter your email"
                          className="pr-32 h-12"
                          type="email"
                          autoComplete="email"
                          aria-required="true"
                          {...field}
                        />
                        <Button
                          type="submit"
                          className={cn(
                            "absolute right-1 top-1 h-10",
                            themeClasses.primary,
                          )}
                          disabled={isLoading}
                          variant="expandIcon"
                        >
                          {isLoading ? (
                            <Loader2
                              className="h-4 w-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <>{buttonText}</>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {allowSubscribeAll && (
                <FormField
                  control={form.control}
                  name="subscribedToAll"
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        "flex flex-row items-center justify-between rounded-lg border p-4 space-y-0 mb-4",
                        themeClasses.border,
                      )}
                    >
                      <div className="space-y-0.5">
                        <FormLabel
                          htmlFor="subscribe-all"
                          className="text-base"
                        >
                          Subscribe to all updates
                        </FormLabel>
                        <FormDescription>
                          Receive all emails and notifications
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          id="subscribe-all"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Subscribe to all updates"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    Subscription preferences
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <span className="sr-only">Subscription info</span>
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Choose which types of emails you'd like to receive.
                          You can change your preferences anytime.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-2">
                  {subscriptionOptions.map((option) => {
                    // Skip the subscribedToAll option as it's handled separately
                    if (
                      option.id === "subscribedToAll" ||
                      option.id === "email"
                    ) {
                      return null;
                    }

                    return (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name={option.id as any}
                        render={({ field }) => (
                          <FormItem
                            className={cn(
                              "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors",
                              field.value && "bg-muted/50",
                              themeClasses.border,
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                id={`option-${option.id}`}
                                checked={field.value as boolean}
                                onCheckedChange={field.onChange}
                                disabled={subscribedToAll}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none w-full">
                              <div className="flex items-center justify-between">
                                <FormLabel
                                  htmlFor={`option-${option.id}`}
                                  className="text-sm font-medium leading-none cursor-pointer flex items-center"
                                >
                                  {option.icon && (
                                    <span
                                      className={cn("mr-2", themeClasses.icon)}
                                    >
                                      {option.icon}
                                    </span>
                                  )}
                                  {option.label}
                                </FormLabel>
                                {option.frequency && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                                    {option.frequency}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {option.description}
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="lg:hidden">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !form.formState.isValid}
                  variant="default"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    buttonText
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-xs text-center mt-4 text-muted-foreground">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy. You can unsubscribe at any time.
          </p>
        </>
      ) : (
        <div
          className="text-center space-y-4 py-6"
          ref={successRef}
          tabIndex={-1}
          role="alert"
          aria-live="polite"
        >
          <div
            className={cn(
              "rounded-full w-16 h-16 mx-auto flex items-center justify-center",
              themeClasses.accent,
            )}
          >
            <Check
              className={cn("w-8 h-8", themeClasses.highlight)}
              aria-hidden="true"
            />
          </div>
          <h2 className="text-2xl font-bold">You're subscribed!</h2>
          <p className="text-muted-foreground">
            Thank you for subscribing to our newsletter.
            <br />
            We've sent a confirmation email to{" "}
            <strong>{form.getValues().email}</strong>.
          </p>

          <div className="mt-6 space-y-4">
            <div className={cn("p-4 rounded-lg", themeClasses.background)}>
              <h3 className="font-medium mb-2">Your subscriptions:</h3>
              <ul className="space-y-2">
                {subscriptionOptions.map((option) => {
                  if (
                    option.id === "subscribedToAll" ||
                    option.id === "email"
                  ) {
                    return null;
                  }

                  const isSelected =
                    form.getValues()[option.id as keyof FormValues];

                  if (!isSelected) {
                    return null;
                  }

                  return (
                    <li key={option.id} className="flex items-center">
                      <Check
                        className={cn("h-4 w-4 mr-2", themeClasses.highlight)}
                        aria-hidden="true"
                      />
                      <span>{option.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button
              onClick={() => {
                setIsSubmitted(false);
                form.reset({
                  email: "",
                  weeklyDigest: true,
                  productUpdates: false,
                  marketingEmails: false,
                  eventInvites: false,
                  subscribedToAll: false,
                });
              }}
              className="w-full"
              variant="outline"
            >
              Subscribe another email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
