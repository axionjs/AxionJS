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
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Checkbox id="checkbox-1" />
        <Label htmlFor="checkbox-1">Default Checkbox</Label>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox id="checkbox-2" disabled />
        <Label htmlFor="checkbox-2" className="text-muted-foreground">
          Disabled Checkbox
        </Label>
      </div>
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
      className="space-y-6 max-w-md"
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
