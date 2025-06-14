"use client";
import type { UseFormReturn } from "react-hook-form";
import { Switch } from "@/registry/default/ui/switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/registry/default/ui/form";
import type { OnboardingFormValues } from "@/registry/default/dynamic-components/multi-step-form/components/onboarding-wizard";

interface NotificationsFormProps {
  form: UseFormReturn<OnboardingFormValues>;
}

export function NotificationsForm({ form }: NotificationsFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="emailNotifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Email Notifications</FormLabel>
              <FormDescription>
                Receive notifications via email.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pushNotifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Push Notifications</FormLabel>
              <FormDescription>
                Receive notifications on your device.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="activitySummary"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Activity Summary</FormLabel>
              <FormDescription>
                Receive weekly summaries of your activity.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="newFeatures"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>New Features</FormLabel>
              <FormDescription>
                Be the first to know about new features.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="securityAlerts"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Security Alerts</FormLabel>
              <FormDescription>
                Receive alerts about security issues.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
