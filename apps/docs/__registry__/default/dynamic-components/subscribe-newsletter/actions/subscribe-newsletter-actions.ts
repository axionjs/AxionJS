"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { db } from "@/registry/default/lib/db";
import { randomBytes } from "crypto";

// Form validation schema
const subscribeFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  name: z.string().optional(),
});

export type SubscribeFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    name?: string[];
  };
};

// Generate a secure random token
function generateSecureToken(): string {
  return randomBytes(32).toString("hex");
}

// Get all subscribers
export async function getAllSubscribers() {
  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return subscribers;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function subscribeToNewsletter(
  prevState: SubscribeFormState,
  formData: FormData
): Promise<SubscribeFormState> {
  // Validate form data
  const validatedFields = subscribeFormSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") || "",
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check the form for errors.",
    };
  }

  const { email, name } = validatedFields.data;

  try {
    // Check if subscriber already exists
    const existingSubscriber = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    const token = generateSecureToken();

    if (existingSubscriber) {
      if (existingSubscriber.status === "ACTIVE") {
        return {
          success: false,
          message: "This email is already subscribed to our newsletter.",
        };
      } else {
        // Reactivate the subscriber and update their token
        await db.newsletterSubscriber.update({
          where: { email },
          data: {
            status: "ACTIVE",
            token: token,
            tokenCreatedAt: new Date(),
          },
        });

        await sendConfirmationEmail(email, name || "", token);

        return {
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        };
      }
    }

    await db.newsletterSubscriber.create({
      data: {
        email,
        name: name || null,
        status: "ACTIVE",
        token: token,
        tokenCreatedAt: new Date(),
      },
    });

    // Send confirmation email
    await sendConfirmationEmail(email, name || "", token);

    revalidatePath("/admin/newsletter");

    return {
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
}

async function sendConfirmationEmail(
  email: string,
  name: string,
  token: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const siteName = process.env.SITE_NAME;
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Welcome to ${siteName}'s Newsletter`,
    text: `
      Hello ${name || "there"},
      
      Thank you for subscribing to our newsletter! You'll now receive updates on our latest news, products, and offers.
      
      If you didn't subscribe to this newsletter, please ignore this email.
      
      To unsubscribe at any time, click here: ${unsubscribeUrl}
      
      Best regards,
      The ${siteName} Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Newsletter!</h2>
        <p>Hello ${name || "there"},</p>
        <p>Thank you for subscribing to our newsletter! You'll now receive updates on our latest news, products, and offers.</p>
        <p>If you didn't subscribe to this newsletter, please ignore this email.</p>
        <p>Best regards,<br>The ${siteName} Team</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
        <p style="font-size: 12px; color: #666;">
          To unsubscribe from our newsletter, <a href="${unsubscribeUrl}">click here</a>.
        </p>
      </div>
    `,
  });
}

// Campaign form validation schema
const campaignFormSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),
});

export type CampaignFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    subject?: string[];
    content?: string[];
  };
};

// Get all campaigns
export async function getAllCampaigns() {
  try {
    const campaigns = await db.newsletterCampaign.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        _count: {
          select: {
            recipients: true,
          },
        },
      },
    });
    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw new Error("Failed to fetch campaigns");
  }
}

export async function createAndSendCampaign(
  prevState: CampaignFormState,
  formData: FormData
): Promise<CampaignFormState> {
  // Validate form data
  const validatedFields = campaignFormSchema.safeParse({
    subject: formData.get("subject"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check the form for errors.",
    };
  }

  const { subject, content } = validatedFields.data;

  try {
    // Create campaign
    const campaign = await db.newsletterCampaign.create({
      data: {
        subject,
        content,
        sentAt: new Date(),
      },
    });

    // Get all active subscribers
    const subscribers = await db.newsletterSubscriber.findMany({
      where: { status: "ACTIVE" },
      select: {
        id: true,
        email: true,
        name: true,
        token: true,
      },
    });

    if (subscribers.length === 0) {
      return {
        success: false,
        message: "No active subscribers found to send the newsletter to.",
      };
    }

    // Create campaign recipients
    await db.newsletterCampaignRecipient.createMany({
      data: subscribers.map((subscriber) => ({
        campaignId: campaign.id,
        subscriberId: subscriber.id,
        status: "PENDING",
      })),
    });

    // Send emails to all subscribers
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const siteName = process.env.SITE_NAME || "Our Website";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Send emails in batches to avoid overloading the email server
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (subscriber) => {
          const unsubscribeUrl = `${baseUrl}/unsubscribe?token=${subscriber.token}`;

          await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: subscriber.email,
            subject,
            text: `${content}\n\nTo unsubscribe from our newsletter, visit: ${unsubscribeUrl}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                ${content}
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
                <p style="font-size: 12px; color: #666;">
                  You're receiving this email because you subscribed to the ${siteName} newsletter.
                  <br>
                  To unsubscribe, <a href="${unsubscribeUrl}">click here</a>.
                </p>
              </div>
            `,
          });

          // Update recipient status
          await db.newsletterCampaignRecipient.updateMany({
            where: {
              campaignId: campaign.id,
              subscriberId: subscriber.id,
            },
            data: {
              status: "SENT",
              sentAt: new Date(),
            },
          });
        })
      );
    }

    revalidatePath("/admin/newsletter");

    return {
      success: true,
      message: `Newsletter sent successfully to ${subscribers.length} subscribers.`,
    };
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return {
      success: false,
      message: "Failed to send newsletter. Please try again later.",
    };
  }
}

export async function unsubscribeSubscriber(id: string) {
  try {
    await db.newsletterSubscriber.update({
      where: { id },
      data: { status: "UNSUBSCRIBED" },
    });

    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return { success: false, error: "Failed to unsubscribe." };
  }
}

export async function deleteSubscriber(id: string) {
  try {
    await db.newsletterSubscriber.delete({
      where: { id },
    });

    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return { success: false, error: "Failed to delete subscriber." };
  }
}

export async function verifyUnsubscribeToken(
  token: string
): Promise<string | null> {
  try {
    const subscriber = await db.newsletterSubscriber.findUnique({
      where: { token },
      select: { email: true, status: true, tokenCreatedAt: true },
    });

    // Check if subscriber exists and is active
    if (!subscriber || subscriber.status !== "ACTIVE") {
      return null;
    }

    // Optional: Check token expiration (e.g., tokens valid for xyz time)

    return subscriber.email;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function unsubscribeByToken(token: string) {
  try {
    const subscriber = await db.newsletterSubscriber.findUnique({
      where: { token },
    });

    if (!subscriber || subscriber.status !== "ACTIVE") {
      return {
        success: false,
        message: "Invalid or expired unsubscribe link.",
      };
    }

    // Update subscriber status
    await db.newsletterSubscriber.update({
      where: { token },
      data: { status: "UNSUBSCRIBED" },
    });

    revalidatePath("/admin/newsletter");

    return {
      success: true,
      message: "You have been successfully unsubscribed from our newsletter.",
    };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return {
      success: false,
      message: "Failed to unsubscribe. Please try again later.",
    };
  }
}
