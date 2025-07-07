"use client";

import { TrendingUp } from "lucide-react";
import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { name: "Visitors", value: 5000, fill: "var(--color-visitors)" },
  { name: "Leads", value: 2500, fill: "var(--color-leads)" },
  { name: "Prospects", value: 1250, fill: "var(--color-prospects)" },
  { name: "Customers", value: 600, fill: "var(--color-customers)" },
  { name: "Repeat Buyers", value: 300, fill: "var(--color-repeat)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-2))",
  },
  prospects: {
    label: "Prospects",
    color: "hsl(var(--chart-3))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-4))",
  },
  repeat: {
    label: "Repeat Buyers",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function FunnelChartComponent() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Funnel Chart</CardTitle>
        <CardDescription>Sales conversion funnel</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center px-2 pb-0">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart
              margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
              isAnimationActive={true}
              animationDuration={800}
            >
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => value.toLocaleString() + " users"}
                  />
                }
              />
              <Funnel
                dataKey="value"
                data={chartData}
                isAnimationActive={true}
                animationDuration={800}
                labelLine={false}
              >
                <LabelList
                  position="right"
                  fill="var(--foreground)"
                  stroke="none"
                  dataKey="name"
                  className="text-sm font-medium"
                />
                <LabelList
                  position="left"
                  fill="var(--foreground)"
                  stroke="none"
                  dataKey="value"
                  formatter={(value) => value.toLocaleString()}
                  className="text-sm"
                />
                {chartData.map((entry, index) => (
                  <Cell key={"cell-" + index} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          6% conversion rate from visitor to customer{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Q2 2024 sales funnel data
        </div>
      </CardFooter>
    </Card>
  );
}
