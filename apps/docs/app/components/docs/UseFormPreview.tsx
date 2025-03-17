"use client";

import * as React from "react";
import { useForm } from "@/registry/new-york/hooks/use-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/registry/new-york/hooks/use-toast";

interface LoginFormValues {
  email: string;
  password: string;
}

export function SimpleFormPreview() {
  // Destructure the toast function from the hook:
  const { toast } = useToast();

  const [formState, formActions] = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      return errors;
    },
    onSubmit: async (values) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Login successful!",
        description: `Logged in as ${values.email}`,
      });

      formActions.resetForm();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formActions.submitForm();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formState.values.email}
              onChange={(e) =>
                formActions.setFieldValue("email", e.target.value)
              }
              onBlur={() => formActions.setFieldTouched("email")}
              className={
                formState.errors.email && formState.touched.email
                  ? "border-destructive"
                  : ""
              }
            />
            {formState.errors.email && formState.touched.email && (
              <p className="text-sm text-destructive">
                {formState.errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formState.values.password}
              onChange={(e) =>
                formActions.setFieldValue("password", e.target.value)
              }
              onBlur={() => formActions.setFieldTouched("password")}
              className={
                formState.errors.password && formState.touched.password
                  ? "border-destructive"
                  : ""
              }
            />
            {formState.errors.password && formState.touched.password && (
              <p className="text-sm text-destructive">
                {formState.errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            {formState.isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export function ContactFormPreview() {
  // Destructure the toast function from the hook:
  const { toast } = useToast();

  const [formState, formActions] = useForm<ContactFormValues>({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof ContactFormValues, string>> = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.message) {
        errors.message = "Message is required";
      } else if (values.message.length < 10) {
        errors.message = "Message must be at least 10 characters";
      }

      return errors;
    },
    onSubmit: async (values) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      formActions.resetForm();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formActions.submitForm();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formState.values.name}
              onChange={(e) =>
                formActions.setFieldValue("name", e.target.value)
              }
              onBlur={() => formActions.setFieldTouched("name")}
              className={
                formState.errors.name && formState.touched.name
                  ? "border-destructive"
                  : ""
              }
            />
            {formState.errors.name && formState.touched.name && (
              <p className="text-sm text-destructive">
                {formState.errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formState.values.email}
              onChange={(e) =>
                formActions.setFieldValue("email", e.target.value)
              }
              onBlur={() => formActions.setFieldTouched("email")}
              className={
                formState.errors.email && formState.touched.email
                  ? "border-destructive"
                  : ""
              }
            />
            {formState.errors.email && formState.touched.email && (
              <p className="text-sm text-destructive">
                {formState.errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formState.values.message}
              onChange={(e) =>
                formActions.setFieldValue("message", e.target.value)
              }
              onBlur={() => formActions.setFieldTouched("message")}
              className={
                formState.errors.message && formState.touched.message
                  ? "border-destructive"
                  : ""
              }
              rows={4}
            />
            {formState.errors.message && formState.touched.message && (
              <p className="text-sm text-destructive">
                {formState.errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            {formState.isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
