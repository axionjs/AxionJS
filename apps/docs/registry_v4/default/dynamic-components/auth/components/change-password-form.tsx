"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/registry/default/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import { FormSuccess } from "@/registry/default/dynamic-components/auth/components/form-success";
import { FormError } from "@/registry/default/dynamic-components/auth/components/form-error";
import { Input } from "@/registry/default/ui/input";
import { changePassword } from "@/registry/default/dynamic-components/auth/actions/auth-actions";
import { CardWrapper } from "./card-wrapper";
import { ChangePasswordSchema } from "@/registry/default/dynamic-components/auth/schemas";

export const ChangePasswordForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changePassword(values.currentPassword, values.newPassword)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <CardWrapper
      mainHeaderLabel="Change Password"
      subHeaderLabel="Update your account password"
      backButtonLabel="Back to Dashboard"
      backButtonHref="/dashboard"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Current Password Field */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      disabled={isPending}
                      type="password"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      disabled={isPending}
                      type="password"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      disabled={isPending}
                      type="password"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Error and Success Messages */}
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          {/* Save Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            {isPending ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
