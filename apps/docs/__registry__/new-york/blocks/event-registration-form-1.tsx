"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { Badge } from "@/registry/new-york/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

// Define registration form validation schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  ticketType: z.enum(["standard", "vip", "premium"], {
    required_error: "Please select a ticket type",
  }),
  dietaryRequirements: z.string().optional(),
  marketingEmails: z.boolean().optional(),
  companyName: z.string().optional(),
  specialRequests: z.string().optional(),
  emergencyContact: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Define ticket types with additional information
interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
}

const defaultTickets: TicketType[] = [
  {
    id: "standard",
    name: "Standard Ticket",
    description: "Access to all sessions and workshops",
    price: 99,
    features: ["All sessions", "Workshop access", "Event app access"],
  },
  {
    id: "premium",
    name: "Premium Ticket",
    description: "Standard + lunch and networking event",
    price: 199,
    features: [
      "All sessions",
      "Workshop access",
      "Event app access",
      "Lunch included",
      "Networking event",
    ],
    badge: {
      text: "Popular",
      variant: "default",
    },
  },
  {
    id: "vip",
    name: "VIP Ticket",
    description: "Premium + exclusive Q&A session with speakers",
    price: 299,
    features: [
      "All sessions",
      "Workshop access",
      "Event app access",
      "Lunch included",
      "Networking event",
      "Exclusive Q&A session",
      "VIP lounge access",
    ],
    badge: {
      text: "Best Value",
      variant: "secondary",
    },
  },
];

// Define dietary requirements options
const dietaryOptions = [
  { value: "none", label: "None" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "other", label: "Other (please specify)" },
];

interface EventRegistrationFormProps {
  /**
   * Function to handle form submission
   */
  onRegister?: (values: FormValues) => Promise<void>;
  /**
   * URL to redirect to after successful registration
   */
  redirectTo?: string;
  /**
   * Custom form action for server-side form processing
   */
  formAction?: string;
  /**
   * Available ticket types
   */
  ticketTypes?: TicketType[];
  /**
   * Event date string
   */
  eventDate?: string;
  /**
   * Event location
   */
  eventLocation?: string;
  /**
   * Max number of attendees
   */
  maxAttendees?: number;
  /**
   * Currency symbol for ticket prices
   */
  currencySymbol?: string;
  /**
   * Whether to show additional fields
   */
  showAdditionalFields?: boolean;
  /**
   * Whether to show dietary requirements field
   */
  showDietaryRequirements?: boolean;
  /**
   * Custom CSS class name
   */
  className?: string;
}

