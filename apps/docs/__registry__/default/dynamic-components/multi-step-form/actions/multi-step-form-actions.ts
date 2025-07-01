"use server";

import { revalidatePath } from "next/cache";
import type { OnboardingFormValues } from "@/registry/default/dynamic-components/multi-step-form/components/onboarding-wizard";
import { db } from "@/registry/default/lib/db";

export async function saveOnboardingData(data: OnboardingFormValues) {
  try {
    // In actual implementation, you would have the user ID from the session
    // For this example, we'll use a placeholder ID
    const userId = "user-placeholder-id";

    // Extract preferences from the form data
    const preferences = {
      theme: data.theme,
      emailFrequency: data.emailFrequency,
      marketingEmails: data.marketingEmails,
      notifications: {
        email: data.emailNotifications,
        push: data.pushNotifications,
        activitySummary: data.activitySummary,
        newFeatures: data.newFeatures,
        securityAlerts: data.securityAlerts,
      },
    };

    // Update the user profile in the database
    await db.userProfile.upsert({
      where: { id: userId },
      update: {
        name: data.name,
        bio: data.bio || null,
        avatarUrl: data.avatarUrl || null,
        preferences: preferences,
        completedOnboarding: true,
        updatedAt: new Date(),
      },
      create: {
        id: userId,
        email: "user@example.com", // This would come from auth
        name: data.name,
        bio: data.bio || null,
        avatarUrl: data.avatarUrl || null,
        preferences: preferences,
        completedOnboarding: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return { success: false, error: "Failed to save onboarding data" };
  }
}
