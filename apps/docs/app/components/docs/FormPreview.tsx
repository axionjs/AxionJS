"use client";

import React from "react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().nonempty("Password is required."),
});

type FormData = z.infer<typeof formSchema>;

const FormPreview = () => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
        className="space-y-3 p-4 max-w-lg"
        aria-labelledby="Simple-form"
      >
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
                <Input {...field} id="password" required type="password" />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
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

export default FormPreview;
