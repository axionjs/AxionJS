import { Registry } from "@/registry_v4/schema";

export const dynamicComponents: Registry["items"] = [
  {
    name: "rbac-auth",
    type: "registry:dynamic-component",
    registryDependencies: [
      "badge",
      "form",
      "input",
      "button",
      "label",
      "card",
      "avatar",
      "switch",
      "dropdown-menu",
    ],
    dependencies: [
      "prisma",
      "@prisma/client",
      "@auth/prisma-adapter",
      "framer-motion",
      "nodemailer",
      "@react-email/components",
      "react-spinners",
      "next-auth@beta",
      "bcryptjs",
      "react-icons",
      "cloudinary",
      "uuid",
    ],
    files: [
      {
        path: "dynamic-components/auth/pages/auth/login/page.tsx",
        type: "registry:page",
        target: "app/auth/login/page.tsx",
      },
      {
        path: "dynamic-components/auth/pages/auth/layout.tsx",
        type: "registry:file",
        target: "app/auth/layout.tsx",
      },
      {
        path: "dynamic-components/auth/pages/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "dynamic-components/auth/pages/auth/register/page.tsx",
        type: "registry:page",
        target: "app/auth/register/page.tsx",
      },
      {
        path: "dynamic-components/auth/pages/(protected)/profile/change-password/page.tsx",
        type: "registry:page",
        target: "app/(protected)/profile/change-password/page.tsx",
      },
      {
        path: "dynamic-components/auth/pages/auth/verify/page.tsx",
        type: "registry:page",
        target: "app/auth/verify/page.tsx",
      },

      {
        path: "dynamic-components/auth/pages/auth/new-password/page.tsx",
        type: "registry:page",
        target: "app/auth/new-password/page.tsx",
      },

      {
        path: "dynamic-components/auth/pages/auth/reset/page.tsx",
        type: "registry:page",
        target: "app/auth/reset/page.tsx",
      },
      {
        path: "dynamic-components/auth/pages/(protected)/admin/page.tsx",
        type: "registry:page",
        target: "app/(protected)/admin/page.tsx",
      },
      {
        path: "dynamic-components/auth/pages/(protected)/layout.tsx",
        type: "registry:file",
        target: "app/(protected)/layout.tsx",
      },
      {
        path: "dynamic-components/auth/pages/dashboard/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "dynamic-components/auth/lib/get-user.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/components/user-info.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/pages/(protected)/profile/page.tsx",
        type: "registry:page",
        target: "app/(protected)/profile/page.tsx",
      },

      {
        path: "dynamic-components/auth/lib/mail.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/pages/auth/error/page.tsx",
        type: "registry:page",
        target: "app/auth/error/page.tsx",
      },
      {
        path: "dynamic-components/auth/middleware.ts",
        type: "registry:middleware",
      },
      {
        path: "dynamic-components/auth/components/login-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/schemas/index.ts",
        type: "registry:schemas",
      },
      {
        path: "dynamic-components/auth/route.ts",
        type: "registry:api",
      },
      {
        path: "dynamic-components/auth/components/register-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/social.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/change-password-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/new-password-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/new-verification-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/reset-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/card-wrapper.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/back-button.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/error-card.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/form-success.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/form-error.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/navbar.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/user-button.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/logout-button.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/actions/auth-actions.ts",
        type: "registry:actions",
      },
      {
        path: "dynamic-components/auth/lib/auth-helpers.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/lib/user.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/lib/auth.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/lib/next-auth.d.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/lib/routes.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/lib/auth.config.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/actions/two-factor.ts",
        type: "registry:actions",
      },
      {
        path: "dynamic-components/auth/lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/auth/components/settings-form.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/components/role-gate.tsx",
        type: "registry:auth_comp",
      },
      {
        path: "dynamic-components/auth/emails/reset-password-email.tsx",
        type: "registry:email",
      },
      {
        path: "dynamic-components/auth/emails/verification-email.tsx",
        type: "registry:email",
      },
      {
        path: "dynamic-components/auth/emails/two-factor-email.tsx",
        type: "registry:email",
      },
    ],
    description:
      "A role-based authentication system with user management, email verification, and password reset functionality.",
  },
  {
    name: "contact-form",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "textarea",
      "input",
      "form",
      "card",
      "dropdown-menu",
      "tabs",
      "badge",
      "use-toast",
      "toaster",
    ],
    dependencies: ["nodemailer", "zod", "date-fns", "prisma", "@prisma/client"],
    files: [
      {
        path: "dynamic-components/contact-form/actions/contact-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/contact-form/hooks/use-contact-form.ts",
        type: "registry:hook",
      },
      {
        path: "dynamic-components/contact-form/hooks/use-message-list.ts",
        type: "registry:hook",
      },
      {
        path: "dynamic-components/contact-form/components/contact-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/contact-form/components/message-list.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/contact-form/admin/page.tsx",
        target: "app/(contact-form)/admin/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/contact-form/admin/messages/page.tsx",
        target: "app/(contact-form)/admin/messages/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/contact-form/admin/layout.tsx",
        target: "app/(contact-form)/admin/layout.tsx",
        type: "registry:file",
      },
    ],
    description: "A contact form with email sending functionality.",
  },
  {
    name: "simple-auth",
    type: "registry:dynamic-component",
    registryDependencies: ["button", "input", "form", "card"],
    dependencies: [
      "nodemailer",
      "zod",
      "prisma",
      "@prisma/client",
      "react-spinners",
      "@react-email/components",
      "@react-email/render",
      "uuid",
      "bcryptjs",
      "next-auth@beta",
      "@auth/prisma-adapter",
      "lucide-react",
    ],
    files: [
      {
        path: "dynamic-components/simple-auth/components/login-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/register-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/new-password-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/new-verification-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/reset-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/card-wrapper.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/back-button.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/form-error.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/components/form-success.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/simple-auth/actions/auth-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/auth.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/routes.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/auth-helpers.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/user.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/get-user.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/next-auth.d.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/auth.config.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/lib/mail.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-auth/route.ts",
        type: "registry:api",
      },
      {
        path: "dynamic-components/simple-auth/emails/verification-email.tsx",
        type: "registry:email",
      },
      {
        path: "dynamic-components/simple-auth/emails/reset-password-email.tsx",
        type: "registry:email",
      },
      {
        path: "dynamic-components/simple-auth/auth/login/page.tsx",
        target: "app/auth/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/simple-auth/auth/register/page.tsx",
        target: "app/auth/register/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/simple-auth/auth/reset/page.tsx",
        target: "app/auth/reset/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/simple-auth/auth/new-password/page.tsx",
        target: "app/auth/new-password/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/simple-auth/auth/verify/page.tsx",
        target: "app/auth/verify/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/simple-auth/schemas/index.ts",
        type: "registry:schemas",
      },
      {
        path: "dynamic-components/simple-auth/auth/layout.tsx",
        target: "app/auth/layout.tsx",
        type: "registry:file",
      },
      {
        path: "dynamic-components/simple-auth/middleware.ts",
        type: "registry:middleware",
      },
    ],
    description:
      "A simple authentication system with email verification and password reset.",
  },

  {
    name: "simple-crud-table",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "input",
      "table",
      "use-toast",
      "toaster",
      "skeleton",
    ],
    dependencies: ["nodemailer", "zod", "date-fns", "prisma", "@prisma/client"],
    files: [
      {
        path: "dynamic-components/simple-crud-table/actions/crud-table-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/simple-crud-table/hooks/use-crud-table.ts",
        type: "registry:hook",
      },
      {
        path: "dynamic-components/simple-crud-table/components/simple-crud-table.tsx",
        type: "registry:component",
      },
    ],
    description:
      "A simple CRUD table with create, read, update, and delete functionality.",
  },

  {
    name: "subscribe-newsletter",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "textarea",
      "input",
      "label",
      "alert",
      "card",
      "use-toast",
      "toaster",
      "table",
      "badge",
      "dropdown-menu",
      "tabs",
      "skeleton",
    ],
    dependencies: [
      "nodemailer",
      "zod",
      "crypto",
      "prisma",
      "@prisma/client",
      "date-fns",
    ],
    files: [
      {
        path: "dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/subscribe-newsletter/hooks/use-unsubscribe-form.ts",
        type: "registry:hook",
      },
      {
        path: "dynamic-components/subscribe-newsletter/components/newsletter-campaign-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/subscribe-newsletter/components/newsletter-subscription.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/subscribe-newsletter/components/subscriber-list.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/subscribe-newsletter/components/unsubscribe.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/subscribe-newsletter/components/unsubscribe-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/subscribe-newsletter/admin/page.tsx",
        target: "app/(subscribe-newsletter)/admin/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/subscribe-newsletter/unsubscribe/page.tsx",
        target: "app/(subscribe-newsletter)/unsubscribe/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/subscribe-newsletter/admin/newsletter/page.tsx",
        target: "app/(subscribe-newsletter)/admin/newsletter/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/subscribe-newsletter/admin/layout.tsx",
        target: "app/(subscribe-newsletter)/admin/layout.tsx",
        type: "registry:file",
      },
    ],
    description: "A newsletter subscription form with email functionality.",
  },

  {
    name: "media-uploader",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "alert-dialog",
      "card",
      "progress",
      "badge",
      "scroll-area",
    ],
    dependencies: ["prisma", "@prisma/client", "cloudinary"],
    files: [
      {
        path: "dynamic-components/media-uploader/actions/media-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/media-uploader/components/media-uploader.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/media-uploader/components/media-gallery.tsx",
        type: "registry:component",
      },

      {
        path: "dynamic-components/media-uploader/media/page.tsx",
        target: "app/(media-uploader)/media/page.tsx",
        type: "registry:page",
      },
    ],
    description: "A media uploader with image and video support.",
  },
  {
    name: "inventory-manager",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "alert",
      "alert-dialog",
      "dialog",
      "toaster",
      "skeleton",
      "badge",
      "dropdown-menu",
      "table",
      "input",
      "select",
      "use-toast",
      "form",
      "separator",
    ],
    dependencies: ["prisma", "@prisma/client", "@tanstack/react-table"],
    files: [
      {
        path: "dynamic-components/inventory-manager/actions/inventory.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/inventory-manager/components/inventory-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/inventory-manager/components/inventory-data-table.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/inventory-manager/components/data-table.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/inventory-manager/components/columns.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/inventory-manager/inventory/page.tsx",
        target: "app/(inventory-manager)/inventory/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/inventory-manager/lib/context.tsx",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/inventory-manager/hooks/use-inventory-data-table.ts",
        type: "registry:hook",
      },
    ],
    description: "An inventory manager with CRUD functionality.",
  },
  {
    name: "multi-step-form",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "avatar",
      "form",
      "switch",
      "input",
      "textarea",
      "radio-group",
      "select",
      "separator",
      "progress",
      "use-toast",
    ],
    dependencies: ["prisma", "@prisma/client"],
    files: [
      {
        path: "dynamic-components/multi-step-form/actions/multi-step-form-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/multi-step-form/components/onboarding-wizard.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/multi-step-form/components/avatar-upload-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/multi-step-form/components/notifications-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/multi-step-form/components/personal-info-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/multi-step-form/components/preferences-form.tsx",
        type: "registry:component",
      },

      {
        path: "dynamic-components/multi-step-form/onboarding/page.tsx",
        target: "app/(multi-step-form)/onboarding/page.tsx",
        type: "registry:page",
      },
    ],
    description: "A multi-step form with progress tracking and validation.",
  },
  {
    name: "quiz",
    type: "registry:dynamic-component",
    registryDependencies: [
      "button",
      "input",
      "card",
      "textarea",
      "form",
      "select",
      "checkbox",
      "radio-group",
      "separator",
      "use-toast",
      "alert-dialog",
      "progress",
    ],
    dependencies: ["prisma", "@prisma/client"],
    files: [
      {
        path: "dynamic-components/quiz/actions/quiz-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/quiz/components/quiz-builder.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/quiz/components/quiz-list.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/quiz/components/quiz-results.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/quiz/components/quiz-taker.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/quiz/lib/types.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/quiz/quizzes/[id]/results/[submissionId]/page.tsx",
        target: "app/(quiz)/quizzes/[id]/results/[submissionId]/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/quiz/quizzes/[id]/take/page.tsx",
        target: "app/(quiz)/quizzes/[id]/take/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/quiz/quizzes/[id]/page.tsx",
        target: "app/(quiz)/quizzes/[id]/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/quiz/quizzes/create/page.tsx",
        target: "app/(quiz)/quizzes/create/page.tsx",
        type: "registry:page",
      },
      {
        path: "dynamic-components/quiz/quizzes/page.tsx",
        target: "app/(quiz)/quizzes/page.tsx",
        type: "registry:page",
      },
    ],
    description:
      "A quiz component with creation, taking, and result viewing functionality.",
  },
  {
    name: "social-auth",
    type: "registry:dynamic-component",
    registryDependencies: ["button", "card", "alert"],
    dependencies: ["prisma", "@prisma/client"],
    files: [
      {
        path: "dynamic-components/social-auth/actions/oauth-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/social-auth/components/oauth-login.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/social-auth/lib/oauth-utils.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/social-auth/social/page.tsx",
        target: "app/(social-auth)/social/page.tsx",
        type: "registry:page",
      },
    ],
    description:
      "A social authentication component that allows users to log in using OAuth provider (Github).",
  },
  {
    name: "two-factor-form",
    type: "registry:dynamic-component",
    registryDependencies: ["button", "card", "alert", "form", "input", "label"],
    dependencies: ["nodemailer", "prisma", "@prisma/client"],
    files: [
      {
        path: "dynamic-components/two-factor-form/actions/two-factor-actions.ts",
        type: "registry:actions",
      },
      {
        path: "lib/db.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/two-factor-form/components/two-factor-form.tsx",
        type: "registry:component",
      },
      {
        path: "dynamic-components/two-factor-form/lib/two-factor-utils.ts",
        type: "registry:lib",
      },
      {
        path: "dynamic-components/two-factor-form/emails/two-factor-template.tsx",
        type: "registry:email",
      },
      {
        path: "dynamic-components/two-factor-form/twoFA/page.tsx",
        target: "app/(two-factor-form)/twoFA/page.tsx",
        type: "registry:page",
      },
    ],
    description:
      "A social authentication component that allows users to log in using OAuth provider (Github).",
  },
];
