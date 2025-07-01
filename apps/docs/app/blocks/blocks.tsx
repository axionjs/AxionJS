"use client";

import { useState } from "react";
import { BlockCard } from "./block-card";
// import { ThemeBar } from "./themebar";
// import { ThemeProvider } from "./theme-provider";
// import { BlockThemeProvider } from "./block-theme-utils";
// import { ThemeSync } from "./theme-sync-utils";

// Import all form components
import LoginForm1 from "@/registry/new-york/blocks/login-form-1";
import LoginForm2 from "@/registry/new-york/blocks/login-form-2";
import { LoginForm3 } from "@/registry/new-york/blocks/login-form-3";
import { SignupForm1 } from "@/registry/new-york/blocks/signup-form-1";
import SignupForm2 from "@/registry/new-york/blocks/signup-form-2";
import SignupForm3 from "@/registry/new-york/blocks/signup-form-3";
import NewsletterForm1 from "@/registry/new-york/blocks/newsletter-form-1";
import NewsletterForm2 from "@/registry/new-york/blocks/newsletter-form-2";
import NewsletterForm3 from "@/registry/new-york/blocks/newsletter-form-3";
import QuestionnaireForm1 from "@/registry/new-york/blocks/questionnaire-form-1";
import QuestionnaireForm2 from "@/registry/new-york/blocks/questionnaire-form-2";
import QuestionnaireForm3 from "@/registry/new-york/blocks/questionnaire-form-3";
import ResetPasswordForm1 from "@/registry/new-york/blocks/reset-password-form-1";
import ResetPasswordForm2 from "@/registry/new-york/blocks/reset-password-form-2";
import ResetPasswordForm3 from "@/registry/new-york/blocks/reset-password-form-3";
import EventRegistrationForm1 from "@/registry/new-york/blocks/event-registration-form-1";
import EventRegistrationForm2 from "@/registry/new-york/blocks/event-registration-form-2";
import EventRegistrationForm3 from "@/registry/new-york/blocks/event-registration-form-3";

// Import new UI components
// Hero components
import HeroApp from "@/registry/new-york/blocks/hero-app";
import HeroCentered from "@/registry/new-york/blocks/hero-centered";
import HeroGradient from "@/registry/new-york/blocks/hero-gradient";
import HeroSimple from "@/registry/new-york/blocks/hero-simple";
import HeroSplit from "@/registry/new-york/blocks/hero-split";
import HeroVideo from "@/registry/new-york/blocks/hero-video";

// Navigation components
import NavbarAnimated from "@/registry/new-york/blocks/navbar-animated";
import NavbarDesktop from "@/registry/new-york/blocks/navbar-desktop";
import NavbarDropdown from "@/registry/new-york/blocks/navbar-dropdown";
import NavbarMobile from "@/registry/new-york/blocks/navbar-mobile";
import NavbarResponsive from "@/registry/new-york/blocks/navbar-responsive";
import NavbarSimple from "@/registry/new-york/blocks/navbar-simple";

// FAQ components
import FaqAccordion from "@/registry/new-york/blocks/faq-accordion";
import FaqGrid from "@/registry/new-york/blocks/faq-grid";
import FaqTabs from "@/registry/new-york/blocks/faq-tabs";

// Footer components
import FooterDark from "@/registry/new-york/blocks/footer-dark";
import FooterMultiColumn from "@/registry/new-york/blocks/footer-multi-column";
import FooterSimple from "@/registry/new-york/blocks/footer-simple";

// Logo components
import LogoCloudFeatured from "@/registry/new-york/blocks/logo-cloud-featured";
import LogoCloudGrid from "@/registry/new-york/blocks/logo-cloud-grid";
import LogoCloudInfinite from "@/registry/new-york/blocks/logo-cloud-infinite";
import LogoCloudSimple from "@/registry/new-york/blocks/logo-cloud-simple";

