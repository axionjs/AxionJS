"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/registry/new-york/ui/form";

// Simple Checkbox Preview
export function SimpleCheckboxPreview() {
  return (
    <div className="flex flex-col gap-6 not-prose">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="terms-2" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="terms-2">Accept terms and conditions</Label>
          <p className="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="toggle" disabled />
        <Label htmlFor="toggle">Enable notifications</Label>
      </div>
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    </div>
  );
}

// Form with Checkbox Preview
export function FormCheckboxPreview() {
  const schema = z.object({
    preferences: z
      .array(z.string())
      .min(1, "Please select at least one preference."),
  });

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      preferences: [],
    },
  });

  const { control, handleSubmit, formState } = formMethods;
  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <Form
      {...formMethods}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md not-prose"
      aria-labelledby="form-with-checkbox"
    >
      {/* Preferences */}
      <FormField
        name="preferences"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferences</FormLabel>
            <div className="space-y-3">
              {["Option 1", "Option 2", "Option 3"].map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <Controller
                    name="preferences"
                    control={control}
                    render={({ field: checkboxField }) => (
                      <Checkbox
                        id={option}
                        checked={checkboxField.value.includes(option)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...checkboxField.value, option]
                            : checkboxField.value.filter(
                                (item: string) => item !== option
                              );
                          checkboxField.onChange(updatedValue);
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </div>
            <FormMessage>{errors.preferences?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <Button type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}
