"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { UserIcon, FileText } from "lucide-react";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import type { OnboardingFormValues } from "@/registry/default/dynamic-components/multi-step-form/components/onboarding-wizard";

interface PersonalInfoFormProps {
  form: UseFormReturn<OnboardingFormValues>;
}

export function PersonalInfoForm({ form }: PersonalInfoFormProps) {
  const nameId = React.useId();
  const bioId = React.useId();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={nameId}>Full Name</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  id={nameId}
                  placeholder="John Doe"
                  className="peer ps-9"
                  {...field}
                  autoComplete="name"
                  aria-required="true"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <UserIcon size={16} aria-hidden="true" />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={bioId}>Bio</FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  id={bioId}
                  placeholder="Tell us a bit about yourself"
                  className="resize-none min-h-[120px] ps-9 pt-8"
                  {...field}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute top-3 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <FileText size={16} aria-hidden="true" />
                </div>
              </div>
            </FormControl>
            <FormDescription>
              This will be displayed on your profile
            </FormDescription>
            <FormMessage />
            <div className="text-xs text-right text-muted-foreground mt-1">
              {field.value?.length || 0}/500 characters
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
