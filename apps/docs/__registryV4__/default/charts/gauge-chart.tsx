"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

const chartConfig = {
  value: {
    label: "Progress",
    color: "hsl(var(--chart-1))",
  },
  remaining: {
    label: "Remaining",
    color: "hsl(var(--chart-2) / 0.2)",
  },
} satisfies ChartConfig;

export function GaugeChart() {
  const value = 72; // Percentage value
  const chartData = [
    { name: "value", value, fill: "var(--color-value)" },
    { name: "remaining", value: 100 - value, fill: "var(--color-remaining)" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gauge Chart</CardTitle>
        <CardDescription>Project completion status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart
            accessibilityLayer
            width={500}
            height={300}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              isAnimationActive
              cornerRadius={5}
              stroke="none"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-3xl font-bold"
            >
              {value}%
            </text>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-sm"
            >
              Completed
            </text>
            {/* Use Sector instead of Arc for the outer ring */}
            <Sector
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={86}
              startAngle={180}
              endAngle={0}
              fill="none"
              stroke="var(--border)"
            />
            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = 180 - (tick / 100) * 180;
              const radian = (angle * Math.PI) / 180;
              const x = 250 + 85 * Math.cos(radian);
              const y = 150 + 85 * Math.sin(radian);
              const x2 = 250 + 95 * Math.cos(radian);
              const y2 = 150 + 95 * Math.sin(radian);

              return (
                <g key={tick}>
                  <line
                    x1={x}
                    y1={y}
                    x2={x2}
                    y2={y2}
                    stroke="var(--border)"
                    strokeWidth={2}
                  />
                  <text
                    x={250 + 105 * Math.cos(radian)}
                    y={150 + 105 * Math.sin(radian)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-xs"
                  >
                    {tick}%
                  </text>
                </g>
              );
            })}
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Project is 72% complete <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          On track to meet deadline
        </div>
      </CardFooter>
    </Card>
  );
}
