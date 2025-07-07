"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { db } from "@/registry/new-york/lib/db";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export async function getMessages() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function sendEmail(data: unknown) {
  // Validate form data
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const { name, email, message } = result.data;

  try {
    // 1. Store in database
    await db.contactMessage.create({
      data: {
        name,
        email,
        message,
        status: "UNREAD",
        createdAt: new Date(),
      },
    });

    // 2. Send email to admin
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    revalidatePath("/admin/messages");

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}

export async function updateMessageStatus(
  id: string,
  status: "READ" | "UNREAD",
) {
  try {
    await db.contactMessage.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Error updating message status:", error);
    return { success: false, error: "Failed to update message status." };
  }
}

export async function deleteMessage(id: string) {
  try {
    await db.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: "Failed to delete message." };
  }
}

export async function getUnreadMessageCounts() {
  const unreadCount = await db.contactMessage.count({
    where: { status: "UNREAD" },
  });
  return {
    unreadCount,
  };
}
export async function getTotalMessageCount() {
  const totalMessages = await db.contactMessage.count();
  return {
    totalMessages,
  };
}
