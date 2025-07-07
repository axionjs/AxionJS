import { Badge } from "@/registry/new-york/ui/badge";

export default function LogoCloudFeatured() {
  const featuredLogos = [
    {
      src: "https://html.tailus.io/blocks/customers/nvidia.svg",
      alt: "Nvidia Logo",
      className: "h-8",
      quote: "Transformed our design workflow",
      author: "John Smith, Design Lead",
    },
    {
      src: "https://html.tailus.io/blocks/customers/github.svg",
      alt: "GitHub Logo",
      className: "h-7",
      quote: "Accelerated our development cycle by 40%",
      author: "Sarah Johnson, CTO",
    },
    {
      src: "https://html.tailus.io/blocks/customers/openai.svg",
      alt: "OpenAI Logo",
      className: "h-9",
      quote: "Essential for our design system",
      author: "Michael Chen, Product Manager",
    },
  ];

  const standardLogos = [
    {
      src: "https://html.tailus.io/blocks/customers/column.svg",
      alt: "Column Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/nike.svg",
      alt: "Nike Logo",
      className: "h-6",
    },
    {
      src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
      alt: "Lemon Squeezy Logo",
      className: "h-6",
    },
    {
      src: "https://html.tailus.io/blocks/customers/laravel.svg",
      alt: "Laravel Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/lilly.svg",
      alt: "Lilly Logo",
      className: "h-8",
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-3">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Powering the world's best products
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Join thousands of companies that trust our component library to
            build beautiful, responsive applications.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featuredLogos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-4 flex h-16 items-center justify-center">
                <img
                  className={`w-auto dark:invert ${logo.className}`}
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width="auto"
                  height={logo.className.replace("h-", "")}
                />
              </div>
              <blockquote className="mt-2 text-muted-foreground">
                "{logo.quote}"
              </blockquote>
              <p className="mt-2 text-sm font-medium">{logo.author}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {standardLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-70 transition-opacity duration-200 hover:opacity-100"
            >
              <img
                className={`w-auto dark:invert ${logo.className}`}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width="auto"
                height={logo.className.replace("h-", "")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
