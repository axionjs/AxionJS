import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "@/registry/auth/emails/verification-email";
import ResetPasswordEmail from "@/registry/auth/emails/reset-password-email";
import TwoFactorAuthEmail from "@/registry/auth/emails/two-factor-email";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
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
    from: `AxionJS - Test <${process.env.SMTP_FROM}>`,
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
    from: `AxionJS - Test <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const emailHtml = await render(
    TwoFactorAuthEmail({ verificationToken: token }),
  );

  await transporter.sendMail({
    from: `AxionJS - Test <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "2FA Verification Code",
    html: emailHtml,
  });
};
