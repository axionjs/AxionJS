"use client";

import * as React from "react";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSignIcon, UserIcon, LockIcon } from "lucide-react";

import { Button } from "@/registry/default/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { useToast } from "@/lib/use-toast";
import PasswordInput from "@/registry/default/ui/password-input";

// TODO: Create server action for signup
// Create a file: app/actions/auth-actions.ts
//
// "use server";
//
// import { z } from "zod";
// import { redirect } from "next/navigation";
//
// const signupSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   password: z.string().min(8),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });
//
// export async function signupAction(formData: z.infer<typeof signupSchema>) {
//   try {
//     // Validate the form data
//     const validatedFields = signupSchema.parse(formData);
//
//     // TODO: Implement your authentication logic here
//     // Examples:
//     // - Hash the password using bcrypt
//     // - Save user to database
//     // - Send verification email
//     // - Create session/JWT token
//
//     // Example with a database call:
//     // const hashedPassword = await bcrypt.hash(validatedFields.password, 10);
//     // const user = await db.user.create({
//     //   data: {
//     //     name: validatedFields.name,
//     //     email: validatedFields.email,
//     //     password: hashedPassword,
//     //   },
//     // });
//
//     return { success: true, message: "Account created successfully" };
//   } catch (error) {
//     console.error("Signup error:", error);
//     throw new Error("Failed to create account");
//   }
// }

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm1() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = React.useState(false);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);

      // TODO: Import and use the signupAction server action
      // import { signupAction } from "@/actions/auth-actions";
      // await signupAction(values);

      // For now, simulate the signup process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  // TODO: Implement OAuth server actions
  // Create server actions for GitHub and Google OAuth:
  //
  // export async function signInWithGitHub() {
  //   "use server";
  //   // Implement GitHub OAuth logic
  //   // redirect to GitHub OAuth URL
  // }
  //
  // export async function signInWithGoogle() {
  //   "use server";
  //   // Implement Google OAuth logic
  //   // redirect to Google OAuth URL
  // }

  const handleGitHubSignup = async () => {
    // TODO: Call GitHub OAuth server action
    // await signInWithGitHub();
    console.log("GitHub signup clicked");
  };

  const handleGoogleSignup = async () => {
    // TODO: Call Google OAuth server action
    // await signInWithGoogle();
    console.log("Google signup clicked");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        aria-label="Full name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={emailId}>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id={emailId}
                        placeholder="name@example.com"
                        className="peer ps-9"
                        {...field}
                        autoComplete="email"
                        aria-label="Email address"
                      />
                      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <AtSignIcon size={16} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={passwordId}>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={passwordId}
                      value={field.value}
                      onChange={field.onChange}
                      error={form.formState.errors.password?.message}
                      autoComplete="new-password"
                      aria-label="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={confirmPasswordId}>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id={confirmPasswordId}
                        type="password"
                        placeholder="••••••••"
                        className="peer ps-9"
                        {...field}
                        aria-label="Confirm password"
                      />
                      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <LockIcon size={16} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              aria-label="Create your account"
            >
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            variant="outline"
            type="button"
            onClick={handleGitHubSignup}
            className="flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            GitHub
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            Google
          </Button>
        </div>
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
