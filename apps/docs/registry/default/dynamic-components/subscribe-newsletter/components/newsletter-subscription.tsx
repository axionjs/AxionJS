"use client";

import { useActionState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  subscribeToNewsletter,
  type SubscribeFormState,
} from "@/registry/default/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";

const initialState: SubscribeFormState = {};

export default function NewsletterSubscription() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stay Updated
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Subscribe to our newsletter to receive the latest updates and
              exclusive offers.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[500px] mt-8">
          {state.success ? (
            <Alert className="bg-primary/10 border-primary/20">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Name (Optional)
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="h-12 bg-background border-muted-foreground/20 focus-visible:ring-offset-0"
                />
                {state.errors?.name && (
                  <p className="text-sm text-destructive">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="h-12 bg-background border-muted-foreground/20 focus-visible:ring-offset-0"
                />
                {state.errors?.email && (
                  <p className="text-sm text-destructive">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
              {state.message && !state.success && (
                <Alert variant="destructive">
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  className="h-12 px-8 text-base transition-all duration-200 group w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Subscribe to Newsletter
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
