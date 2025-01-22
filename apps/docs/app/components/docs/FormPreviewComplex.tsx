"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import PasswordInput from "@/app/components/ui/password-input";
import { TagInput } from "@/app/components/ui/tag-input";
import LimitedInput from "@/app/components/ui/limited-input";

const formSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required.")
    .max(50, "Name must be less than 50 characters."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().nonempty("Password is required."),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required.")
    .max(5, "You can't add more than 5 tags."),
  upload: z
    .any()
    .refine((file) => file && file.length > 0, "File upload is required."),
});

type FormData = z.infer<typeof formSchema>;

const FormPreviewComplex = () => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      tags: [],
      upload: null,
    },
  });

  const { handleSubmit, control, formState } = formMethods;
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-4 max-w-lg min-w-lg"
        aria-labelledby="Complex-form"
      >
        {/* Name Field */}
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <LimitedInput
                  {...field}
                  id="name"
                  characterLimit={50}
                  helperText="Enter your full name."
                  required
                />
              </FormControl>
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} id="email" required type="email" />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          name="password"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} id="password" required />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* File Field */}
        <FormField
          name="upload"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="upload">Upload File</FormLabel>
              <FormControl>
                <Input {...field} id="upload" required type="file" />
              </FormControl>
              <FormMessage>{errors.upload?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          name="tags"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="tags">Tags</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  id="prefilled"
                  label="Skills"
                  initialTags={["JavaScript", "TypeScript"]}
                  maxTags={5}
                  error={
                    field.value.length >= 5
                      ? "You can't add more than 5 tags."
                      : ""
                  }
                />
              </FormControl>
              <FormMessage>{errors.tags?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormPreviewComplex;
