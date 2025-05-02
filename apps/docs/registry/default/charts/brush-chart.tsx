"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Brush, CartesianGrid, XAxis, YAxis } from "recharts";

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
  { date: "2024-01-01", value: 4000 },
  { date: "2024-01-15", value: 4200 },
  { date: "2024-02-01", value: 5000 },
  { date: "2024-02-15", value: 5200 },
  { date: "2024-03-01", value: 4500 },
  { date: "2024-03-15", value: 4700 },
  { date: "2024-04-01", value: 6000 },
  { date: "2024-04-15", value: 6200 },
  { date: "2024-05-01", value: 7000 },
  { date: "2024-05-15", value: 7200 },
  { date: "2024-06-01", value: 8000 },
  { date: "2024-06-15", value: 8200 },
];

const chartConfig = {
  value: {
    label: "Stock Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BrushChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brush Chart</CardTitle>
        <CardDescription>Stock price with time range selection</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.getMonth() + 1 + "/" + date.getDate();
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => "$" + value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => "$" + value}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              fill="var(--color-value)"
              fillOpacity={0.3}
            />
            <Brush
              dataKey="date"
              height={30}
              stroke="var(--color-value)"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.getMonth() + 1 + "/" + date.getDate();
              }}
              startIndex={2}
              endIndex={8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Stock price up 105% in 6 months <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Use the brush below to select a time range
        </div>
      </CardFooter>
    </Card>
  );
}
