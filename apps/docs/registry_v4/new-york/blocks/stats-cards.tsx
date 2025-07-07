import { Card, CardContent } from "@/registry/new-york/ui/card";
import { ArrowUpRight, Users, Code, Star, Download } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Active Users",
      value: "2.4M+",
      change: "+24.3%",
      icon: <Users className="h-4 w-4" />,
      description: "Monthly active users across all platforms",
    },
    {
      title: "registry/new-york",
      value: "150+",
      change: "+12 this month",
      icon: <Code className="h-4 w-4" />,
      description: "Ready-to-use UI registry/new-york",
    },
    {
      title: "GitHub Stars",
      value: "15.2K",
      change: "+1.2K",
      icon: <Star className="h-4 w-4" />,
      description: "Open source community support",
    },
    {
      title: "Downloads",
      value: "3.8M",
      change: "+32.7%",
      icon: <Download className="h-4 w-4" />,
      description: "Package downloads in the last month",
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Growth in Numbers
          </h2>
          <p className="mt-4 text-muted-foreground">
            Metrics that showcase the impact and adoption of our component
            library.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {stat.icon}
                  </span>
                  <div className="flex items-center text-sm font-medium text-green-500">
                    {stat.change}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </h3>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
