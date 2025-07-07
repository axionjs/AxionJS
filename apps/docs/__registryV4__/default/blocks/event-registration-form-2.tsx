"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Calendar, MapPin, Clock, Users } from "lucide-react";

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
import { Textarea } from "@/registry/default/ui/textarea";
import { useToast } from "@/lib/use-toast";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Separator } from "@/registry/default/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  specialRequirements: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EventRegistrationForm2() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      jobTitle: "",
      specialRequirements: "",
      agreeTerms: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);

    toast({
      title: "Registration successful!",
      description: "You've been registered for the event.",
    });

    form.reset();
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
      {/* Event details */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Tech Conference 2025</h2>
          <p className="text-muted-foreground mt-1">
            Join us for the biggest tech event of the year
          </p>
        </div>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=300&width=500"
            alt="Event banner"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">April 15-16, 2025</p>
              <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Tech Convention Center</p>
              <p className="text-sm text-muted-foreground">
                123 Innovation Blvd, San Francisco, CA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">2 Full Days</p>
              <p className="text-sm text-muted-foreground">
                Over 50 sessions and workshops
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Limited Capacity</p>
              <p className="text-sm text-muted-foreground">
                Only 500 spots available
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">Ticket includes:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Access to all keynotes and sessions
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Lunch and refreshments
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Networking opportunities
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Conference materials
            </li>
          </ul>
        </div>
      </div>

      {/* Registration form */}
      <div className="md:col-span-3 p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6">Register for the event</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dietary restrictions, accessibility needs, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">Total</div>
              <div className="text-lg font-bold">$299.00</div>
            </div>

            <FormField
              control={form.control}
              name="agreeTerms"
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
                      I agree to the event terms and conditions
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="linkHover"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
