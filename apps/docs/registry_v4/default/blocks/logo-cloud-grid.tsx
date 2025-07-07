import { Button } from "@/registry/default/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LogoCloudGrid() {
  const logos = [
    {
      src: "https://html.tailus.io/blocks/customers/nvidia.svg",
      alt: "Nvidia Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/column.svg",
      alt: "Column Logo",
      className: "h-4",
    },
    {
      src: "https://html.tailus.io/blocks/customers/github.svg",
      alt: "GitHub Logo",
      className: "h-4",
    },
    {
      src: "https://html.tailus.io/blocks/customers/nike.svg",
      alt: "Nike Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
      alt: "Lemon Squeezy Logo",
      className: "h-5",
    },
    {
      src: "https://html.tailus.io/blocks/customers/laravel.svg",
      alt: "Laravel Logo",
      className: "h-4",
    },
    {
      src: "https://html.tailus.io/blocks/customers/lilly.svg",
      alt: "Lilly Logo",
      className: "h-7",
    },
    {
      src: "https://html.tailus.io/blocks/customers/openai.svg",
      alt: "OpenAI Logo",
      className: "h-6",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Trusted by industry leaders
            </h2>
            <p className="text-muted-foreground">
              Join thousands of companies using our library
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="#case-studies">
              View case studies
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4 lg:mt-12">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex h-16 w-full items-center justify-center rounded-lg border bg-background p-4 transition-all duration-200 hover:scale-105 hover:shadow-md">
                <img
                  className={`w-auto dark:invert ${logo.className}`}
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width="auto"
                  height={logo.className.replace("h-", "")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
