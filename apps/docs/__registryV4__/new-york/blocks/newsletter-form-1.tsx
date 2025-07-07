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
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { useToast } from "@/registry/new-york/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewsletterForm1() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);

    toast({
      title: "Subscription successful!",
      description: "You've been added to our newsletter.",
    });

    form.reset();
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center space-y-2 mb-4">
        <h2 className="text-2xl font-bold">Subscribe to our newsletter</h2>
        <p className="text-muted-foreground">
          Get the latest updates and news delivered to your inbox
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="name@example.com"
                      className="flex-1"
                      {...field}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      variant="ringHover"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
