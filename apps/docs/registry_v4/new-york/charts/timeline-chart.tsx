"use client";

import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

const milestones = [
  { date: "2024-01-15", event: "Project Start" },
  { date: "2024-02-10", event: "Design Phase Complete" },
  { date: "2024-03-05", event: "Development Milestone 1" },
  { date: "2024-04-20", event: "Testing Phase" },
  { date: "2024-05-15", event: "Beta Release" },
  { date: "2024-06-30", event: "Product Launch" },
];

const progressData = [
  { date: "2024-01-01", progress: 0 },
  { date: "2024-01-15", progress: 5 },
  { date: "2024-02-01", progress: 15 },
  { date: "2024-02-10", progress: 25 },
  { date: "2024-02-15", progress: 30 },
  { date: "2024-03-01", progress: 40 },
  { date: "2024-03-05", progress: 45 },
  { date: "2024-03-15", progress: 50 },
  { date: "2024-04-01", progress: 60 },
  { date: "2024-04-20", progress: 70 },
  { date: "2024-05-01", progress: 80 },
  { date: "2024-05-15", progress: 85 },
  { date: "2024-06-01", progress: 95 },
  { date: "2024-06-30", progress: 100 },
];

const chartConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-1))",
  },
  milestone: {
    label: "Milestone",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TimelineChart() {
  // Function to determine optimal label position based on milestone index
  const getLabelPosition = (index) => {
    // Alternate positions to reduce overlap
    return index % 2 === 0 ? "top" : "bottom";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Chart</CardTitle>
        <CardDescription>Project progress and milestones</CardDescription>
      </CardHeader>
      <CardContent className="h-auto">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={progressData}
              margin={{ top: 40, right: 30, bottom: 40, left: 30 }}
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
                domain={[0, 100]}
                tickFormatter={(value) => value + "%"}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => value + "%"}
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
              <Line
                type="monotone"
                dataKey="progress"
                stroke={chartConfig.progress.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.progress.color, r: 4 }}
              />
              {milestones.map((milestone, index) => (
                <ReferenceLine
                  key={"milestone-" + index}
                  x={milestone.date}
                  stroke={chartConfig.milestone.color}
                  strokeDasharray="3 3"
                  label={{
                    value: milestone.event,
                    position: getLabelPosition(index),
                    fill: chartConfig.milestone.color,
                    fontSize: 10,
                    angle: -35,
                    offset: 15,
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Project on track for June 30 launch <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Vertical lines indicate key milestones
        </div>
      </CardFooter>
    </Card>
  );
}
