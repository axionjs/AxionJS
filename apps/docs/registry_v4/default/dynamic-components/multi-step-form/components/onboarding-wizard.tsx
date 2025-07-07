"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  UserIcon,
  Settings,
  BellRing,
  Check,
} from "lucide-react";

import { Form } from "@/registry/default/ui/form";
import { Button } from "@/registry/default/ui/button";
import { Progress } from "@/registry/default/ui/progress";
import { cn } from "@/lib/utils";
import { Separator } from "@/registry/default/ui/separator";
import { saveOnboardingData } from "@/registry/default/dynamic-components/multi-step-form/actions/multi-step-form-actions";
import { PersonalInfoForm } from "@/registry/default/dynamic-components/multi-step-form/components/personal-info-form";
import { PreferencesForm } from "@/registry/default/dynamic-components/multi-step-form/components/preferences-form";
import { AvatarUploadForm } from "@/registry/default/dynamic-components/multi-step-form/components/avatar-upload-form";
import { NotificationsForm } from "@/registry/default/dynamic-components/multi-step-form/components/notifications-form";
import { useToast } from "@/registry/default/hooks/use-toast";

// Define the form validation schema
const formSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z
    .string()
    .max(500, { message: "Bio must not exceed 500 characters" })
    .optional(),

  // Step 2: Profile Picture
  avatarUrl: z.string().optional(),

  // Step 3: Preferences
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme preference",
  }),
  emailFrequency: z.enum(["daily", "weekly", "monthly", "never"], {
    required_error: "Please select an email frequency",
  }),
  marketingEmails: z.boolean().default(false),

  // Step 4: Notifications
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  activitySummary: z.boolean().default(true),
  newFeatures: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
});

export type OnboardingFormValues = z.infer<typeof formSchema>;

interface OnboardingWizardProps {
  /**
   * URL to redirect to after successful submission
   */
  redirectUrl?: string;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * Onboarding title
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
  /**
   * Function to call when onboarding is complete
   */
  onComplete?: (data: OnboardingFormValues) => void;
}

