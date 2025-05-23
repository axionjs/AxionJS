"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Button } from "@/registry/default/ui/button";
import { useToast } from "@/registry/default/hooks/use-toast";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  attendeeType: z.enum(["individual", "student", "corporate"], {
    required_error: "Please select an attendee type",
  }),
  sessions: z
    .array(z.string())
    .min(1, { message: "Please select at least one session" }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const sessions = [
  {
    id: "keynote",
    title: "Opening Keynote",
    description: "The future of technology",
    time: "9:00 AM - 10:30 AM",
  },
  {
    id: "workshop-1",
    title: "Workshop: AI Fundamentals",
    description: "Learn the basics of artificial intelligence",
    time: "11:00 AM - 12:30 PM",
  },
  {
    id: "workshop-2",
    title: "Workshop: Cloud Computing",
    description: "Scaling your applications in the cloud",
    time: "2:00 PM - 3:30 PM",
  },
  {
    id: "panel",
    title: "Industry Panel Discussion",
    description: "Experts discuss emerging trends",
    time: "4:00 PM - 5:30 PM",
  },
];

interface EventRegistrationFormProps {
  /**
   * Optional callback that runs after successful form submission
   */
  onRegistrationSuccess?: (data: FormValues) => void;
  /**
   * Optional callback that runs if registration fails
   */
  onRegistrationError?: (error: unknown) => void;
  /**
   * Custom form action for server submission
   */
  formAction?: string;
  /**
   * Event date (displayed in the event details)
   */
  eventDate?: string;
  /**
   * Event location (displayed in the event details)
   */
  eventLocation?: string;
}

export default function EventRegistrationForm({
  onRegistrationSuccess,
  onRegistrationError,
  formAction,
  eventDate = "September 15-16, 2025",
  eventLocation = "Tech Convention Center, San Francisco",
}: EventRegistrationFormProps) {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      attendeeType: "individual",
      sessions: [],
      agreeTerms: false,
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await form.trigger(["name", "email", "phone"]);
      if (!isValid) return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      if (!formAction) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
      }
      setIsSubmitted(true);
      toast({
        title: "Registration successful!",
        description: "You've been registered for the event.",
      });
      if (onRegistrationSuccess) onRegistrationSuccess(data);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description:
          "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
      if (onRegistrationError) onRegistrationError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getPrice = () => {
    const attendeeType = form.watch("attendeeType");
    switch (attendeeType) {
      case "student":
        return "$149";
      case "corporate":
        return "$499";
      case "individual":
      default:
        return "$299";
    }
  };

  const resetForm = () => {
    form.reset();
    setStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-background text-foreground rounded-lg shadow-md">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center">
          {step === 1 && "Personal Information"}
          {step === 2 && "Event Details"}
          {isSubmitted && "Registration Complete"}
        </h1>
        <p className="text-center text-muted-foreground">
          {step === 1 && "Provide your contact information to register."}
          {step === 2 && "Select your attendee type and sessions."}
          {isSubmitted && "Thank you for registering for our event!"}
        </p>
      </div>

      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          action={formAction}
          noValidate
        >
          {step === 1 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name-input">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name-input"
                        placeholder="John Doe"
                        {...field}
                        autoComplete="name"
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
                    <FormLabel htmlFor="email-input">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email-input"
                        placeholder="name@example.com"
                        type="email"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone-input">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id="phone-input"
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                        {...field}
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button onClick={nextStep} variant="default">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="attendeeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attendee Type</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <RadioGroupItem
                        value="individual"
                        label="Individual ($299)"
                      />
                      <RadioGroupItem value="student" label="Student ($149)" />
                      <RadioGroupItem
                        value="corporate"
                        label="Corporate ($499)"
                      />
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessions"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Sessions</FormLabel>
                    <div className="space-y-2">
                      {sessions.map((session) => (
                        <Checkbox
                          key={session.id}
                          id={`session-${session.id}`}
                          label={`${session.title} (${session.time})`}
                          value={session.id}
                          onCheckedChange={(checked) => {
                            const currentSessions = form.getValues("sessions");
                            form.setValue(
                              "sessions",
                              checked
                                ? [...currentSessions, session.id]
                                : currentSessions.filter(
                                    (id) => id !== session.id,
                                  ),
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem>
                    <Checkbox
                      id="agree-terms"
                      label="I agree to the terms and conditions"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button onClick={prevStep} variant="outline">
                  Back
                </Button>
                <Button type="submit" variant="default" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Complete Registration"}
                </Button>
              </div>
            </div>
          )}

          {isSubmitted && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold">Registration Complete</h2>
              <p className="text-muted-foreground">
                Thank you for registering! A confirmation email has been sent to{" "}
                {form.getValues("email")}.
              </p>
              <Button onClick={resetForm} variant="default">
                Register Another Attendee
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
