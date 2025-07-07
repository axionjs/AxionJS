import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function CTACard() {
  const features = [
    "Responsive components",
    "Accessible by default",
    "Dark mode support",
    "Customizable themes",
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <Card className="mx-auto max-w-4xl overflow-hidden border-none bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  Start building today
                </h2>
                <p className="text-muted-foreground">
                  Our component library provides everything you need to build
                  beautiful, accessible web applications.
                </p>
                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="rounded-lg bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Get started for free</h3>
                    <p className="text-sm text-muted-foreground">
                      No credit card required. Upgrade anytime.
                    </p>
                    <Button asChild className="w-full" size="lg">
                      <Link href="#get-started">
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="#login"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
