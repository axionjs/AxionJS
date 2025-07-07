"use server";

import * as z from "zod";
import crypto from "crypto";
import { sendTwoFactorTokenEmail } from "@/registry/default/dynamic-components/two-factor-form/lib/two-factor-utils";
import { db } from "@/registry/default/lib/db";

// Validation schemas
const TwoFactorRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const TwoFactorVerifySchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});

export interface TwoFactorActionResult {
  success?: string;
  error?: string;
  twoFactorRequired?: boolean;
}

export interface TwoFactorToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export interface TwoFactorConfirmation {
  id: string;
  userId: string;
}
// Request 2FA code
export const requestTwoFactorCode = async (
  values: z.infer<typeof TwoFactorRequestSchema>,
): Promise<TwoFactorActionResult> => {
  try {
    const validatedFields = TwoFactorRequestSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid email address" };
    }

    const { email } = validatedFields.data;

    // Generate and send 2FA token
    const twoFactorToken = await generateTwoFactorToken(email);
    await sendTwoFactorTokenEmail(email, twoFactorToken.token);

    return {
      success: "Verification code sent to your email",
      twoFactorRequired: true,
    };
  } catch (error) {
    console.error("2FA request error:", error);
    return { error: "Failed to send verification code" };
  }
};

// Verify 2FA code
export const verifyTwoFactorCode = async (
  values: z.infer<typeof TwoFactorVerifySchema>,
): Promise<TwoFactorActionResult> => {
  try {
    const validatedFields = TwoFactorVerifySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid input" };
    }

    const { email, code } = validatedFields.data;

    // Get the token from database
    const twoFactorToken = await getTwoFactorTokenByEmail(email);

    if (!twoFactorToken) {
      return { error: "Invalid or expired code" };
    }

    if (twoFactorToken.token !== code) {
      return { error: "Invalid verification code" };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();
    if (hasExpired) {
      return { error: "Verification code has expired" };
    }

    // Clean up the token after successful verification
    await db.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });

    return { success: "Two-factor authentication verified successfully" };
  } catch (error) {
    console.error("2FA verification error:", error);
    return { error: "Verification failed" };
  }
};

// Enable/Disable 2FA for a user
export const toggleTwoFactor = async (
  userId: string,
  enabled: boolean,
): Promise<TwoFactorActionResult> => {
  try {
    await db.user.update({
      where: { id: userId },
      data: { isTwoFactorEnabled: enabled },
    });

    if (!enabled) {
      // Remove any existing 2FA confirmations when disabling
      const existingConfirmation =
        await getTwoFactorConfirmationByUserId(userId);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }
    }

    return {
      success: `Two-factor authentication ${enabled ? "enabled" : "disabled"} successfully`,
    };
  } catch (error) {
    return { error: "Failed to update two-factor authentication settings" };
  }
};

// Database operations using Prisma
export const getTwoFactorTokenByToken = async (
  token: string,
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (
  email: string,
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (
  userId: string,
): Promise<TwoFactorConfirmation | null> => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const generateTwoFactorToken = async (
  email: string,
): Promise<TwoFactorToken> => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minute expiry

  // Delete existing token if any
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create new token
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