// Pricing components
import PricingComparison from "@/registry/new-york/blocks/pricing-comparison";
import PricingSimple from "@/registry/new-york/blocks/pricing-simple";
import PricingToggle from "@/registry/new-york/blocks/pricing-toggle";

// Table components
import TableBasic from "@/registry/new-york/blocks/table-basic";
import TableComplex from "@/registry/new-york/blocks/table-complex";
import TableInteractive from "@/registry/new-york/blocks/table-interactive";

// Stats components
import StatsCards from "@/registry/new-york/blocks/stats-cards";
import StatsFeature from "@/registry/new-york/blocks/stats-feature";
import StatsGrid from "@/registry/new-york/blocks/stats-grid";

// CTA components
import CtaCard from "@/registry/new-york/blocks/cta-card";
import CtaCentered from "@/registry/new-york/blocks/cta-centered";

// Testimonial components
import TestimonialsCarousel from "@/registry/new-york/blocks/testimonials-carousel";
import TestimonialsFeatured from "@/registry/new-york/blocks/testimonials-featured";
import TestimonialsGrid from "@/registry/new-york/blocks/testimonials-grid";

// Import the new Bottom Navigation component
import BottomNavigation from "@/app/components/docs/BottomNavigationPreview";

// Component metadata with NPX commands
export const formComponents = [
  {
    category: "Login Forms",
    components: [
      {
        name: "contact-form",
        component: LoginForm1,
        displayName: "Login Form 1",
        description: "Standard login form with card layout",
        installCommand: "npx axionjs-ui add login-form-1",
      },
      {
        name: "login-form-2",
        component: LoginForm2,
        displayName: "Login Form 2",
        description: "Side-by-side login form with gradient background",
        installCommand: "npx axionjs-ui add login-form-2",
      },
      {
        name: "login-form-3",
        component: LoginForm3,
        displayName: "Login Form 3",
        description: "Modern login form with floating labels",
        installCommand: "npx axionjs-ui add login-form-3",
      },
    ],
  },
  {
    category: "Signup Forms",
    components: [
      {
        name: "signup-form-1",
        component: SignupForm1,
        displayName: "Signup Form 1",
        description: "Standard signup form with icons",
        installCommand: "npx axionjs-ui add signup-form-1",
      },
      {
        name: "signup-form-2",
        component: SignupForm2,
        displayName: "Signup Form 2",
        description: "Side-by-side signup form with features",
        installCommand: "npx axionjs-ui add signup-form-2",
      },
      {
        name: "signup-form-3",
        component: SignupForm3,
        displayName: "Signup Form 3",
        description: "Minimal signup form with floating labels",
        installCommand: "npx axionjs-ui add signup-form-3",
      },
    ],
  },
  {
    category: "Newsletter Forms",
    components: [
      {
        name: "newsletter-form-1",
        component: NewsletterForm1,
        displayName: "Newsletter Form 1",
        description: "Simple newsletter subscription form",
        installCommand: "npx axionjs-ui add newsletter-form-1",
      },
      {
        name: "newsletter-form-2",
        component: NewsletterForm2,
        displayName: "Newsletter Form 2",
        description: "Newsletter form with preferences",
        installCommand: "npx axionjs-ui add newsletter-form-2",
      },
      {
        name: "newsletter-form-3",
        component: NewsletterForm3,
        displayName: "Newsletter Form 3",
        description: "Newsletter form with interest selection",
        installCommand: "npx axionjs-ui add newsletter-form-3",
      },
    ],
  },
  {
    category: "Questionnaire Forms",
    components: [
      {
        name: "questionnaire-form-1",
        component: QuestionnaireForm1,
        displayName: "Questionnaire Form 1",
        description: "Product feedback questionnaire",
        installCommand: "npx axionjs-ui add questionnaire-form-1",
      },
      {
        name: "questionnaire-form-2",
        component: QuestionnaireForm2,
        displayName: "Questionnaire Form 2",
        description: "Multi-step questionnaire form",
        installCommand: "npx axionjs-ui add questionnaire-form-2",
      },
      {
        name: "questionnaire-form-3",
        component: QuestionnaireForm3,
        displayName: "Questionnaire Form 3",
        description: "Customer satisfaction survey",
        installCommand: "npx axionjs-ui add questionnaire-form-3",
      },
    ],
  },
  {
    category: "Reset Password Forms",
    components: [
      {
        name: "reset-password-form-1",
        component: ResetPasswordForm1,
        displayName: "Reset Password Form 1",
        description: "Standard password reset form",
        installCommand: "npx axionjs-ui add reset-password-form-1",
      },
      {
        name: "reset-password-form-2",
        component: ResetPasswordForm2,
        displayName: "Reset Password Form 2",
        description: "Multi-step password reset",
        installCommand: "npx axionjs-ui add reset-password-form-2",
      },
      {
        name: "reset-password-form-3",
        component: ResetPasswordForm3,
        displayName: "Reset Password Form 3",
        description: "Minimal password reset form",
        installCommand: "npx axionjs-ui add reset-password-form-3",
      },
    ],
  },
  {
    category: "Event Registration Forms",
    components: [
      {
        name: "event-registration-form-1",
        component: EventRegistrationForm1,
        displayName: "Event Registration Form 1",
        description: "Standard event registration form",
        installCommand: "npx axionjs-ui add event-registration-form-1",
      },
      {
        name: "event-registration-form-2",
        component: EventRegistrationForm2,
        displayName: "Event Registration Form 2",
        description: "Event registration with details",
        installCommand: "npx axionjs-ui add event-registration-form-2",
      },
      {
        name: "event-registration-form-3",
        component: EventRegistrationForm3,
        displayName: "Event Registration Form 3",
        description: "Multi-step event registration",
        installCommand: "npx axionjs-ui add event-registration-form-3",
      },
    ],
  },
  // New component categories
  {
    category: "Hero Sections",
    components: [
      {
        name: "hero-app",
        component: HeroApp,
        displayName: "Hero App",
        description: "App showcase hero section",
        installCommand: "npx axionjs-ui add hero-app",
      },
      {
        name: "hero-centered",
        component: HeroCentered,
        displayName: "Hero Centered",
        description: "Centered hero section with call to action",
        installCommand: "npx axionjs-ui add hero-centered",
      },
      {
        name: "hero-gradient",
        component: HeroGradient,
        displayName: "Hero Gradient",
        description: "Hero section with gradient background",
        installCommand: "npx axionjs-ui add hero-gradient",
      },
      {
        name: "hero-simple",
        component: HeroSimple,
        displayName: "Hero Simple",
        description: "Minimal hero section",
        installCommand: "npx axionjs-ui add hero-simple",
      },
      {
        name: "hero-split",
        component: HeroSplit,
        displayName: "Hero Split",
        description: "Split content hero section",
        installCommand: "npx axionjs-ui add hero-split",
      },
      {
        name: "hero-video",
        component: HeroVideo,
        displayName: "Hero Video",
        description: "Hero section with background video",
        installCommand: "npx axionjs-ui add hero-video",
      },
    ],
  },
  {
    category: "Navigation",
    components: [
      {
        name: "navbar-animated",
        component: NavbarAnimated,
        displayName: "Navbar Animated",
        description: "Animated navigation bar",
        installCommand: "npx axionjs-ui add navbar-animated",
      },

      {
        name: "navbar-bottom-icons",
        component: (props) => <BottomNavigation mode="preview" {...props} />,
        displayName: "Navbar Bottom with Icons",
        description: "All-in-one bottom navigation with preview mode",
        installCommand: "npx axionjs-ui add navbar-bottom-icons",
      },
      {
        name: "navbar-desktop",
        component: NavbarDesktop,
        displayName: "Navbar Desktop",
        description: "Desktop optimized navigation",
        installCommand: "npx axionjs-ui add navbar-desktop",
      },
      {
        name: "navbar-dropdown",
        component: NavbarDropdown,
        displayName: "Navbar Dropdown",
        description: "Navigation with dropdown menus",
        installCommand: "npx axionjs-ui add navbar-dropdown",
      },
      {
        name: "navbar-mobile",
        component: NavbarMobile,
        displayName: "Navbar Mobile",
        description: "Mobile friendly navigation",
        installCommand: "npx axionjs-ui add navbar-mobile",
      },
      {
        name: "navbar-responsive",
        component: NavbarResponsive,
        displayName: "Navbar Responsive",
        description: "Fully responsive navigation bar",
        installCommand: "npx axionjs-ui add navbar-responsive",
      },
      {
        name: "navbar-simple",
        component: NavbarSimple,
        displayName: "Navbar Simple",
        description: "Simple navigation bar",
        installCommand: "npx axionjs-ui add navbar-simple",
      },
    ],
  },
  {
    category: "FAQ Components",
    components: [
      {
        name: "faq-accordion",
        component: FaqAccordion,
        displayName: "FAQ Accordion",
        description: "Expandable FAQ accordion",
        installCommand: "npx axionjs-ui add faq-accordion",
      },
      {
        name: "faq-grid",
        component: FaqGrid,
        displayName: "FAQ Grid",
        description: "Grid-based FAQ layout",
        installCommand: "npx axionjs-ui add faq-grid",
      },
      {
        name: "faq-tabs",
        component: FaqTabs,
        displayName: "FAQ Tabs",
        description: "Tabbed FAQ interface",
        installCommand: "npx axionjs-ui add faq-tabs",
      },
    ],
  },
  {
    category: "Footer Components",
    components: [
      {
        name: "footer-dark",
        component: FooterDark,
        displayName: "Footer Dark",
        description: "Dark-themed footer",
        installCommand: "npx axionjs-ui add footer-dark",
      },
      {
        name: "footer-multi-column",
        component: FooterMultiColumn,
        displayName: "Footer Multi Column",
        description: "Multi-column footer layout",
        installCommand: "npx axionjs-ui add footer-multi-column",
      },
      {
        name: "footer-simple",
        component: FooterSimple,
        displayName: "Footer Simple",
        description: "Simple footer component",
        installCommand: "npx axionjs-ui add footer-simple",
      },
    ],
  },
  {
    category: "Logo Components",
    components: [
      {
        name: "logo-cloud-featured",
        component: LogoCloudFeatured,
        displayName: "Logo Cloud Featured",
        description: "Featured logo cloud display",
        installCommand: "npx axionjs-ui add logo-cloud-featured",
      },
      {
        name: "logo-cloud-grid",
        component: LogoCloudGrid,
        displayName: "Logo Cloud Grid",
        description: "Grid-based logo display",
        installCommand: "npx axionjs-ui add logo-cloud-grid",
      },
      {
        name: "logo-cloud-infinite",
        component: LogoCloudInfinite,
        displayName: "Logo Cloud Infinite",
        description: "Infinite scrolling logo display",
        installCommand: "npx axionjs-ui add logo-cloud-infinite",
      },
      {
        name: "logo-cloud-simple",
        component: LogoCloudSimple,
        displayName: "Logo Cloud Simple",
        description: "Simple logo cloud layout",
        installCommand: "npx axionjs-ui add logo-cloud-simple",
      },
    ],
  },
  {
    category: "Pricing Components",
    components: [
      {
        name: "pricing-comparison",
        component: PricingComparison,
        displayName: "Pricing Comparison",
        description: "Side-by-side pricing comparison",
        installCommand: "npx axionjs-ui add pricing-comparison",
      },
      {
        name: "pricing-simple",
        component: PricingSimple,
        displayName: "Pricing Simple",
        description: "Simple pricing component",
        installCommand: "npx axionjs-ui add pricing-simple",
      },
      {
        name: "pricing-toggle",
        component: PricingToggle,
        displayName: "Pricing Toggle",
        description: "Pricing with monthly/yearly toggle",
        installCommand: "npx axionjs-ui add pricing-toggle",
      },
    ],
  },
  {
    category: "Table Components",
    components: [
      {
        name: "table-basic",
        component: TableBasic,
        displayName: "Table Basic",
        description: "Basic table component",
        installCommand: "npx axionjs-ui add table-basic",
      },
      {
        name: "table-complex",
        component: TableComplex,
        displayName: "Table Complex",
        description: "Feature-rich table component",
        installCommand: "npx axionjs-ui add table-complex",
      },
      {
        name: "table-interactive",
        component: TableInteractive,
        displayName: "Table Interactive",
        description: "Interactive table with sorting and filtering",
        installCommand: "npx axionjs-ui add table-interactive",
      },
    ],
  },
  {
    category: "Stats Components",
    components: [
      {
        name: "stats-cards",
        component: StatsCards,
        displayName: "Stats Cards",
        description: "Statistics display with cards",
        installCommand: "npx axionjs-ui add stats-cards",
      },
      {
        name: "stats-feature",
        component: StatsFeature,
        displayName: "Stats Feature",
        description: "Feature-rich statistics component",
        installCommand: "npx axionjs-ui add stats-feature",
      },
      {
        name: "stats-grid",
        component: StatsGrid,
        displayName: "Stats Grid",
        description: "Grid-based statistics layout",
        installCommand: "npx axionjs-ui add stats-grid",
      },
    ],
  },
  {
    category: "CTA Components",
    components: [
      {
        name: "cta-card",
        component: CtaCard,
        displayName: "CTA Card",
        description: "Card-based call-to-action",
        installCommand: "npx axionjs-ui add cta-card",
      },
      {
        name: "cta-centered",
        component: CtaCentered,
        displayName: "CTA Centered",
        description: "Centered call-to-action component",
        installCommand: "npx axionjs-ui add cta-centered",
      },
    ],
  },
  {
    category: "Testimonial Components",
    components: [
      {
        name: "testimonials-carousel",
        component: TestimonialsCarousel,
        displayName: "Testimonials Carousel",
        description: "Carousel testimonial display",
        installCommand: "npx axionjs-ui add testimonials-carousel",
      },
      {
        name: "testimonials-featured",
        component: TestimonialsFeatured,
        displayName: "Testimonials Featured",
        description: "Featured testimonials component",
        installCommand: "npx axionjs-ui add testimonials-featured",
      },
      {
        name: "testimonials-grid",
        component: TestimonialsGrid,
        displayName: "Testimonials Grid",
        description: "Grid layout for testimonials",
        installCommand: "npx axionjs-ui add testimonials-grid",
      },
    ],
  },
];

function BlocksPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories =
    activeCategory === "all"
      ? formComponents
      : formComponents.filter((cat) => cat.category === activeCategory);

  return (
    <>
      {/* <ThemeSync /> */}

      <div className="container mx-auto py-10 mt-24 mb-12">
        <div className="mb-10 flex items-center justify-center mx-auto">
          <div>
            <h1 className="text-2xl md:text-4xl text-center lg:text-5xl font-bold mb-6 leading-tight">
              UI Blocks Gallery
            </h1>
            <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-7 [&:not(:first-child)]:mt-6">
              A collection of beautiful form components and UI blocks built with
              AxionJS.
            </p>
          </div>
        </div>

        {/* Theme Bar */}
        {/* <ThemeBar /> */}

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Categories
          </button>
          {formComponents.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category.category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Components Display */}
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.category}>
              <h2 className="mb-8 text-2xl font-bold">{category.category}</h2>
              <div className="space-y-0">
                {category.components.map((component) => (
                  <BlockCard key={component.name} blockInfo={component} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function BlocksPage() {
  return (
    // <ThemeProvider>
    //   <BlockThemeProvider>
    <BlocksPageContent />
    //   </BlockThemeProvider>
    // </ThemeProvider>
  );
}
