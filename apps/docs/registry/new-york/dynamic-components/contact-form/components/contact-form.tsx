"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form";

import { Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { useContactForm } from "@/registry/new-york/dynamic-components/contact-form/hooks/use-contact-form";

export default function ContactForm() {
  const { form, onSubmit, isPending, isSuccess } = useContactForm();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[800px] mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="h-12 bg-background border-muted-foreground/20 focus-visible:ring-offset-0"
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
                      <FormLabel className="text-base">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          className="h-12 bg-background border-muted-foreground/20 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can we help you?"
                        className="min-h-[150px] resize-none bg-background border-muted-foreground/20 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  className="h-12 px-8 text-base transition-all duration-200 group"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Sent Successfully
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
