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
  Tooltip,
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
  { name: "Starting", value: 4000, isTotal: true },
  { name: "Product A", value: 1000, isTotal: false },
  { name: "Product B", value: 2000, isTotal: false },
  { name: "Product C", value: -500, isTotal: false },
  { name: "Product D", value: 1500, isTotal: false },
  { name: "Ending", value: 4000, isTotal: true },
];

// Calculate running total for waterfall effect
const processedData = chartData.map((item, index, array) => {
  if (item.isTotal) {
    return { ...item, start: 0, end: item.value };
  }

  const start = array
    .slice(0, index)
    .reduce(
      (sum, entry) => (entry.isTotal ? entry.value : sum + entry.value),
      0,
    );

  return {
    ...item,
    start,
    end: start + item.value,
    fill: item.value >= 0 ? "var(--color-positive)" : "var(--color-negative)",
  };
});

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
  positive: {
    label: "Increase",
    color: "hsl(var(--chart-3))",
  },
  negative: {
    label: "Decrease",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

// Custom bar shape to create waterfall effect
const CustomBar = (props) => {
  const { x, y, width, height, value, index, fill, dataKey, ...rest } = props;
  const item = processedData[index];

  if (item.isTotal) {
    // Total bars start from 0
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={chartConfig.total.color}
        rx={4}
        ry={4}
        {...rest}
      />
    );
  } else {
    // For waterfall effect, we need to calculate proper y position
    const yPos =
      value >= 0
        ? y // Positive bars grow upward from start
        : y - height; // Negative bars grow downward from start

    return (
      <rect
        x={x}
        y={yPos}
        width={width}
        height={Math.abs(height)}
        fill={
          value >= 0 ? chartConfig.positive.color : chartConfig.negative.color
        }
        rx={4}
        ry={4}
        {...rest}
      />
    );
  }
};

export function WaterfallChart() {
  // Convert data to format needed for the waterfall chart
  const waterfallData = processedData.map((item) => ({
    name: item.name,
    value: item.value,
    // For proper display, use start value for y-axis positioning
    displayValue: item.isTotal ? item.value : item.value,
    isTotal: item.isTotal,
    // Store both start and end for rendering the connecting lines
    start: item.start,
    end: item.end,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waterfall Chart</CardTitle>
        <CardDescription>Revenue contribution by product</CardDescription>
      </CardHeader>
      <CardContent className="h-auto px-0 pb-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={waterfallData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              barGap={0}
              maxBarSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => "$" + value}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => {
                      // Format the tooltip display value
                      return "$" + Math.abs(value).toLocaleString();
                    }}
                    labelFormatter={(name) => {
                      // Add additional context to label
                      const item = waterfallData.find((d) => d.name === name);
                      if (item && !item.isTotal) {
                        return (
                          name +
                          ": " +
                          (item.value >= 0 ? "Increase" : "Decrease")
                        );
                      }
                      return name;
                    }}
                  />
                }
              />

              {/* Draw connecting lines between bars */}
              {waterfallData.map((entry, index, array) => {
                if (index < array.length - 1) {
                  return (
                    <ReferenceLine
                      key={"connector-" + index}
                      x={index + 0.5}
                      y={entry.end}
                      stroke="hsl(var(--border))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                      ifOverflow="hidden"
                    />
                  );
                }
                return null;
              })}

              {/* Draw horizonal baseline for each non-total item */}
              {waterfallData.map((entry, index) => {
                if (!entry.isTotal) {
                  return (
                    <ReferenceLine
                      key={"baseline-" + index}
                      x={index}
                      y={entry.start}
                      stroke="hsl(var(--border))"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    />
                  );
                }
                return null;
              })}

              <Bar
                dataKey="value"
                shape={<CustomBar />}
                isAnimationActive={true}
              >
                {waterfallData.map((entry, index) => (
                  <Cell
                    key={"cell-" + index}
                    fill={
                      entry.isTotal
                        ? chartConfig.total.color
                        : entry.value >= 0
                          ? chartConfig.positive.color
                          : chartConfig.negative.color
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          100% increase in revenue <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Product B contributed the most to growth
        </div>
      </CardFooter>
    </Card>
  );
}
