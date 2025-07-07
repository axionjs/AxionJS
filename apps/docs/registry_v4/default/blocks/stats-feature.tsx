import { ArrowRight } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import Link from "next/link";

export default function StatsFeature() {
  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "100+", label: "Countries" },
    { value: "10M+", label: "API Requests" },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for scale, designed for performance
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Our component library is built on a foundation of performance and
              reliability, ensuring your applications run smoothly even at
              scale.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="#learn-more">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-lg border bg-background p-6 shadow-sm"
              >
                <div className="text-3xl font-bold md:text-4xl">
                  {stat.value}
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
