import { Registry } from "@/registry/schema";

export const blocks: Registry["items"] = [
  {
    name: "login-01",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "form"],
    dependencies: ["react-icons"],
    files: [
      {
        path: "blocks/login-01/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-01/components/login-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-01/components/card-wrapper.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-01/components/social.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
    description: "A simple login page.",
  },
  {
    name: "login-02",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "form"],
    dependencies: ["react-icons"],
    files: [
      {
        path: "blocks/login-02/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-02/components/login-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-02/components/card-wrapper.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-02/components/social.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/login-02/images/placeholder.svg",
        target: "public/placeholder.svg",
        type: "registry:file",
      },
      {
        path: "blocks/login-02/images/login-logo.svg",
        target: "public/login-logo.svg",
        type: "registry:file",
      },
    ],
    categories: ["authentication", "login"],
    description: "A two column login page with a cover image.",
  },

  {
    name: "animated-group",
    type: "registry:block",
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/animated-group.tsx",
        type: "registry:component",
      },
    ],
    description: "A simple animated group block.",
  },
  {
    name: "cta-card",
    type: "registry:block",
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "blocks/cta-card.tsx",
        type: "registry:component",
      },
    ],
    description: "A simple call to action card block.",
  },
  {
    name: "cta-centered",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/cta-centered.tsx",
        type: "registry:component",
      },
    ],
    description: "A centered call to action block.",
  },
  {
    name: "event-registration-form-1",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "card",
      "radio-group",
      "checkbox",
      "select",
      "use-toast",
      "badge",
      "tooltip",
    ],
    files: [
      {
        path: "blocks/event-registration-form-1.tsx",
        type: "registry:component",
      },
    ],
    description: "A form for event registration.",
  },
  {
    name: "event-registration-form-2",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "card",
      "textarea",
      "checkbox",
      "select",
      "use-toast",
      "separator",
    ],
    files: [
      {
        path: "blocks/event-registration-form-2.tsx",
        type: "registry:component",
      },
    ],
    description: "A form for event registration.",
  },
  {
    name: "event-registration-form-3",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "checkbox",
      "use-toast",
      "radio-group",
    ],
    files: [
      {
        path: "blocks/event-registration-form-3.tsx",
        type: "registry:component",
      },
    ],
    description: "A form for event registration.",
  },
  {
    name: "faq-accordion",
    type: "registry:block",
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/faq-accordion.tsx",
        type: "registry:component",
      },
    ],
    description: "A FAQ accordion component.",
  },
  {
    name: "faq-grid",
    type: "registry:block",
    dependencies: ["motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/faq-grid.tsx",
        type: "registry:component",
      },
    ],
    description: "A FAQ grid component.",
  },
  {
    name: "faq-tabs",
    type: "registry:block",
    dependencies: ["motion"],
    registryDependencies: ["tabs", "input"],
    files: [
      {
        path: "blocks/faq-tabs.tsx",
        type: "registry:component",
      },
    ],
    description: "A FAQ tabs component.",
  },
  {
    name: "footer-dark",
    type: "registry:block",
    registryDependencies: ["logo", "input", "button"],
    files: [
      {
        path: "blocks/footer-dark.tsx",
        type: "registry:component",
      },
    ],
    description: "A dark footer component.",
  },
  {
    name: "footer-multi-column",
    type: "registry:block",
    registryDependencies: ["logo", "input", "button"],
    files: [
      {
        path: "blocks/footer-multi-column.tsx",
        type: "registry:component",
      },
    ],
    description: "A multi-column footer component.",
  },
  {
    name: "footer-simple",
    type: "registry:block",
    registryDependencies: ["logo"],
    files: [
      {
        path: "blocks/footer-simple.tsx",
        type: "registry:component",
      },
    ],
    description: "A simple footer component.",
  },
  {
    name: "hero-app",
    type: "registry:block",
    registryDependencies: ["button", "badge"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/hero-app.tsx",
        type: "registry:component",
      },
    ],
    description: "A hero app component.",
  },
  {
    name: "hero-centered",
    type: "registry:block",
    registryDependencies: ["button", "badge"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/hero-centered.tsx",
        type: "registry:component",
      },
    ],
    description: "A centered hero component.",
  },
  {
    name: "hero-gradient",
    type: "registry:block",
    registryDependencies: ["button"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/hero-gradient.tsx",
        type: "registry:component",
      },
    ],
    description: "A gradient hero component.",
  },
  {
    name: "hero-simple",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero-simple.tsx",
        type: "registry:component",
      },
    ],
    description: "A simple hero component.",
  },
  {
    name: "hero-split",
    type: "registry:block",
    registryDependencies: ["button"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/hero-split.tsx",
        type: "registry:component",
      },
    ],
    description: "A split hero component.",
  },
  {
    name: "hero-video",
    type: "registry:block",
    registryDependencies: ["button", "dialog"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/hero-video.tsx",
        type: "registry:component",
      },
    ],
    description: "A video hero component.",
  },
  {
    name: "infinite-slider",
    type: "registry:block",
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/infinite-slider.tsx",
        type: "registry:component",
      },
    ],
    description: "An infinite slider component.",
  },
  {
    name: "login-form-1",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "card",
      "checkbox",
      "use-toast",
      "password-input",
    ],
    files: [
      {
        path: "blocks/login-form-1.tsx",
        type: "registry:component",
      },
    ],
    description: "A login form component.",
  },
  {
    name: "login-form-2",
    type: "registry:block",
    registryDependencies: ["button", "input", "form", "checkbox", "use-toast"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/login-form-2.tsx",
        type: "registry:component",
      },
    ],
    description: "A login form component.",
  },
  {
    name: "login-form-3",
    type: "registry:block",
    registryDependencies: ["button", "input", "form", "use-toast"],
    files: [
      {
        path: "blocks/login-form-3.tsx",
        type: "registry:component",
      },
    ],
    description: "A login form component.",
  },
  {
    name: "logo-cloud-featured",
    type: "registry:block",
    registryDependencies: ["badge"],
    files: [
      {
        path: "blocks/logo-cloud-featured.tsx",
        type: "registry:component",
      },
    ],
    description: "A logo cloud featured component.",
  },
  {
    name: "logo-cloud-grid",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/logo-cloud-grid.tsx",
        type: "registry:component",
      },
    ],
    description: "A logo cloud grid component.",
  },
  {
    name: "logo-cloud-infinite",
    type: "registry:block",
    files: [
      {
        path: "blocks/logo-cloud-infinite.tsx",
        type: "registry:component",
      },
    ],
    description: "A logo cloud infinite component.",
  },
  {
    name: "logo-cloud-simple",
    type: "registry:block",
    files: [
      {
        path: "blocks/logo-cloud-simple.tsx",
        type: "registry:component",
      },
    ],
    description: "A logo cloud simple component.",
  },
  {
    name: "navbar-animated",
    type: "registry:block",
    registryDependencies: ["button", "input", "avatar", "sheet", "logo"],
    files: [
      {
        path: "blocks/navbar-animated.tsx",
        type: "registry:component",
      },
    ],
    description: "A navbar animated component.",
  },
  {
    name: "navbar-bottom-icons",
    type: "registry:block",
    registryDependencies: ["button", "separator", "tooltip"],
    files: [
      {
        path: "blocks/navbar-bottom-icons.tsx",
        type: "registry:component",
      },
    ],
    description: "A navbar bottom icons component.",
  },
  {
    name: "navbar-desktop",
    type: "registry:block",
    registryDependencies: ["button", "logo", "navigation-menu", "mode-toggle"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/navbar-desktop.tsx",
        type: "registry:component",
      },
    ],
    description: "A navbar desktop component.",
  },
  {
    name: "navbar-dropdown",
    type: "registry:block",
    registryDependencies: ["button", "dropdown-menu"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/navbar-dropdown.tsx",
        type: "registry:component",
      },
    ],
    description: "A navbar dropdown component.",
  },
  {
    name: "navbar-mobile",
    type: "registry:block",
    registryDependencies: ["button", "logo", "sheet", "mode-toggle"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/navbar-mobile.tsx",
        type: "registry:component",
      },
    ],
    description: "A navbar mobile component.",
  },
  {
    name: "navbar-responsive",
    type: "registry:block",
    registryDependencies: ["button", "input", "sheet"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/navbar-responsive.tsx",
        type: "registry:component",
      },
    ],
    description: "A navbar responsive component.",
  },
  {
    name: "navbar-simple",
    type: "registry:block",
    registryDependencies: ["button"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/navbar-simple.tsx",
        type: "registry:component",
      },
    ],
    description: "A simple navbar component.",
  },
  {
    name: "newsletter-form-1",
    type: "registry:block",
    registryDependencies: ["button", "input", "form", "use-toast"],
    files: [
      {
        path: "blocks/newsletter-form-1.tsx",
        type: "registry:component",
      },
    ],
    description: "A newsletter form component.",
  },
  {
    name: "newsletter-form-2",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "use-toast",
      "checkbox",
      "switch",
      "tooltip",
    ],
    files: [
      {
        path: "blocks/newsletter-form-2.tsx",
        type: "registry:component",
      },
    ],
    description: "A newsletter form component.",
  },
  {
    name: "newsletter-form-3",
    type: "registry:block",
    registryDependencies: ["button", "input", "form", "use-toast", "select"],
    files: [
      {
        path: "blocks/newsletter-form-3.tsx",
        type: "registry:component",
      },
    ],
    description: "A newsletter form component.",
  },
  {
    name: "pricing-comparison",
    type: "registry:block",
    registryDependencies: ["button", "badge", "table", "use-media-query"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/pricing-comparison.tsx",
        type: "registry:component",
      },
    ],
    description: "A pricing comparison component.",
  },
  {
    name: "pricing-simple",
    type: "registry:block",
    registryDependencies: ["button", "badge", "separator"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/pricing-simple.tsx",
        type: "registry:component",
      },
    ],
    description: "A simple pricing component.",
  },
  {
    name: "pricing-toggle",
    type: "registry:block",
    registryDependencies: ["button", "badge", "separator", "tabs", "tooltip"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/pricing-toggle.tsx",
        type: "registry:component",
      },
    ],
    description: "A toggle pricing component.",
  },
  {
    name: "progressive-blur",
    type: "registry:block",
    files: [
      {
        path: "blocks/progressive-blur.tsx",
        type: "registry:component",
      },
    ],
    description: "A progressive blur component.",
  },
  {
    name: "questionnaire-form-1",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "card",
      "radio-group",
      "checkbox",
      "textarea",
      "use-toast",
    ],
    files: [
      {
        path: "blocks/questionnaire-form-1.tsx",
        type: "registry:component",
      },
    ],
    description: "A questionnaire form.",
  },
  {
    name: "questionnaire-form-2",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "separator",
      "progress",
      "radio-group",
      "checkbox",
      "textarea",
      "use-toast",
    ],
    files: [
      {
        path: "blocks/questionnaire-form-2.tsx",
        type: "registry:component",
      },
    ],
    description: "A questionnaire form.",
  },
  {
    name: "questionnaire-form-3",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "checkbox",
      "textarea",
      "use-toast",
    ],
    files: [
      {
        path: "blocks/questionnaire-form-3.tsx",
        type: "registry:component",
      },
    ],
    description: "A questionnaire form.",
  },
  {
    name: "reset-password-form-1",
    type: "registry:block",
    registryDependencies: ["button", "input", "form", "card", "alert"],
    files: [
      {
        path: "blocks/reset-password-form-1.tsx",
        type: "registry:component",
      },
    ],
    description: "A reset password form.",
  },
  {
    name: "reset-password-form-2",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "password-input",
      "use-toast",
    ],
    files: [
      {
        path: "blocks/reset-password-form-2.tsx",
        type: "registry:component",
      },
    ],
    description: "A reset password form.",
  },
  {
    name: "reset-password-form-3",
    type: "registry:block",
    registryDependencies: ["button", "input", "form"],
    files: [
      {
        path: "blocks/reset-password-form-3.tsx",
        type: "registry:component",
      },
    ],
    description: "A reset password form.",
  },
  // {
  //   name: "signup-form-1",
  //   type: "registry:block",
  //   registryDependencies: [
  //     "button",
  //     "input",
  //     "form",
  //     "card",
  //     "use-toast",
  //     "password-input",
  //     "toast",
  //   ],
  //   files: [
  //     {
  //       path: "blocks/signup-form-1.tsx",
  //       type: "registry:component",
  //     },
  //     {
  //       path: "apps/docs/actions/auth-actions.ts",
  //       type: "registry:actions",
  //     },
  //   ],
  //   description: "A signup form.",
  // },
  {
    name: "signup-form-2",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "checkbox",
      "use-toast",
      "password-input",
      "separator",
      "badge",
    ],
    files: [
      {
        path: "blocks/signup-form-2.tsx",
        type: "registry:component",
      },
    ],
    description: "A signup form.",
  },
  {
    name: "signup-form-3",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "form",
      "checkbox",
      "use-toast",
      "password-input",
    ],
    files: [
      {
        path: "blocks/signup-form-3.tsx",
        type: "registry:component",
      },
    ],
    description: "A signup form.",
  },
  {
    name: "stats-cards",
    type: "registry:block",
    registryDependencies: ["card"],
    files: [
      {
        path: "blocks/stats-cards.tsx",
        type: "registry:component",
      },
    ],
    description: "A stats cards component.",
  },
  {
    name: "stats-feature",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/stats-feature.tsx",
        type: "registry:component",
      },
    ],
    description: "A stats feature component.",
  },
  {
    name: "stats-grid",
    type: "registry:block",
    files: [
      {
        path: "blocks/stats-grid.tsx",
        type: "registry:component",
      },
    ],
    description: "A stats grid component.",
  },
  {
    name: "table-basic",
    type: "registry:block",
    registryDependencies: ["table", "badge", "avatar"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/table-basic.tsx",
        type: "registry:component",
      },
    ],
    description: "A basic table component.",
  },
  {
    name: "table-complex",
    type: "registry:block",
    registryDependencies: ["table"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/table-complex.tsx",
        type: "registry:component",
      },
    ],
    description: "A complex table component.",
  },
  {
    name: "table-interactive",
    type: "registry:block",
    registryDependencies: ["table", "button", "input", "dropdown-menu"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/table-interactive.tsx",
        type: "registry:component",
      },
    ],
    description: "An interactive table component.",
  },
  {
    name: "testimonials-carousel",
    type: "registry:block",
    registryDependencies: ["card", "button", "avatar"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/testimonials-carousel.tsx",
        type: "registry:component",
      },
    ],
    description: "An testimonials carousel component.",
  },
  {
    name: "testimonials-featured",
    type: "registry:block",
    registryDependencies: ["card", "avatar", "badge"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/testimonials-featured.tsx",
        type: "registry:component",
      },
    ],
    description: "An featured testimonials component.",
  },
  {
    name: "testimonials-grid",
    type: "registry:block",
    registryDependencies: ["card", "avatar"],
    dependencies: ["motion"],
    files: [
      {
        path: "blocks/testimonials-grid.tsx",
        type: "registry:component",
      },
    ],
    description: "A grid of testimonials.",
  },
];
