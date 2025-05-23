"use client";

import * as React from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  UserIcon,
  AtSignIcon,
  Star,
  Check,
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
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { Progress } from "@/registry/new-york/ui/progress";
import { cn } from "@/lib/utils";
import { Separator } from "@/registry/new-york/ui/separator";

// Define the form validation schema
const formSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  age: z.string().min(1, { message: "Age is required" }),

  // Step 2: Preferences
  preferredContact: z.enum(["email", "phone", "mail"], {
    required_error: "Please select a preferred contact method",
  }),
  interests: z
    .array(z.string())
    .min(1, { message: "Please select at least one interest" }),

  // Step 3: Feedback
  satisfaction: z.enum(
    [
      "very-satisfied",
      "satisfied",
      "neutral",
      "dissatisfied",
      "very-dissatisfied",
    ],
    {
      required_error: "Please rate your satisfaction",
    },
  ),
  feedback: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

// Define interest options
interface InterestOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const defaultInterestOptions: InterestOption[] = [
  {
    id: "technology",
    label: "Technology",
    icon: (
      <svg
        className="h-4 w-4"
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
    id: "sports",
    label: "Sports",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
        />
      </svg>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
  },
  {
    id: "art",
    label: "Art",
    icon: (
      <svg
        className="h-4 w-4"
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
    id: "travel",
    label: "Travel",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "food",
    label: "Food",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];

interface QuestionnaireFormProps {
  /**
   * Function to handle form submission
   */
  onSubmit?: (data: FormValues) => Promise<void>;
  /**
   * URL to redirect to after successful submission
   */
  redirectTo?: string;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * Custom interest options
   */
  interestOptions?: InterestOption[];
  /**
   * Questionnaire title
   */
  title?: string;
  /**
   * Custom CSS class for the container
   */
  className?: string;
  /**
   * Initial step to show (1-based)
   */
  initialStep?: number;
  /**
   * Show step indicators
   */
  showStepIndicator?: boolean;
  /**
   * Label for the submission button
   */
  submitButtonLabel?: string;
}

export default function QuestionnaireForm({
  onSubmit: onFormSubmit,
  redirectTo,
  formAction,
  interestOptions = defaultInterestOptions,
  title = "Questionnaire",
  className,
  initialStep = 1,
  showStepIndicator = true,
  submitButtonLabel = "Submit",
}: QuestionnaireFormProps) {
  const [step, setStep] = React.useState(initialStep);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();

  const nameId = useId();
  const emailId = useId();
  const ageId = useId();

  const totalSteps = 3; // Define the total number of steps
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100; // Calculate progress percentage

  const formRef = React.useRef<HTMLFormElement>(null); // Define formRef
  const step1Ref = React.useRef<HTMLDivElement>(null);
  const step2Ref = React.useRef<HTMLDivElement>(null);
  const step3Ref = React.useRef<HTMLDivElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      preferredContact: "email",
      interests: [],
      satisfaction: "neutral",
      feedback: "",
    },
    mode: "onChange",
  });

  // Step validation fields
  const stepValidationFields = {
    1: ["name", "email", "age"],
    2: ["preferredContact", "interests"],
    3: ["satisfaction", "feedback"],
  };

  // Step titles
  const stepTitles = {
    1: "Personal Information",
    2: "Preferences",
    3: "Feedback",
  };

  // Handle next step
  const nextStep = async () => {
    // Validate current step fields
    const isValid = await form.trigger(
      stepValidationFields[step as keyof typeof stepValidationFields] as any,
    );

    if (isValid) {
      // Move to next step
      setStep((prev) => prev + 1);

      // Focus management for screen readers
      setTimeout(() => {
        if (step === 1 && step2Ref.current) {
          step2Ref.current.focus();
        } else if (step === 2 && step3Ref.current) {
          step3Ref.current.focus();
        }
      }, 100);

      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Handle previous step
  const prevStep = () => {
    setStep((prev) => prev - 1);

    // Focus management for screen readers
    setTimeout(() => {
      if (step === 2 && step1Ref.current) {
        step1Ref.current.focus();
      } else if (step === 3 && step2Ref.current) {
        step2Ref.current.focus();
      }
    }, 100);

    // Scroll to top of form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle form submission
  async function handleSubmit(data: FormValues) {
    try {
      setIsLoading(true);

      // Use provided callback or simulate API call
      if (onFormSubmit) {
        await onFormSubmit(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form data:", data);
      }

      setIsSubmitted(true);

      toast({
        title: "Questionnaire submitted!",
        description: "Thank you for completing our questionnaire.",
      });

      // Focus success message for accessibility
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.focus();
        }
      }, 100);

      // Redirect if specified
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error("Submission error:", error);

      toast({
        title: "Submission failed",
        description:
          "There was a problem submitting your responses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto bg-background text-foreground rounded-lg border shadow-md p-6",
        className,
      )}
    >
      {/* Step indicator */}
      {showStepIndicator && !isSubmitted && (
        <div className="mb-8">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-primary font-medium">
                Step {step} of {totalSteps}
              </span>
              <span className="text-muted-foreground">
                {stepTitles[step as keyof typeof stepTitles]}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step circles */}
          <div className="hidden sm:flex justify-between items-center mt-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    stepNumber < step
                      ? "bg-primary text-primary-foreground"
                      : stepNumber === step
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {stepNumber < step ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1",
                    stepNumber === step
                      ? "text-primary font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {stepTitles[stepNumber as keyof typeof stepTitles]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSubmitted ? (
        <div
          className="text-center space-y-4 py-6"
          ref={successRef}
          tabIndex={-1}
          role="alert"
          aria-live="polite"
        >
          <div className="rounded-full w-16 h-16 bg-primary/20 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-medium">Thank You!</h3>
          <p className="text-muted-foreground mt-2">
            Your feedback has been submitted successfully. We appreciate your
            time and input.
          </p>

          <div className="mt-4 bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-medium text-left mb-2">Your Responses</h4>
            <div className="space-y-3 text-sm text-left">
              <div>
                <p className="text-muted-foreground">Name:</p>
                <p className="font-medium">{form.getValues().name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email:</p>
                <p className="font-medium">{form.getValues().email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Interests:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {form.getValues().interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs"
                    >
                      {interestOptions.find((opt) => opt.id === interest)
                        ?.label || interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Satisfaction:</p>
                <p className="font-medium capitalize">
                  {form.getValues().satisfaction.replace(/-/g, " ")}
                </p>
              </div>
            </div>
          </div>

          <Button
            className="mt-4"
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
              form.reset();
            }}
          >
            Submit Another Response
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
            action={formAction}
            noValidate
          >
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div
                className="space-y-4"
                ref={step1Ref}
                tabIndex={-1}
                aria-labelledby="step1-heading"
              >
                <h3
                  id="step1-heading"
                  className="text-lg font-medium flex items-center"
                >
                  <UserIcon
                    className="mr-2 h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  Personal Information
                </h3>
                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={nameId}>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id={nameId}
                            placeholder="John Doe"
                            className="peer ps-9"
                            {...field}
                            autoComplete="name"
                            aria-required="true"
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
                            {...field}
                            autoComplete="email"
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
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={ageId}>Age</FormLabel>
                      <FormControl>
                        <Input
                          id={ageId}
                          placeholder="30"
                          type="number"
                          {...field}
                          min="0"
                          max="120"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div
                className="space-y-4"
                ref={step2Ref}
                tabIndex={-1}
                aria-labelledby="step2-heading"
              >
                <h3
                  id="step2-heading"
                  className="text-lg font-medium flex items-center"
                >
                  <Star
                    className="mr-2 h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  Preferences
                </h3>
                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel id="contact-method-label">
                        Preferred Contact Method
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                          aria-labelledby="contact-method-label"
                        >
                          {[
                            { value: "email", label: "Email" },
                            { value: "phone", label: "Phone" },
                            { value: "mail", label: "Mail" },
                          ].map((option) => (
                            <FormItem
                              key={option.value}
                              className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={option.value}
                                  id={`contact-${option.value}`}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={`contact-${option.value}`}
                                className="font-normal cursor-pointer flex-1"
                              >
                                {option.label}
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
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel id="interests-group-label">
                          Interests
                        </FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                      </div>
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        role="group"
                        aria-labelledby="interests-group-label"
                      >
                        {interestOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                                >
                                  <FormControl>
                                    <Checkbox
                                      id={`interest-${option.id}`}
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              option.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <div className="flex items-center space-x-2">
                                    {option.icon && (
                                      <span className="text-muted-foreground">
                                        {option.icon}
                                      </span>
                                    )}
                                    <FormLabel
                                      htmlFor={`interest-${option.id}`}
                                      className="font-normal cursor-pointer"
                                    >
                                      {option.label}
                                    </FormLabel>
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
              </div>
            )}

            {/* Step 3: Feedback */}
            {step === 3 && (
              <div
                className="space-y-4"
                ref={step3Ref}
                tabIndex={-1}
                aria-labelledby="step3-heading"
              >
                <h3
                  id="step3-heading"
                  className="text-lg font-medium flex items-center"
                >
                  <svg
                    className="mr-2 h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Feedback
                </h3>
                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="satisfaction"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel id="satisfaction-label">
                        How satisfied are you with our service?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                          aria-labelledby="satisfaction-label"
                        >
                          {[
                            {
                              value: "very-satisfied",
                              label: "Very Satisfied",
                              emoji: "😁",
                            },
                            {
                              value: "satisfied",
                              label: "Satisfied",
                              emoji: "🙂",
                            },
                            { value: "neutral", label: "Neutral", emoji: "😐" },
                            {
                              value: "dissatisfied",
                              label: "Dissatisfied",
                              emoji: "🙁",
                            },
                            {
                              value: "very-dissatisfied",
                              label: "Very Dissatisfied",
                              emoji: "😞",
                            },
                          ].map((option) => (
                            <FormItem
                              key={option.value}
                              className={cn(
                                "flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 transition-colors",
                                field.value === option.value &&
                                  "border-primary bg-primary/5",
                              )}
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={option.value}
                                  id={`satisfaction-${option.value}`}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={`satisfaction-${option.value}`}
                                className="font-normal cursor-pointer flex-1 flex items-center"
                              >
                                <span
                                  className="mr-2 text-lg"
                                  aria-hidden="true"
                                >
                                  {option.emoji}
                                </span>
                                {option.label}
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
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="feedback-textarea">
                        Additional Feedback
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="feedback-textarea"
                          placeholder="Please share any additional thoughts or suggestions"
                          className="resize-none min-h-[150px]"
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormDescription>
                        Your feedback helps us improve our services
                      </FormDescription>
                      <FormMessage />
                      <div className="text-xs text-right text-muted-foreground mt-1">
                        {field.value.length} characters
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  variant="default"
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="shine"
                  className="flex items-center"
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
                    submitButtonLabel
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