export function OnboardingWizard({
  redirectUrl = "/dashboard",
  className,
  initialStep = 1,
  showStepIndicator = true,
  submitButtonLabel = "Complete Setup",
  onComplete,
}: OnboardingWizardProps) {
  const [step, setStep] = React.useState(initialStep);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const totalSteps = 4; // Define the total number of steps
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100; // Calculate progress percentage

  const formRef = React.useRef<HTMLFormElement>(null);
  const step1Ref = React.useRef<HTMLDivElement>(null);
  const step2Ref = React.useRef<HTMLDivElement>(null);
  const step3Ref = React.useRef<HTMLDivElement>(null);
  const step4Ref = React.useRef<HTMLDivElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      avatarUrl: "",
      theme: "system",
      emailFrequency: "weekly",
      marketingEmails: false,
      emailNotifications: true,
      pushNotifications: true,
      activitySummary: true,
      newFeatures: true,
      securityAlerts: true,
    },
    mode: "onChange",
  });

  // Step validation fields
  const stepValidationFields = {
    1: ["name", "bio"],
    2: ["avatarUrl"],
    3: ["theme", "emailFrequency", "marketingEmails"],
    4: [
      "emailNotifications",
      "pushNotifications",
      "activitySummary",
      "newFeatures",
      "securityAlerts",
    ],
  };

  // Step titles and icons
  const steps = [
    {
      id: 1,
      title: "Personal Info",
      icon: (
        <UserIcon className="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
      ),
      ref: step1Ref,
      isOptional: false,
    },
    {
      id: 2,
      title: "Profile Picture",
      icon: (
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      ref: step2Ref,
      isOptional: true,
    },
    {
      id: 3,
      title: "Preferences",
      icon: (
        <Settings className="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
      ),
      ref: step3Ref,
      isOptional: false,
    },
    {
      id: 4,
      title: "Notifications",
      icon: (
        <BellRing className="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
      ),
      ref: step4Ref,
      isOptional: true,
    },
  ];

  // Handle next step
  const nextStep = async () => {
    // Validate current step fields
    const isValid = await form.trigger(
      stepValidationFields[step as keyof typeof stepValidationFields] as any,
    );

    if (isValid || steps[step - 1].isOptional) {
      // Check if we're already on the last step to prevent auto-advancing
      if (step < totalSteps) {
        // Move to next step
        setStep((prev) => prev + 1);

        // Focus management for screen readers
        setTimeout(() => {
          const nextStepRef = steps[step]?.ref.current;
          if (nextStepRef) {
            nextStepRef.focus();
          }
        }, 100);

        // Scroll to top of form
        if (formRef.current) {
          formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  };

  // Handle previous step
  const prevStep = () => {
    setStep((prev) => prev - 1);

    // Focus management for screen readers
    setTimeout(() => {
      const prevStepRef = steps[step - 2]?.ref.current;
      if (prevStepRef) {
        prevStepRef.focus();
      }
    }, 100);

    // Scroll to top of form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle skip step
  const skipStep = () => {
    // Move to next step without validation
    setStep((prev) => prev + 1);

    // Focus management for screen readers
    setTimeout(() => {
      const nextStepRef = steps[step]?.ref.current;
      if (nextStepRef) {
        nextStepRef.focus();
      }
    }, 100);

    // Scroll to top of form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onFormSubmit = async () => {
    try {
      // Validate all fields before submission
      const isValid = await form.trigger();

      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      // Get form data
      const data = form.getValues();

      // Save onboarding data
      await saveOnboardingData(data);

      if (onComplete) {
        onComplete(data);
      }

      setIsSubmitted(true);

      toast({
        title: "Profile setup complete!",
        description: "Your profile has been successfully set up.",
      });

      // Focus success message for accessibility
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.focus();
        }
      }, 100);

      // Redirect if specified
      if (redirectUrl) {
        setTimeout(() => {
          router.push(redirectUrl);
        }, 2000);
      }
    } catch (error) {
      console.error("Submission error:", error);

      toast({
        title: "Submission failed",
        description:
          "There was a problem saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                {steps[step - 1].title}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step circles */}
          <div className="hidden sm:flex justify-between items-center mt-4">
            {steps.map((stepItem) => (
              <div key={stepItem.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    stepItem.id < step
                      ? "bg-primary text-primary-foreground"
                      : stepItem.id === step
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {stepItem.id < step ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepItem.id
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1",
                    stepItem.id === step
                      ? "text-primary font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {stepItem.title}
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
          <h3 className="text-lg font-medium">Profile Setup Complete!</h3>
          <p className="text-muted-foreground mt-2">
            Your profile has been set up successfully. You'll be redirected to
            your dashboard shortly.
          </p>

          <div className="mt-4 bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-medium text-left mb-2">Profile Summary</h4>
            <div className="space-y-3 text-sm text-left">
              <div>
                <p className="text-muted-foreground">Name:</p>
                <p className="font-medium">{form.getValues().name}</p>
              </div>
              {form.getValues().bio && (
                <div>
                  <p className="text-muted-foreground">Bio:</p>
                  <p className="font-medium">{form.getValues().bio}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Theme Preference:</p>
                <p className="font-medium capitalize">
                  {form.getValues().theme}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Email Frequency:</p>
                <p className="font-medium capitalize">
                  {form.getValues().emailFrequency}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <div ref={formRef} className="space-y-6">
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
                    {steps[0].icon}
                    Personal Information
                  </h3>
                  <Separator className="my-4" />

                  <PersonalInfoForm form={form} />
                </div>
              )}

              {/* Step 2: Profile Picture */}
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
                    {steps[1].icon}
                    Profile Picture
                  </h3>
                  <Separator className="my-4" />

                  <AvatarUploadForm form={form} />
                </div>
              )}

              {/* Step 3: Preferences */}
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
                    {steps[2].icon}
                    Preferences
                  </h3>
                  <Separator className="my-4" />

                  <PreferencesForm form={form} />
                </div>
              )}

              {/* Step 4: Notifications */}
              {step === 4 && (
                <div
                  className="space-y-4"
                  ref={step4Ref}
                  tabIndex={-1}
                  aria-labelledby="step4-heading"
                >
                  <h3
                    id="step4-heading"
                    className="text-lg font-medium flex items-center"
                  >
                    {steps[3].icon}
                    Notifications
                  </h3>
                  <Separator className="my-4" />

                  <NotificationsForm form={form} />
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

                <div className="flex gap-2">
                  {steps[step - 1].isOptional && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={skipStep}
                      className="flex items-center"
                    >
                      Skip
                    </Button>
                  )}

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      variant="default"
                      className="flex items-center"
                    >
                      Next
                      <ChevronRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={onFormSubmit}
                      disabled={isLoading}
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
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
