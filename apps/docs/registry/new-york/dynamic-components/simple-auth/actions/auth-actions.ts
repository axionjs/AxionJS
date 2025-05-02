"use server";

import * as z from "zod";
import { db } from "@/registry/auth/lib/db";
import { LoginSchema } from "@/registry/new-york/dynamic-components/simple-auth/components/login-form";
import { ResetSchema } from "@/registry/new-york/dynamic-components/simple-auth/components/reset-form";
import { RegisterSchema } from "@/registry/new-york/dynamic-components/simple-auth/components/register-form";
import { getUserByEmail } from "@/registry/auth/lib/user";
import {
  signIn,
  signOut,
} from "@/registry/new-york/dynamic-components/simple-auth/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/registry/new-york/dynamic-components/simple-auth/lib/routes";
import { AuthError } from "next-auth";
import {
  generatePasswordResetToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getVerificationTokenByToken,
  hashPassword,
  verifyPassword,
} from "@/registry/auth/lib/auth-helpers";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/registry/new-york/dynamic-components/simple-auth/lib/mail";
import { NewPasswordSchema } from "@/registry/new-york/dynamic-components/simple-auth/components/new-password-form";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    // Either user/email does not exist or user signed in with OAuth
    return { error: "Email does not exist!" };
  }

  const passwordsMatch = await verifyPassword(password, existingUser.password);

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    if (!passwordsMatch) {
      return { error: "Invalid credentials!" };
    }
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }
  if (!passwordsMatch) {
    return { error: "Invalid credentials!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    }); // explicitly setting the redirect (for clarity), even though middleware will redirect if user is logged in

    return { success: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials!" };
        }
        default: {
          return { error: "Something went wrong!" };
        }
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut();
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  // Handle case where user exists - normal email verification for new registration
  if (existingUser) {
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
      },
    });
  } else {
    // If we can't find a user with this email, it might be from a registration
    // that created the user but didn't set the email yet
    const pendingUser = await db.user.findFirst({
      where: {
        OR: [{ email: null }, { emailVerified: null }],
      },
      orderBy: {
        id: "desc",
      },
    });

    if (!pendingUser) {
      return { error: "User not found!" };
    }

    await db.user.update({
      where: { id: pendingUser.id },
      data: {
        email: existingToken.email,
        emailVerified: new Date(),
      },
    });
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid email!" };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found!" };

  const isOAuthAccount = await db.account.findFirst({
    where: { userId: existingUser?.id },
  });

  if (isOAuthAccount)
    return { error: "Cannot reset password for OAuth account!" };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset password email sent" };
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) return { error: "Missing token!" };

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Invalid token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await hashPassword(password);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
