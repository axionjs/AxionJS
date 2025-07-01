"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { Badge } from "@/registry/default/ui/badge";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    // no color here so ChartStyle won't inject CSS vars
  },
  mobile: {
    label: "Mobile",
    // no color here
  },
} satisfies ChartConfig;

export function LineChartMultiple() {
  return (
    <Card className=" max-h-[400px]">
      <CardHeader>
        <CardTitle>
          <Badge variant="secondary" className="text-xs">
            Line Chart - Multiple
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] sm:h-[400px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => v.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="hsl(209,24%,13%)" // hardcoded color
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="hsl(270,94%,30%)" // hardcoded color
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
