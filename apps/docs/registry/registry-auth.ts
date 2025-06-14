import { Registry } from "@/registry/schema";
export const authRegistry: Registry["items"] = [
  {
    name: "login",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/auth/login/page.tsx",
        type: "registry:page",
        target: "app/auth/login/page.tsx",
      },
      {
        path: "auth/pages/auth/layout.tsx",
        type: "registry:file",
        target: "app/auth/layout.tsx",
      },
    ],
    registryDependencies: ["login-form"],
    description: "Login page for users to sign in.",
  },

  {
    name: "register",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/auth/register/page.tsx",
        type: "registry:page",
        target: "app/auth/register/page.tsx",
      },
    ],
    registryDependencies: ["register-form"],
    description: "Register page for users to sign up.",
  },

  {
    name: "change-password",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/(protected)/profile/change-password/page.tsx",
        type: "registry:page",
        target: "app/(protected)/profile/change-password/page.tsx",
      },
    ],
    registryDependencies: ["change-password-form"],
    description: "Change password page for users to update their password.",
  },

  {
    name: "verify",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/auth/verify/page.tsx",
        type: "registry:page",
        target: "app/auth/verify/page.tsx",
      },
    ],
    registryDependencies: ["new-verification-form"],
    description:
      "New verification page for users to verify their email address.",
  },

  {
    name: "new-password",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/auth/new-password/page.tsx",
        type: "registry:page",
        target: "app/auth/new-password/page.tsx",
      },
    ],
    registryDependencies: ["new-password-form"],
    description: "New password page for users to set a new password.",
  },

  {
    name: "reset",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/auth/reset/page.tsx",
        type: "registry:page",
        target: "app/auth/reset/page.tsx",
      },
    ],
    registryDependencies: ["reset-form"],
    description: "Reset page for users to reset their password.",
  },

  {
    name: "admin",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/(protected)/admin/page.tsx",
        type: "registry:page",
        target: "app/(protected)/admin/page.tsx",
      },
      {
        path: "auth/pages/(protected)/layout.tsx",
        type: "registry:file",
        target: "app/(protected)/layout.tsx",
      },
    ],
    registryDependencies: ["role-gate", "navbar"],
    description: "Admin page for users with admin privileges.",
  },

  {
    name: "dashboard",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/dashboard/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "auth/lib/get-user.ts",
        type: "registry:lib",
      },
      {
        path: "auth/components/user-info.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Dashboard page for authenticated users.",
    registryDependencies: ["badge"],
  },

  {
    name: "profile",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/(protected)/profile/page.tsx",
        type: "registry:page",
        target: "app/(protected)/profile/page.tsx",
      },
    ],
    registryDependencies: ["settings-form"],
    description: "Profile page for users to manage their account settings.",
  },

  {
    name: "mail",
    type: "registry:auth",
    files: [
      {
        path: "auth/lib/mail.ts",
        type: "registry:lib",
      },
    ],
    dependencies: [
      "nodemailer",
      "@react-email/components",
      "@react-email/render",
    ],
    registryDependencies: [
      "verification-email",
      "reset-password-email",
      "two-factor-email",
    ],
    description: "Mail functions for sending emails.",
  },

  {
    name: "error",
    type: "registry:auth",
    files: [
      {
        path: "auth/pages/auth/error/page.tsx",
        type: "registry:page",
        target: "app/auth/error/page.tsx",
      },
    ],
    registryDependencies: ["error-card"],
    description: "Error page for authentication errors.",
  },

  {
    name: "middleware",
    type: "registry:auth",
    files: [
      {
        path: "auth/middleware.ts",
        type: "registry:middleware",
      },
    ],
    dependencies: ["next-auth@beta", "bcryptjs"],
    description: "Middleware for handling authentication.",
  },

  {
    name: "login-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/login-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "auth/schemas/index.ts",
        type: "registry:schemas",
      },
      {
        path: "auth/route.ts",
        type: "registry:api",
      },
    ],
    dependencies: ["zod", "@hookform/resolvers"],
    registryDependencies: [
      "form",
      "input",
      "button",
      "label",
      "auth-actions",
      "two-factor-actions",
      "form-success",
      "form-error",
      "card-wrapper",
    ],
    description: "Login form with email and password fields.",
  },
  {
    name: "register-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/register-form.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Register form with email, password, and username fields.",
  },
  {
    name: "social",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/social.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Social login buttons.",
    dependencies: ["react-icons"],
  },
  {
    name: "change-password-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/change-password-form.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Form for changing a user's password.",
  },
  {
    name: "new-password-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/new-password-form.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Form for setting new password.",
  },
  {
    name: "new-verification-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/new-verification-form.tsx",
        type: "registry:auth_comp",
      },
    ],
    dependencies: ["react-spinners"],
    description: "Form for verifying a user's email address.",
  },
  {
    name: "reset-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/reset-form.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Form for resetting a user's password.",
  },
  {
    name: "card-wrapper",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/card-wrapper.tsx",
        type: "registry:auth_comp",
      },
    ],
    registryDependencies: ["social", "back-button", "card"],
    description: "Wrapper for authentication cards.",
  },
  {
    name: "back-button",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/back-button.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Back button for authentication pages.",
  },
  {
    name: "error-card",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/error-card.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Error card for authentication pages.",
  },
  {
    name: "form-success",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/form-success.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Success message for forms.",
  },
  {
    name: "form-error",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/form-error.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Error message for forms.",
  },
  {
    name: "navbar",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/navbar.tsx",
        type: "registry:auth_comp",
      },
    ],
    registryDependencies: ["user-button"],
    description: "Navbar for authenticated users.",
  },
  {
    name: "user-button",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/user-button.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Button for user actions.",
    registryDependencies: ["logout-button", "dropdown-menu"],
  },
  {
    name: "logout-button",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/logout-button.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Button for logging out.",
  },
  {
    name: "auth-actions",
    type: "registry:auth",
    files: [
      {
        path: "auth/actions/auth-actions.ts",
        type: "registry:actions",
      },
      {
        path: "auth/lib/auth-helpers.ts",
        type: "registry:lib",
      },
      {
        path: "auth/lib/user.ts",
        type: "registry:lib",
      },
      {
        path: "auth/lib/auth.ts",
        type: "registry:lib",
      },
      {
        path: "auth/lib/next-auth.d.ts",
        type: "registry:lib",
      },
      {
        path: "auth/lib/routes.ts",
        type: "registry:lib",
      },
      {
        path: "auth/lib/auth.config.ts",
        type: "registry:lib",
      },
    ],
    dependencies: ["bcryptjs", "zod", "next-auth@beta", "cloudinary", "uuid"],
    registryDependencies: ["prisma"],
    description: "Actions for handling authentication.",
  },
  {
    name: "two-factor-actions",
    type: "registry:auth",
    files: [
      {
        path: "auth/actions/two-factor.ts",
        type: "registry:actions",
      },
    ],
    description: "Actions for handling two-factor authentication.",
  },
  {
    name: "prisma",
    type: "registry:auth",
    files: [
      {
        path: "auth/lib/db.ts",
        type: "registry:lib",
      },
    ],
    dependencies: ["prisma", "@prisma/client", "@auth/prisma-adapter"],
    description: "Prisma client for interacting with the database.",
  },

  {
    name: "settings-form",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/settings-form.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Form for updating user settings.",
    registryDependencies: ["avatar", "switch"],
  },

  {
    name: "role-gate",
    type: "registry:auth",
    files: [
      {
        path: "auth/components/role-gate.tsx",
        type: "registry:auth_comp",
      },
    ],
    description: "Gate for checking user roles.",
  },
  // Email templates
  {
    name: "reset-password-email",
    type: "registry:auth",
    files: [
      {
        path: "auth/emails/reset-password-email.tsx",
        type: "registry:email",
      },
    ],
    description: "Email template for resetting a user's password.",
  },
  {
    name: "verification-email",
    type: "registry:auth",
    files: [
      {
        path: "auth/emails/verification-email.tsx",
        type: "registry:email",
      },
    ],
    description: "Email template for verifying a user's email address.",
  },
  {
    name: "two-factor-email",
    type: "registry:auth",
    files: [
      {
        path: "auth/emails/two-factor-email.tsx",
        type: "registry:email",
      },
    ],
    description: "Email template for verifying a user's email address.",
  },
];
