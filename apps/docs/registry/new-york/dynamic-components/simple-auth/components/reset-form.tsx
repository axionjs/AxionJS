"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { FormSuccess } from "@/registry/new-york/dynamic-components/simple-auth/components/form-success";
import { FormError } from "@/registry/new-york/dynamic-components/simple-auth/components/form-error";
import { Input } from "@/registry/new-york/ui/input";
import { reset } from "@/registry/new-york/dynamic-components/simple-auth/actions/auth-actions";
import { CardWrapper } from "@/registry/new-york/dynamic-components/simple-auth/components/card-wrapper";
import { Button } from "@/registry/new-york/ui/button";

export const ResetSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .nonempty("Email cannot be empty"),
});

export function ResetForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      mainHeaderLabel="Reset Password"
      subHeaderLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref={`${process.env.NEXT_PUBLIC_BASE_PATH}/auth/login`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
