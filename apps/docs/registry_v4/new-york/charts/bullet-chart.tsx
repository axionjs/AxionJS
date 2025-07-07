"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  XAxis,
  YAxis,
  ResponsiveContainer,
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

const chartData = [
  {
    name: "Revenue",
    actual: 8200,
    target: 8000,
    poor: 6000,
    satisfactory: 7000,
    good: 8000,
    excellent: 9000,
    type: "currency",
  },
  {
    name: "Profit",
    actual: 4100,
    target: 4000,
    poor: 3000,
    satisfactory: 3500,
    good: 4000,
    excellent: 4500,
    type: "currency",
  },
  {
    name: "New Customers",
    actual: 950,
    target: 1000,
    poor: 800,
    satisfactory: 900,
    good: 1000,
    excellent: 1100,
    type: "count",
  },
];

const chartConfig = {
  actual: {
    label: "Actual",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
  poor: {
    label: "Poor",
    color: "hsl(var(--chart-3) / 0.2)",
  },
  satisfactory: {
    label: "Satisfactory",
    color: "hsl(var(--chart-3) / 0.4)",
  },
  good: {
    label: "Good",
    color: "hsl(var(--chart-3) / 0.6)",
  },
  excellent: {
    label: "Excellent",
    color: "hsl(var(--chart-3) / 0.8)",
  },
} satisfies ChartConfig;

// Helper function for formatting values based on type
const formatValue = (value, type) => {
  if (type === "currency") {
    return "$" + value.toLocaleString();
  }
  return value.toLocaleString();
};

export function BulletChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bullet Chart</CardTitle>
        <CardDescription>Performance metrics against targets</CardDescription>
      </CardHeader>
      <CardContent className="h-auto px-0 pb-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              layout="vertical"
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  // Format the tick based on the chart item it's closest to
                  // We'll use a simple heuristic based on the value ranges
                  if (value >= 5000) {
                    return "$" + (value / 1000).toFixed(0) + "k";
                  } else if (value >= 1000) {
                    return "$" + (value / 1000).toFixed(1) + "k";
                  } else {
                    return value;
                  }
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => {
                      const item = props.payload;
                      if (item && item.type) {
                        return formatValue(value, item.type);
                      }
                      return value;
                    }}
                  />
                }
              />
              <Bar
                dataKey="excellent"
                fill={chartConfig.excellent.color}
                radius={0}
                barSize={20}
              />
              <Bar
                dataKey="good"
                fill={chartConfig.good.color}
                radius={0}
                barSize={20}
              />
              <Bar
                dataKey="satisfactory"
                fill={chartConfig.satisfactory.color}
                radius={0}
                barSize={20}
              />
              <Bar
                dataKey="poor"
                fill={chartConfig.poor.color}
                radius={0}
                barSize={20}
              />
              <Bar
                dataKey="actual"
                fill={chartConfig.actual.color}
                radius={0}
                barSize={10}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={"cell-" + index}
                    fill={
                      entry.actual >= entry.target
                        ? chartConfig.actual.color
                        : "hsl(var(--destructive))"
                    }
                  />
                ))}
              </Bar>
              {chartData.map((entry, index) => (
                <ReferenceLine
                  key={"ref-" + index}
                  y={entry.name}
                  x={entry.target}
                  stroke={chartConfig.target.color}
                  strokeWidth={2}
                  isFront
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Revenue and profit exceeded targets <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Q2 2024 performance metrics
        </div>
      </CardFooter>
    </Card>
  );
}
