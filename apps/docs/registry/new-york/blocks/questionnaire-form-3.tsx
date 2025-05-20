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
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { useToast } from "@/lib/use-toast";
import { Checkbox } from "@/registry/new-york/ui/checkbox";

const formSchema = z.object({
  experience: z.enum(["excellent", "good", "average", "poor", "terrible"], {
    required_error: "Please rate your experience",
  }),
  recommendation: z.enum(
    ["definitely", "probably", "not-sure", "probably-not", "definitely-not"],
    {
      required_error: "Please select how likely you are to recommend us",
    }
  ),
  improvements: z.array(z.string()).optional(),
  comments: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const improvementOptions = [
  { id: "user-interface", label: "User Interface" },
  { id: "performance", label: "Performance" },
  { id: "features", label: "Features" },
  { id: "customer-support", label: "Customer Support" },
  { id: "pricing", label: "Pricing" },
  { id: "documentation", label: "Documentation" },
];

export default function QuestionnaireForm3() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: undefined,
      recommendation: undefined,
      improvements: [],
      comments: "",
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
    setIsSubmitted(true);

    toast({
      title: "Survey submitted!",
      description: "Thank you for completing our survey.",
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-8">
        {isSubmitted ? (
          <div className="text-center space-y-4 py-6">
            <div className="rounded-full w-16 h-16 bg-primary/20 mx-auto flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your feedback is invaluable to us and helps us improve our
              products and services.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
            >
              Submit Another Response
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold">
                Customer Satisfaction Survey
              </h2>
              <p className="text-muted-foreground">
                Please take a moment to share your thoughts with us
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    How would you rate your overall experience?
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {["terrible", "poor", "average", "good", "excellent"].map(
                      (value) => (
                        <FormField
                          key={value}
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-center space-y-2">
                              <FormControl>
                                <button
                                  type="button"
                                  className={`w-full h-12 rounded-md flex items-center justify-center ${
                                    field.value === value
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-background hover:bg-muted"
                                  }`}
                                  onClick={() => field.onChange(value)}
                                >
                                  {value === "excellent" && "😁"}
                                  {value === "good" && "🙂"}
                                  {value === "average" && "😐"}
                                  {value === "poor" && "🙁"}
                                  {value === "terrible" && "😞"}
                                </button>
                              </FormControl>
                              <FormLabel className="text-xs capitalize">
                                {value}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      )
                    )}
                  </div>
                  <FormMessage className="text-center">
                    {form.formState.errors.experience?.message}
                  </FormMessage>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    How likely are you to recommend us to others?
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { value: "definitely-not", label: "Definitely Not" },
                      { value: "probably-not", label: "Probably Not" },
                      { value: "not-sure", label: "Not Sure" },
                      { value: "probably", label: "Probably" },
                      { value: "definitely", label: "Definitely" },
                    ].map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="recommendation"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-center space-y-2">
                            <FormControl>
                              <button
                                type="button"
                                className={`w-full h-12 rounded-md flex items-center justify-center ${
                                  field.value === option.value
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background hover:bg-muted"
                                }`}
                                onClick={() => field.onChange(option.value)}
                              >
                                {option.value === "definitely" && "5"}
                                {option.value === "probably" && "4"}
                                {option.value === "not-sure" && "3"}
                                {option.value === "probably-not" && "2"}
                                {option.value === "definitely-not" && "1"}
                              </button>
                            </FormControl>
                            <FormLabel className="text-xs text-center">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-center">
                    {form.formState.errors.recommendation?.message}
                  </FormMessage>
                </div>

                <FormField
                  control={form.control}
                  name="improvements"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-lg font-medium">
                          What areas could we improve?
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Select all that apply
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {improvementOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="improvements"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              option.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              ) || []
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Additional Comments
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share any additional thoughts or suggestions..."
                          className="resize-none min-h-[120px] bg-background/80 backdrop-blur-sm"
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
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="For follow-up questions (optional)"
                          className="bg-background/80 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                  variant="gooeyLeft"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Survey"
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
