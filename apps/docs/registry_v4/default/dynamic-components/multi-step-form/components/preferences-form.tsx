"use client";
import type { UseFormReturn } from "react-hook-form";
import { Switch } from "@/registry/default/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OnboardingFormValues } from "@/registry/default/dynamic-components/multi-step-form/components/onboarding-wizard";

interface PreferencesFormProps {
  form: UseFormReturn<OnboardingFormValues>;
}

export function PreferencesForm({ form }: PreferencesFormProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="theme"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Theme Preference</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme preference" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Choose how the application should appear.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="emailFrequency"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel id="email-frequency-label">
              Email Digest Frequency
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
                aria-labelledby="email-frequency-label"
              >
                {[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                  { value: "never", label: "Never" },
                ].map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <FormControl>
                      <RadioGroupItem
                        value={option.value}
                        id={`frequency-${option.value}`}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={`frequency-${option.value}`}
                      className="font-normal cursor-pointer flex-1"
                    >
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="marketingEmails"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Marketing emails</FormLabel>
              <FormDescription>
                Receive emails about new features and special offers.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
