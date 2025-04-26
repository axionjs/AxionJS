"use server";

import * as z from "zod";
import { db } from "@/registry/auth/lib/db";
import { v2 as cloudinary } from "cloudinary";
import {
  LoginSchema,
  NewPasswordSchema,
  ResetSchema,
  SettingsSchema,
} from "@/registry/auth/schemas";
import { RegisterSchema } from "@/registry/auth/schemas";
import { getUserByEmail, getUserById } from "@/registry/auth/lib/user";
import { signIn, signOut } from "@/registry/auth/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/registry/auth/lib/routes";
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
  sendTwoFactorTokenEmail,
} from "@/registry/auth/lib/mail";
import {
  generateTwoFactorToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
} from "@/registry/auth/actions/two-factor";
import { currentUser } from "@/registry/auth/lib/get-user";

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
    return { error: "Email does not exist! / Sign in with OAuth!" };
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
  //2FA
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: "Invalid code!" };

      if (twoFactorToken.token !== code) return { error: "Invalid code!" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) return { error: "Code expired!" };

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      // when 2FA token has been emailed to user
      return { twoFactor: true };
    }
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

export const loginWithOAuth = async (
  provider: string,
  callbackUrl?: string | null,
) => {
  try {
    await signIn(provider, {
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in!" };
  } catch (error) {
    if (error === "NEXT_REDIRECT") {
      // This is a redirect, not an actual error
      return { success: "Redirecting to OAuth provider..." };
    } else if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthAccountNotLinked":
          return {
            error: "Email is already in use with a different provider.",
          };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
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

// New action for email change
export async function changeEmail(userId: string, newEmail: string) {
  const existingUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return { error: "User not found!" };
  }

  // Check if the new email is already used by another account
  const emailTaken = await getUserByEmail(newEmail);
  if (emailTaken && emailTaken.id !== userId) {
    return { error: "Email already in use by another account!" };
  }

  // Store the user ID in the verification token
  const verificationToken = await generateVerificationToken(newEmail, userId);

  // Send verification email to the NEW email address with emailChange flag
  await sendVerificationEmail(
    newEmail,
    verificationToken.token,
    true, // Indicate this is an email change
  );

  // Update user record to indicate pending email change
  await db.user.update({
    where: { id: userId },
    data: {
      pendingEmail: newEmail,
    },
  });

  return { success: "Verification email sent to new address!" };
}

// Action to verify email change
export async function verifyEmailChange(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // Find the user who requested this email change using the userId stored in the token
  if (!existingToken.userId) {
    return { error: "Invalid email change request!" };
  }

  const user = await db.user.findUnique({
    where: { id: existingToken.userId },
  });

  if (!user) {
    return { error: "User not found!" };
  }

  // Update the user's email
  await db.user.update({
    where: { id: user.id },
    data: {
      email: existingToken.email,
      emailVerified: new Date(),
      pendingEmail: null, // Clear the pending email field
    },
  });

  // Delete the verification token
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email updated successfully!" };
}

export const settings = async (
  userId: string | { id: string } | any,
  values: z.infer<typeof SettingsSchema>,
) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };
  // Handle different userId formats
  const actualUserId =
    typeof userId === "string"
      ? userId
      : typeof userId === "object" && userId?.id
        ? userId.id
        : null;

  if (!actualUserId) {
    return { error: "Invalid user ID!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized!" };

  // users who signed in with OAuth should not be able to modify these fields
  if (user.isOAuth) {
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Handle email change if provided
  if (values.email && values.email !== user.email) {
    return await changeEmail(actualUserId, values.email);
  }

  // Handle name update
  if (values.name !== undefined && values.name !== user.name) {
    await db.user.update({
      where: { id: actualUserId },
      data: { name: values.name },
    });
  }

  // Handle two-factor authentication toggle
  if (
    typeof values.isTwoFactorEnabled !== "undefined" &&
    values.isTwoFactorEnabled !== dbUser.isTwoFactorEnabled
  ) {
    await db.user.update({
      where: { id: actualUserId },
      data: { isTwoFactorEnabled: values.isTwoFactorEnabled },
    });
  }

  return { success: "Profile updated!" };
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function updateUserImage(userId: string, imageData: string) {
  try {
    // Validate user ID
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found!" };
    }

    if (!imageData || !imageData.startsWith("data:image/")) {
      return { error: "Invalid image data!" };
    }

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        imageData,
        {
          folder: "user_profiles",
          // You can add transformation options here
          // transformation: [{ width: 250, height: 250, crop: 'fill' }]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
    });

    // Get the secure URL from the upload response
    const imageUrl = (uploadResponse as { secure_url: string }).secure_url;

    // Update the user's image URL in the database
    await db.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return { success: "Profile picture updated!" };
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return { error: "Failed to update profile picture." };
  }
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  // Block OAuth users from password changes
  if (user.isOAuth) {
    return { error: "OAuth users cannot change password!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized!" };

  const passwordsMatch = await verifyPassword(
    currentPassword,
    dbUser?.password!,
  );

  if (!passwordsMatch) {
    return { error: "Incorrect password!" };
  }

  const hashedPassword = await hashPassword(newPassword);

  await db.user.update({
    where: { id: dbUser.id },
    data: { password: hashedPassword },
  });

  return { success: "Password updated!" };
};