export default function EventRegistrationForm({
  onRegister,
  redirectTo,
  formAction,
  ticketTypes = defaultTickets,
  eventDate = "April 15-16, 2025",
  eventLocation = "Tech Convention Center, San Francisco, CA",
  maxAttendees = 500,
  currencySymbol = "$",
  showAdditionalFields = false,
  showDietaryRequirements = true,
  className,
}: EventRegistrationFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      ticketType: undefined,
      dietaryRequirements: "",
      marketingEmails: false,
      companyName: "",
      specialRequests: "",
      emergencyContact: "",
    },
    mode: "onBlur",
  });

  // Get the selected ticket type
  const selectedTicketType = form.watch("ticketType");

  // Get the selected ticket details
  const selectedTicket = React.useMemo(() => {
    if (!selectedTicketType) return null;
    return (
      ticketTypes.find((ticket) => ticket.id === selectedTicketType) || null
    );
  }, [selectedTicketType, ticketTypes]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount}`;
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);

      // Use provided callback or simulate API call
      if (onRegister) {
        await onRegister(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Registration data:", data);
      }

      setIsSubmitted(true);

      toast({
        title: "Registration successful!",
        description: "You've been registered for the event.",
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
      console.error("Registration error:", error);

      toast({
        title: "Registration failed",
        description:
          "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto shadow-lg", className)}>
      <CardHeader className="space-y-1 md:relative flex flex-col items-start">
        <CardTitle className="text-2xl font-bold">Event Registration</CardTitle>
        <CardDescription>
          Register for our upcoming event on {eventDate}
        </CardDescription>

        {/* Capacity indicator */}
        <div className="md:absolute top-5 right-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>Limited Capacity</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Only {maxAttendees} spots available</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      {isSubmitted ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="alert"
          aria-live="polite"
          className="p-6 space-y-4 flex flex-col items-center text-center"
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold">Registration Confirmed!</h2>
          <p className="text-muted-foreground">
            Thank you for registering for our event. We've sent a confirmation
            email to {form.getValues().email} with all the details.
          </p>

          <div className="mt-4 w-full max-w-md p-4 border rounded-md bg-muted/50">
            <div className="text-left">
              <p className="font-medium mb-2">Registration Details:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {form.getValues().firstName} {form.getValues().lastName}
                </li>
                <li>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {form.getValues().email}
                </li>
                <li>
                  <span className="text-muted-foreground">Ticket Type:</span>{" "}
                  {
                    ticketTypes.find(
                      (t) => t.id === form.getValues().ticketType,
                    )?.name
                  }
                </li>
                {form.getValues().dietaryRequirements && (
                  <li>
                    <span className="text-muted-foreground">
                      Dietary Requirements:
                    </span>{" "}
                    {
                      dietaryOptions.find(
                        (o) => o.value === form.getValues().dietaryRequirements,
                      )?.label
                    }
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              variant="outline"
            >
              Register Another Attendee
            </Button>

            <Button
              onClick={() => {
                if (redirectTo) {
                  window.location.href = redirectTo;
                } else {
                  window.location.href = "/";
                }
              }}
            >
              View Event Details
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            action={formAction}
            noValidate
          >
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="firstName-input">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="firstName-input"
                          placeholder="John"
                          {...field}
                          autoComplete="given-name"
                          aria-required="true"
                        />
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
                      <FormLabel htmlFor="lastName-input">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName-input"
                          placeholder="Doe"
                          {...field}
                          autoComplete="family-name"
                          aria-required="true"
                        />
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
                    <FormLabel htmlFor="email-input">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email-input"
                        placeholder="name@example.com"
                        {...field}
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showAdditionalFields && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="company-input">
                          Company (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="company-input"
                            placeholder="Company name"
                            {...field}
                            autoComplete="organization"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="emergency-input">
                          Emergency Contact (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="emergency-input"
                            placeholder="Contact name and phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide a contact in case of emergency
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="ticketType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel id="ticket-type-label">Ticket Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                        aria-labelledby="ticket-type-label"
                      >
                        {ticketTypes.map((ticket) => (
                          <FormItem
                            key={ticket.id}
                            className={cn(
                              "flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors",
                              field.value === ticket.id &&
                                "border-primary bg-primary/5",
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={ticket.id}
                                id={`ticket-${ticket.id}`}
                                className="mt-1"
                              />
                            </FormControl>
                            <div className="w-full space-y-1">
                              <div className="flex items-center justify-between">
                                <FormLabel
                                  htmlFor={`ticket-${ticket.id}`}
                                  className="text-base font-medium cursor-pointer"
                                >
                                  {ticket.name}
                                  {ticket.badge && (
                                    <Badge
                                      variant={ticket.badge.variant}
                                      className="ml-2"
                                    >
                                      {ticket.badge.text}
                                    </Badge>
                                  )}
                                </FormLabel>
                                <div className="font-medium text-lg">
                                  {formatCurrency(ticket.price)}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {ticket.description}
                              </p>
                              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                {ticket.features.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="text-xs flex items-center"
                                  >
                                    <CheckCircle2
                                      className="h-3 w-3 mr-2 text-primary"
                                      aria-hidden="true"
                                    />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showDietaryRequirements && (
                <FormField
                  control={form.control}
                  name="dietaryRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="dietary-select">
                        Dietary Requirements
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="dietary-select">
                            <SelectValue placeholder="Select dietary requirements" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dietaryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {showAdditionalFields && (
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="special-requests">
                        Special Requests (Optional)
                      </FormLabel>
                      <FormControl>
                        <textarea
                          id="special-requests"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Any additional requests or accommodations"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="marketing-checkbox"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel
                        htmlFor="marketing-checkbox"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Marketing Communications
                      </FormLabel>
                      <FormDescription>
                        Receive emails about future events and promotions
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Event information summary */}
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <h3 className="text-sm font-medium">Event Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Calendar
                      className="h-4 w-4 text-primary mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium">Date and Time</p>
                      <p className="text-muted-foreground">{eventDate}</p>
                      <p className="text-muted-foreground">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin
                      className="h-4 w-4 text-primary mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{eventLocation}</p>
                    </div>
                  </div>
                </div>

                {selectedTicket && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">
                        Selected Ticket: {selectedTicket.name}
                      </div>
                      <div className="font-bold text-lg">
                        {formatCurrency(selectedTicket.price)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
                    <span>Processing...</span>
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </Card>
  );
}
