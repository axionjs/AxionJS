import nodemailer from "nodemailer";
import { getTwoFactorEmailTemplate } from "@/registry/new-york/dynamic-components/two-factor-form/emails/two-factor-template";

// Email sending function - Complete implementation with template
export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  try {
    // Create transporter based on environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Get email templates
    const { html, text } = getTwoFactorEmailTemplate(token);

    // Send email
    await transporter.sendMail({
      from: `${process.env.EMAIL_FROM || "AxionJS Team"}`,
      to: email,
      subject: "🔐 Your Two-Factor Authentication Code",
      text,
      html,
    });

    console.log(`2FA code sent successfully to ${email}`);
  } catch (error) {
    console.error("Failed to send 2FA email:", error);
    throw new Error("Failed to send verification email");
  }
};
