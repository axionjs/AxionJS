export const siteConfig = {
  name: "Axionjs",
  url: "https://axionjs.com",
  ogImage: "https://axionjs/og.jpg",
  description:
    "AxionJS is a revolutionary component system for Next.js that gives you full ownership of your UI code. Built on top of Radix UI primitives with accessibility-first design and AI-powered component generation.",
  links: {
    github: "https://github.com/axionjs/AxionJS",
  },
};

export function SiteFooter() {
  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 my-6 3xl:fixed:bg-transparent dark:bg-transparent text-primary">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full text-center text-xs leading-loose sm:text-sm">
            Built by AxionJS at NTU. The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
