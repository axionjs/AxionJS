import { Registry } from "@/registry/schema";

export const dynamicComponents: Registry["items"] = [
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
    registryDependencies: ["button", "input", "table", "use-toast", "toaster"],
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
    registryDependencies: ["button", "alert-dialog", "card", "progress"],
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
];
