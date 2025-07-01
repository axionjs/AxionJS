"use client";

import React, { useState, useId, useTransition, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Switch } from "@/registry/new-york/ui/switch";
import { TagInput } from "@/registry/new-york/ui/tag-input";
import { Label } from "@/registry/new-york/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Separator } from "@/registry/new-york/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";

// Basic login form example
export function BasicLoginForm() {
  const formSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required.")
      .email("Please enter a valid email address."),
    password: z.string().nonempty("Password is required."),
    rememberMe: z.boolean().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { handleSubmit, control, formState } = formMethods;
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Login form submitted successfully!");
  };

  return (
    <div className="not-prose">
      <Form {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 p-4 max-w-md rounded-lg border shadow-sm"
          aria-labelledby="login-form"
        >
          <div className="text-xl font-semibold">Login</div>
          <Separator className="my-2" />

          {/* Email Field */}
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" required type="email" />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            name="password"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} id="password" required type="password" />
                </FormControl>
                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Remember Me Checkbox */}
          <FormField
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="rememberMe"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="rememberMe">Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

// Registration form with password requirements
export function RegistrationForm() {
  const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character."
    );

  const formSchema = z
    .object({
      name: z
        .string()
        .nonempty("Name is required.")
        .min(2, "Name must be at least 2 characters."),
      email: z
        .string()
        .nonempty("Email is required.")
        .email("Please enter a valid email address."),
      password: passwordSchema,
      confirmPassword: z.string().nonempty("Please confirm your password."),
      terms: z.literal(true, {
        errorMap: () => ({
          message: "You must accept the terms and conditions.",
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof formSchema>;

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  const { handleSubmit, control, formState, watch } = formMethods;
  const { errors, isValid, isDirty } = formState;

  const password = watch("password");
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Registration form submitted successfully!");
  };

  return (
    <div className="not-prose">
      <Form {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 max-w-md rounded-lg border shadow-sm"
          aria-labelledby="registration-form"
        >
          <div className="text-xl font-semibold">Create Account</div>
          <Separator className="my-2" />

          {/* Name Field */}
          <FormField
            name="name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormControl>
                  <Input {...field} id="name" required />
                </FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" required type="email" />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            name="password"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} id="password" required type="password" />
                </FormControl>
                <div className="mt-2 space-y-1">
                  <div className="text-xs">Password requirements:</div>
                  <ul className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                    <li
                      className={`flex items-center gap-1 ${hasMinLength ? "text-green-500" : ""}`}
                    >
                      {hasMinLength ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      8+ characters
                    </li>
                    <li
                      className={`flex items-center gap-1 ${hasUppercase ? "text-green-500" : ""}`}
                    >
                      {hasUppercase ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      Uppercase letter
                    </li>
                    <li
                      className={`flex items-center gap-1 ${hasLowercase ? "text-green-500" : ""}`}
                    >
                      {hasLowercase ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      Lowercase letter
                    </li>
                    <li
                      className={`flex items-center gap-1 ${hasNumber ? "text-green-500" : ""}`}
                    >
                      {hasNumber ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      Number
                    </li>
                    <li
                      className={`flex items-center gap-1 ${hasSpecial ? "text-green-500" : ""}`}
                    >
                      {hasSpecial ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      Special character
                    </li>
                  </ul>
                </div>
                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="confirmPassword"
                    required
                    type="password"
                  />
                </FormControl>
                <FormMessage>{errors.confirmPassword?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Terms Checkbox */}
          <FormField
            name="terms"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="terms">
                    I accept the{" "}
                    <a href="#" className="text-primary underline">
                      terms and conditions
                    </a>
                  </FormLabel>
                  <FormMessage>{errors.terms?.message}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isDirty || !isValid}
          >
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}

// Custom Tag Input Field Example
export function TagInputForm() {
  const id = useId();
  const formSchema = z.object({
    interests: z
      .array(z.object({ id: z.string(), text: z.string() }))
      .min(1, "Please add at least one interest.")
      .max(5, "You can only add up to 5 interests."),
  });

  type FormData = z.infer<typeof formSchema>;

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
    },
  });

  const { handleSubmit, control, formState, watch } = formMethods;
  const { errors } = formState;

  const interests = watch("interests");
  const maxTags = 5;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Tag input form submitted successfully!");
  };

  return (
    <div className="not-prose">
      <Form {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 max-w-md rounded-lg border shadow-sm"
          aria-labelledby="tag-input-form"
        >
          <div className="text-xl font-semibold">Interest Tags</div>
          <Separator className="my-2" />

          <FormField
            name="interests"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={id}>Your Interests</FormLabel>
                <FormDescription>
                  Add up to 5 tags representing your interests.
                </FormDescription>
                <FormControl>
                  <TagInput
                    id={id}
                    tags={field.value}
                    setTags={(newTags) => {
                      if (newTags.length <= maxTags) {
                        field.onChange(newTags);
                      }
                    }}
                    placeholder="Add an interest (Max 5)"
                    clearAll={() => field.onChange([])}
                    styleClasses={{
                      inlineTagsContainer:
                        "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
                      input:
                        "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                      tag: {
                        body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                        closeButton:
                          "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                      },
                    }}
                  />
                </FormControl>
                <div className="flex items-center justify-between">
                  <FormMessage>{errors.interests?.message}</FormMessage>
                  <p className="text-sm text-muted-foreground">
                    {field.value.length}/{maxTags} tags
                  </p>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={interests.length === 0}
          >
            Save Interests
          </Button>
        </form>
      </Form>
    </div>
  );
}

// Mock server action for the progressive form submission
async function createUserProfile(formData: FormData) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        id: Math.random().toString(36).substring(2, 9),
      });
    }, 2000);
  });
}

// Multi-step form with saving state example
export function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [savedData, setSavedData] = useState<Record<string, any>>({});

  // Define schema for each step
  const personalInfoSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().optional(),
  });

  const addressSchema = z.object({
    streetAddress: z.string().min(5, "Please enter a valid street address."),
    city: z.string().min(2, "City is required."),
    state: z.string().min(2, "State is required."),
    zipCode: z.string().min(5, "Please enter a valid zip code."),
  });

  const preferencesSchema = z.object({
    notificationEmail: z.boolean().optional(),
    notificationSMS: z.boolean().optional(),
    theme: z.enum(["light", "dark", "system"]),
    marketingOptIn: z.boolean().optional(),
  });

  // Use separate form handlers for each step
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: savedData.personalInfo || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: savedData.address || {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: savedData.preferences || {
      notificationEmail: true,
      notificationSMS: false,
      theme: "system",
      marketingOptIn: false,
    },
  });

  // Effect to load saved form data if it exists
  useEffect(() => {
    if (Object.keys(savedData).length > 0) {
      if (savedData.personalInfo) {
        personalInfoForm.reset(savedData.personalInfo);
      }
      if (savedData.address) {
        addressForm.reset(savedData.address);
      }
      if (savedData.preferences) {
        preferencesForm.reset(savedData.preferences);
      }
    }
  }, [savedData]);

  // Handle step transitions
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle form submissions for each step
  const handleStepOneSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    setSavedData((prev) => ({
      ...prev,
      personalInfo: data,
    }));
    localStorage.setItem("step1Data", JSON.stringify(data));
    handleNextStep();
  };

  const handleStepTwoSubmit = (data: z.infer<typeof addressSchema>) => {
    setSavedData((prev) => ({
      ...prev,
      address: data,
    }));
    localStorage.setItem("step2Data", JSON.stringify(data));
    handleNextStep();
  };

  const handleFinalSubmit = (data: z.infer<typeof preferencesSchema>) => {
    setFormStatus("submitting");

    // Combine all data
    const formData = new FormData();
    const completeData = {
      ...savedData.personalInfo,
      ...savedData.address,
      ...data,
    };

    // Add all data to FormData (for server action)
    Object.entries(completeData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(async () => {
      try {
        // Simulate server action submission
        const result = await createUserProfile(formData);
        setFormStatus("success");
        setSavedData((prev) => ({
          ...prev,
          preferences: data,
        }));
        localStorage.setItem("step3Data", JSON.stringify(data));
        // On success, store the completed status
        localStorage.setItem("formCompleted", "true");
      } catch (error) {
        setFormStatus("error");
        console.error("Error submitting form:", error);
      }
    });
  };

  // Load saved data on first render
  useEffect(() => {
    const step1Data = localStorage.getItem("step1Data");
    const step2Data = localStorage.getItem("step2Data");
    const step3Data = localStorage.getItem("step3Data");
    const formCompleted = localStorage.getItem("formCompleted");

    const savedState: Record<string, any> = {};

    if (step1Data) {
      savedState.personalInfo = JSON.parse(step1Data);
    }

    if (step2Data) {
      savedState.address = JSON.parse(step2Data);
    }

    if (step3Data) {
      savedState.preferences = JSON.parse(step3Data);
    }

    if (Object.keys(savedState).length > 0) {
      setSavedData(savedState);
    }

    if (formCompleted === "true") {
      setFormStatus("success");
    }
  }, []);

  // Reset the entire form and local storage
  const resetForm = () => {
    localStorage.removeItem("step1Data");
    localStorage.removeItem("step2Data");
    localStorage.removeItem("step3Data");
    localStorage.removeItem("formCompleted");
    setSavedData({});
    personalInfoForm.reset();
    addressForm.reset();
    preferencesForm.reset();
    setStep(1);
    setFormStatus("idle");
  };

  return (
    <div className="not-prose w-full max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Multi-step Form with Progress Saving</CardTitle>
          <CardDescription>
            Complete your profile in three simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStatus === "success" ? (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="text-xl font-medium">
                Profile Created Successfully!
              </h3>
              <p className="text-muted-foreground">
                Your profile has been created and all information has been
                saved.
              </p>
              <Button onClick={resetForm} className="mt-4">
                Reset Form
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="text-center">
                      <div
                        className={`size-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                          s === step
                            ? "bg-primary text-primary-foreground"
                            : s < step
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {s}
                      </div>
                      <div className="text-xs">
                        {s === 1
                          ? "Personal"
                          : s === 2
                            ? "Address"
                            : "Preferences"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                {step === 1 && (
                  <Form {...personalInfoForm}>
                    <form
                      onSubmit={personalInfoForm.handleSubmit(
                        handleStepOneSubmit
                      )}
                      className="space-y-4"
                    >
                      <FormField
                        control={personalInfoForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalInfoForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="john.doe@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="(555) 123-4567" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end pt-4">
                        <Button type="submit">Continue</Button>
                      </div>
                    </form>
                  </Form>
                )}

                {step === 2 && (
                  <Form {...addressForm}>
                    <form
                      onSubmit={addressForm.handleSubmit(handleStepTwoSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={addressForm.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123 Main St" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="San Francisco" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="CA" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addressForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="94103" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                        >
                          Back
                        </Button>
                        <Button type="submit">Continue</Button>
                      </div>
                    </form>
                  </Form>
                )}

                {step === 3 && (
                  <Form {...preferencesForm}>
                    <form
                      onSubmit={preferencesForm.handleSubmit(handleFinalSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={preferencesForm.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Theme</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Notification Preferences
                        </h3>

                        <FormField
                          control={preferencesForm.control}
                          name="notificationEmail"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={preferencesForm.control}
                          name="notificationSMS"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  SMS Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications via text message
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={preferencesForm.control}
                        name="marketingOptIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Subscribe to marketing emails
                              </FormLabel>
                              <FormDescription>
                                We'll send you news and updates about our
                                products and services.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isPending || formStatus === "submitting"}
                        >
                          {isPending || formStatus === "submitting" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Complete Profile"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 text-xs text-muted-foreground">
          <div>Your progress is automatically saved</div>
          {Object.keys(savedData).length > 0 && formStatus !== "success" && (
            <Button variant="ghost" size="sm" onClick={resetForm}>
              Reset Form
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

// Server action simulation (for server action ready form)
async function submitContactForm(data: FormData) {
  // Simulate a server delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Example validation that might happen on the server
  const email = data.get("email") as string;
  if (!email.includes("@")) {
    return {
      error: true,
      message: "Invalid email address provided",
    };
  }

  return {
    success: true,
    message: "Your message has been received. We'll get back to you shortly.",
  };
}

// Server-action ready form example
export function ServerActionForm() {
  // Form state
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"idle" | "error" | "success">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState<string>("");

  // Form schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    subject: z.string().min(5, "Subject must be at least 5 characters."),
    message: z.string().min(10, "Message must be at least 10 characters."),
  });

  type FormData = z.infer<typeof formSchema>;

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { handleSubmit, control, reset } = formMethods;

  // Client-side validation before server action
  const onSubmit = (data: FormData) => {
    // Convert to FormData for server action
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call server action
    startTransition(async () => {
      try {
        const result = await submitContactForm(formData);

        if (result.error) {
          setFormStatus("error");
          setServerMessage(result.message);
        } else {
          setFormStatus("success");
          setServerMessage(result.message);
          reset(); // Reset form on success
        }
      } catch (error) {
        setFormStatus("error");
        setServerMessage(
          "An unexpected error occurred. Please try again later."
        );
        console.error("Form submission error:", error);
      }
    });
  };

  return (
    <div className="not-prose">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {formStatus === "success" ? (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="text-xl font-medium">Message Sent!</h3>
              <p className="text-muted-foreground">{serverMessage}</p>
              <Button
                onClick={() => {
                  setFormStatus("idle");
                  setServerMessage("");
                }}
                className="mt-4"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <Form {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[120px]"
                          placeholder="Your message here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {formStatus === "error" && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 inline-block mr-2" />
                    {serverMessage}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Main component that contains all examples
export default function FormPreview() {
  return (
    <div className="space-y-16 py-4">
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="tags">Tag Input</TabsTrigger>
          <TabsTrigger value="multi">Multi-step</TabsTrigger>
          <TabsTrigger value="server">Server Action</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="basic">
            <BasicLoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegistrationForm />
          </TabsContent>
          <TabsContent value="tags">
            <TagInputForm />
          </TabsContent>
          <TabsContent value="multi">
            <MultiStepForm />
          </TabsContent>
          <TabsContent value="server">
            <ServerActionForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
