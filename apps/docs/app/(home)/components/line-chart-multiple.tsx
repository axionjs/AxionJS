"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
} from "@/registry/new-york/ui/chart";
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
    <Card className="w-full h-full min-h-[300px] sm:min-h-[400px] flex flex-col">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">
          <Badge variant="secondary" className="text-xs">
            Line Chart - Multiple
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 flex-1 flex flex-col">
        <div className="w-full flex-1 min-h-[200px] sm:min-h-[250px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 4, right: 4, top: 8, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => v.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
