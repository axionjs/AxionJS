"use client";

import { useActionState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import {
  createAndSendCampaign,
  type CampaignFormState,
} from "@/registry/default/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";
import { Loader2, CheckCircle, Send } from "lucide-react";

const initialState: CampaignFormState = {};

export function NewsletterCampaignForm() {
  const [state, formAction, isPending] = useActionState(
    createAndSendCampaign,
    initialState,
  );

  return (
    <div className="space-y-6">
      {state.success ? (
        <Alert className="bg-primary/10 border-primary/20">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Send Another Newsletter
          </Button>
        </Alert>
      ) : (
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-base">
              Subject Line
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Enter newsletter subject"
              className="h-12"
              required
            />
            {state.errors?.subject && (
              <p className="text-sm text-destructive">
                {state.errors.subject[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-base">
              Newsletter Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter your newsletter content here. HTML is supported."
              className="min-h-[300px] resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              You can use HTML tags for formatting. For example: &lt;h1&gt;,
              &lt;p&gt;, &lt;a href="..."&gt;, etc.
            </p>
            {state.errors?.content && (
              <p className="text-sm text-destructive">
                {state.errors.content[0]}
              </p>
            )}
          </div>

          {state.message && !state.success && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="h-12 px-8 text-base transition-all duration-200 group"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Newsletter...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Newsletter
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
