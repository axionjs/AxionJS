import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "@/registry/new-york/dynamic-components/simple-auth/emails/verification-email";
import ResetPasswordEmail from "@/registry/new-york/dynamic-components/simple-auth/emails/reset-password-email";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string,
  isEmailChange = false,
) => {
  // Add emailChange parameter to the URL for email changes
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}${isEmailChange ? "&emailChange=true" : ""}`;

  const emailHtml = await render(VerificationEmail({ confirmLink }));

  await transporter.sendMail({
    from: `AxionJS - <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: isEmailChange
      ? "Confirm your new email address"
      : "Confirm your email address",
    html: emailHtml,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

  const emailHtml = await render(ResetPasswordEmail({ resetLink }));

  await transporter.sendMail({
    from: `AxionJS - <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  });
};
