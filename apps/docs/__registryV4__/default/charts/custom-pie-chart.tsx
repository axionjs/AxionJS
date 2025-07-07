"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { useState } from "react";

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
  { name: "Mobile", value: 45, fill: "var(--color-mobile)" },
  { name: "Desktop", value: 35, fill: "var(--color-desktop)" },
  { name: "Tablet", value: 20, fill: "var(--color-tablet)" },
];

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-1))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fill="var(--foreground)"
        className="text-lg font-bold"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        fill="var(--foreground)"
        className="text-sm"
      >
        {value + " (" + (percent * 100).toFixed(0) + "%)"}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function CustomPieChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Pie Chart</CardTitle>
        <CardDescription>Device usage distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart
            accessibilityLayer
            width={500}
            height={300}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    value + " users (" + ((value / 100) * 100).toFixed(0) + "%)"
                  }
                />
              }
            />
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onClick={(_, index) => setActiveIndex(index)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={"cell-" + index}
                  fill={entry.fill}
                  className="transition-colors duration-300 outline-none"
                  tabIndex={0}
                  role="button"
                  aria-label={entry.name + ": " + entry.value + " users"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Mobile usage leads at 45% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hover or click on segments for details
        </div>
      </CardFooter>
    </Card>
  );
}
