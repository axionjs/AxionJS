"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

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
import { useToast } from "@/registry/default/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { cn } from "@/lib/utils";

// Define form validation schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is required" })
    .optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  interests: z.string().min(1, { message: "Please select an interest" }),
});

type FormValues = z.infer<typeof formSchema>;

// Define available interest options
interface InterestOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

// Pre-defined interests with descriptions
const defaultInterests: InterestOption[] = [
  {
    value: "technology",
    label: "Technology",
    description: "Latest tech trends and innovations",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    value: "design",
    label: "Design",
    description: "UI/UX design trends and inspiration",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    value: "business",
    label: "Business",
    description: "Business strategy and market insights",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    value: "marketing",
    label: "Marketing",
    description: "Digital marketing strategies and tools",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    value: "development",
    label: "Development",
    description: "Software development and coding tutorials",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

interface NewsletterFormProps {
  /**
   * Optional callback for successful form submission
   */
  onSubscribe?: (data: FormValues) => Promise<void>;
  /**
   * Optional callback for submission errors
   */
  onError?: (error: unknown) => void;
  /**
   * Custom form action for server actions
   */
  formAction?: string;
  /**
   * Custom title for the newsletter
   */
  title?: string;
  /**
   * Custom description for the newsletter
   */
  description?: string;
  /**
   * Custom available interests
   */
  interestOptions?: InterestOption[];
  /**
   * Custom class names for the container
   */
  className?: string;
  /**
   * Custom accent color for the form
   */
  accentColor?: "primary" | "blue" | "green" | "purple" | "amber";
}

export default function NewsletterForm({
  onSubscribe,
  onError,
  formAction,
  title = "Join our newsletter",
  description = "Get personalized content delivered to your inbox",
  interestOptions = defaultInterests,
  className,
  accentColor = "primary",
}: NewsletterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState("");
  const { toast } = useToast();

  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      interests: "",
    },
    mode: "onBlur",
  });

  // Get gradient classes based on accent color
  const getGradientClasses = () => {
    switch (accentColor) {
      case "blue":
        return "from-blue-400/20 to-blue-500/5";
      case "green":
        return "from-green-400/20 to-green-500/5";
      case "purple":
        return "from-purple-400/20 to-purple-500/5";
      case "amber":
        return "from-amber-400/20 to-amber-500/5";
      case "primary":
      default:
        return "from-primary/20 to-primary/5";
    }
  };

  // Get button color classes based on accent color
  const getButtonClasses = () => {
    switch (accentColor) {
      case "blue":
        return "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500";
      case "green":
        return "bg-green-500 hover:bg-green-600 focus:ring-green-500";
      case "purple":
        return "bg-purple-500 hover:bg-purple-600 focus:ring-purple-500";
      case "amber":
        return "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500";
      case "primary":
      default:
        return "";
    }
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      setEmailValue(data.email);

      // If onSubscribe callback is provided, use it
      if (onSubscribe) {
        await onSubscribe(data);
      } else {
        // Otherwise, simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Newsletter subscription:", data);
      }

      setIsSubmitted(true);

      toast({
        title: "Subscription successful!",
        description: "You've been added to our newsletter.",
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

      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "bg-gradient-to-br rounded-xl p-8 shadow-sm",
          getGradientClasses(),
        )}
      >
        {!isSubmitted ? (
          <>
            <div className="space-y-2 text-center mb-6">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                action={formAction}
                noValidate
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="firstName-input">
                        First name{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="firstName-input"
                          placeholder="Jane"
                          className="h-12 bg-background/80 backdrop-blur-sm"
                          autoComplete="given-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email-input">Email address</FormLabel>
                      <FormControl>
                        <Input
                          id="email-input"
                          placeholder="name@example.com"
                          className="h-12 bg-background/80 backdrop-blur-sm"
                          type="email"
                          autoComplete="email"
                          required
                          aria-required="true"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="interests-select">
                        Interests
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="interests-select"
                            className="h-12 bg-background/80 backdrop-blur-sm"
                          >
                            <SelectValue placeholder="Select your interests" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interestOptions.map((interest) => (
                            <SelectItem
                              key={interest.value}
                              value={interest.value}
                              className="flex items-center py-3"
                            >
                              <div className="flex items-center gap-2">
                                {interest.icon && (
                                  <span className="text-muted-foreground">
                                    {interest.icon}
                                  </span>
                                )}
                                <div>
                                  <span>{interest.label}</span>
                                  {interest.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {interest.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        We'll send you content based on your interests
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 mt-2 focus:ring-2 focus:ring-offset-2",
                    getButtonClasses(),
                  )}
                  disabled={isLoading}
                  variant="shine"
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
                    <>
                      <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Subscribe</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-xs text-center mt-4 text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div
            className="text-center space-y-4 py-8"
            role="alert"
            aria-live="polite"
            ref={successRef}
            tabIndex={-1}
          >
            <div className="rounded-full w-16 h-16 bg-primary/20 mx-auto flex items-center justify-center">
              <CheckCircle2
                className="w-8 h-8 text-primary"
                aria-hidden="true"
              />
            </div>
            <h2 className="text-2xl font-bold">You're subscribed!</h2>
            <p className="text-muted-foreground">
              Thank you for subscribing to our newsletter.
              <br />
              We've sent a confirmation email to{" "}
              <strong className="font-medium text-foreground">
                {emailValue}
              </strong>
              .
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                className="w-full sm:w-auto"
              >
                Subscribe another email
              </Button>

              <Button
                variant="default"
                className={cn(
                  "w-full sm:w-auto focus:ring-2 focus:ring-offset-2",
                  getButtonClasses(),
                )}
                onClick={() => (window.location.href = "/")}
              >
                Return to homepage
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
