"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
} from "@/registry/new-york/ui/card";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { useToast } from "@/registry/new-york/hooks/use-toast";

const formSchema = z.object({
  satisfaction: z.enum(
    [
      "very-satisfied",
      "satisfied",
      "neutral",
      "dissatisfied",
      "very-dissatisfied",
    ],
    {
      required_error: "Please select your satisfaction level",
    },
  ),
  usability: z.enum(
    ["very-easy", "easy", "neutral", "difficult", "very-difficult"],
    {
      required_error: "Please select a usability rating",
    },
  ),
  features: z
    .array(z.string())
    .min(1, { message: "Please select at least one feature" }),
  improvements: z
    .string()
    .min(10, { message: "Please provide at least 10 characters" })
    .max(500, { message: "Please keep your response under 500 characters" }),
  contactConsent: z.boolean().optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

// Define features list with proper type
interface Feature {
  id: string;
  label: string;
  description?: string;
}

const features: Feature[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Overview of your account and activity",
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Data analysis and reporting tools",
  },
  {
    id: "automation",
    label: "Automation",
    description: "Workflow and task automation features",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Connections with other services and tools",
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    description: "iOS and Android applications",
  },
];

interface QuestionnaireFormProps {
  /**
   * Optional callback that runs after successful form submission
   */
  onSubmitSuccess?: (data: FormValues) => void;
  /**
   * Optional callback that runs if submission fails
   */
  onSubmitError?: (error: unknown) => void;
  /**
   * Custom form action for server submission
   */
  formAction?: string;
  /**
   * Product name to display in the title
   */
  productName?: string;
  /**
   * Whether to allow users to be contacted about their feedback
   */
  enableContactOption?: boolean;
}

export default function QuestionnaireForm({
  onSubmitSuccess,
  onSubmitError,
  formAction,
  productName = "Our Product",
  enableContactOption = true,
}: QuestionnaireFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      satisfaction: undefined,
      usability: undefined,
      features: [],
      improvements: "",
      contactConsent: false,
      email: "",
    },
    mode: "onBlur",
  });

  const watchContactConsent = form.watch("contactConsent");
  const watchImprovements = form.watch("improvements");

  // Focus email field when contact consent is checked
  React.useEffect(() => {
    if (watchContactConsent) {
      const emailField = document.getElementById("email-input");
      if (emailField) {
        emailField.focus();
      }
    }
  }, [watchContactConsent]);

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);

      if (!formAction) {
        // Simulate API call (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
      }

      setIsSubmitted(true);

      toast({
        title: "Feedback submitted!",
        description: "Thank you for your valuable feedback.",
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }
    } catch (error) {
      console.error("Submission error:", error);

      toast({
        title: "Submission failed",
        description:
          "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });

      if (onSubmitError) {
        onSubmitError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">{productName} Feedback</CardTitle>
        <CardDescription>
          Help us improve our product by sharing your experience
        </CardDescription>
      </CardHeader>
      {isSubmitted ? (
        <CardContent className="space-y-4">
          <div
            className="rounded-md bg-primary/10 p-6 flex flex-col items-center justify-center text-center"
            role="alert"
          >
            <div className="rounded-full bg-primary/20 p-3 mb-4">
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
            <h3 className="text-lg font-medium">Thank You!</h3>
            <p className="text-muted-foreground mt-2">
              Your feedback has been submitted successfully. We appreciate your
              time and input.
            </p>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
          >
            Submit Another Response
          </Button>
        </CardContent>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-0"
            action={formAction}
            noValidate
          >
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="satisfaction"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel
                      id="satisfaction-group-label"
                      className="text-base font-medium"
                    >
                      How satisfied are you with {productName}?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        aria-labelledby="satisfaction-group-label"
                      >
                        {[
                          ["very-satisfied", "Very Satisfied"],
                          ["satisfied", "Satisfied"],
                          ["neutral", "Neutral"],
                          ["dissatisfied", "Dissatisfied"],
                          ["very-dissatisfied", "Very Dissatisfied"],
                        ].map(([value, label]) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={value}
                                id={`satisfaction-${value}`}
                                aria-label={label as string}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`satisfaction-${value}`}
                              className="font-normal cursor-pointer"
                            >
                              {label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usability"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel
                      id="usability-group-label"
                      className="text-base font-medium"
                    >
                      How easy is it to use {productName}?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        aria-labelledby="usability-group-label"
                      >
                        {[
                          ["very-easy", "Very Easy"],
                          ["easy", "Easy"],
                          ["neutral", "Neutral"],
                          ["difficult", "Difficult"],
                          ["very-difficult", "Very Difficult"],
                        ].map(([value, label]) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={value}
                                id={`usability-${value}`}
                                aria-label={label as string}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`usability-${value}`}
                              className="font-normal cursor-pointer"
                            >
                              {label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel
                        id="features-group-label"
                        className="text-base font-medium"
                      >
                        Which features do you use the most?
                      </FormLabel>
                      <FormDescription>Select all that apply</FormDescription>
                    </div>
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                      role="group"
                      aria-labelledby="features-group-label"
                    >
                      {features.map((feature) => (
                        <FormField
                          key={feature.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={feature.id}
                                className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-3 hover:bg-muted/50 transition-colors"
                              >
                                <FormControl>
                                  <Checkbox
                                    id={`feature-${feature.id}`}
                                    checked={field.value?.includes(feature.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            feature.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== feature.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel
                                    htmlFor={`feature-${feature.id}`}
                                    className="font-medium cursor-pointer"
                                  >
                                    {feature.label}
                                  </FormLabel>
                                  {feature.description && (
                                    <p className="text-xs text-muted-foreground">
                                      {feature.description}
                                    </p>
                                  )}
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="improvements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="improvements-textarea"
                      className="text-base font-medium"
                    >
                      What improvements would you like to see?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please share your suggestions..."
                        className="resize-none min-h-[120px]"
                        id="improvements-textarea"
                        ref={textareaRef}
                        {...field}
                        aria-describedby="character-count"
                      />
                    </FormControl>
                    <FormMessage />
                    <p
                      className={`text-xs ${
                        watchImprovements.length > 450
                          ? "text-amber-500"
                          : "text-muted-foreground"
                      } mt-1`}
                      id="character-count"
                    >
                      {watchImprovements.length}/500 characters
                    </p>
                  </FormItem>
                )}
              />

              {enableContactOption && (
                <>
                  <FormField
                    control={form.control}
                    name="contactConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            id="contact-consent"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel
                            htmlFor="contact-consent"
                            className="cursor-pointer"
                          >
                            I'm willing to be contacted about my feedback
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {watchContactConsent && (
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email-input">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email-input"
                              placeholder="name@example.com"
                              type="email"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                variant="gooeyRight"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </Card>
  );
}
