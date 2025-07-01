"use client";

import { TrendingUp } from "lucide-react";
import {
  Cell,
  XAxis,
  YAxis,
  Scatter,
  ScatterChart,
  Rectangle,
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
  { hour: "00:00", day: "Mon", value: 10 },
  { hour: "04:00", day: "Mon", value: 15 },
  { hour: "08:00", day: "Mon", value: 35 },
  { hour: "12:00", day: "Mon", value: 45 },
  { hour: "16:00", day: "Mon", value: 40 },
  { hour: "20:00", day: "Mon", value: 30 },

  { hour: "00:00", day: "Tue", value: 5 },
  { hour: "04:00", day: "Tue", value: 10 },
  { hour: "08:00", day: "Tue", value: 40 },
  { hour: "12:00", day: "Tue", value: 50 },
  { hour: "16:00", day: "Tue", value: 45 },
  { hour: "20:00", day: "Tue", value: 25 },

  { hour: "00:00", day: "Wed", value: 8 },
  { hour: "04:00", day: "Wed", value: 12 },
  { hour: "08:00", day: "Wed", value: 42 },
  { hour: "12:00", day: "Wed", value: 55 },
  { hour: "16:00", day: "Wed", value: 50 },
  { hour: "20:00", day: "Wed", value: 28 },

  { hour: "00:00", day: "Thu", value: 12 },
  { hour: "04:00", day: "Thu", value: 18 },
  { hour: "08:00", day: "Thu", value: 45 },
  { hour: "12:00", day: "Thu", value: 60 },
  { hour: "16:00", day: "Thu", value: 55 },
  { hour: "20:00", day: "Thu", value: 35 },

  { hour: "00:00", day: "Fri", value: 15 },
  { hour: "04:00", day: "Fri", value: 20 },
  { hour: "08:00", day: "Fri", value: 48 },
  { hour: "12:00", day: "Fri", value: 58 },
  { hour: "16:00", day: "Fri", value: 52 },
  { hour: "20:00", day: "Fri", value: 32 },

  { hour: "00:00", day: "Sat", value: 20 },
  { hour: "04:00", day: "Sat", value: 15 },
  { hour: "08:00", day: "Sat", value: 30 },
  { hour: "12:00", day: "Sat", value: 40 },
  { hour: "16:00", day: "Sat", value: 35 },
  { hour: "20:00", day: "Sat", value: 25 },

  { hour: "00:00", day: "Sun", value: 18 },
  { hour: "04:00", day: "Sun", value: 12 },
  { hour: "08:00", day: "Sun", value: 25 },
  { hour: "12:00", day: "Sun", value: 35 },
  { hour: "16:00", day: "Sun", value: 30 },
  { hour: "20:00", day: "Sun", value: 20 },
];

const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const chartConfig = {
  value: {
    label: "Activity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const getColor = (value: number) => {
  if (value < 15) return "hsl(var(--chart-1) / 0.2)";
  if (value < 30) return "hsl(var(--chart-1) / 0.4)";
  if (value < 45) return "hsl(var(--chart-1) / 0.7)";
  return "hsl(var(--chart-1))";
};

export function HeatmapChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Heatmap Chart</CardTitle>
        <CardDescription>Weekly activity by hour</CardDescription>
      </CardHeader>
      <CardContent className="h-auto">
        <ChartContainer
          config={{
            ...chartConfig,
            "value-10": { label: "Low", color: "hsl(var(--chart-1) / 0.2)" },
            "value-30": { label: "Medium", color: "hsl(var(--chart-1) / 0.4)" },
            "value-50": { label: "High", color: "hsl(var(--chart-1) / 0.7)" },
            "value-70": { label: "Very High", color: "hsl(var(--chart-1))" },
          }}
        >
          <ResponsiveContainer width="100%" height="85%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
              isAnimationActive={true}
              animationDuration={800}
            >
              <XAxis
                dataKey="hour"
                type="category"
                allowDuplicatedCategory={false}
                tickLine={false}
                axisLine={false}
                ticks={hours}
                interval={0}
                tick={{ fontSize: 10 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                dataKey="day"
                type="category"
                allowDuplicatedCategory={false}
                tickLine={false}
                axisLine={false}
                ticks={days}
                interval={0}
                tick={{ fontSize: 10 }}
                padding={{ top: 10, bottom: 10 }}
                width={35}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => value + " activity points"}
                  />
                }
              />
              <Scatter
                data={chartData}
                isAnimationActive={true}
                animationDuration={800}
                shape={(props: any) => {
                  const { x, y, width, height, value } = props;
                  return (
                    <Rectangle
                      x={x}
                      y={y}
                      width={width - 3}
                      height={height - 3}
                      fill={getColor(value)}
                      className="transition-colors duration-300"
                      rx={3}
                      ry={3}
                      aria-label={
                        props.day +
                        " at " +
                        props.hour +
                        ": " +
                        value +
                        " activity points"
                      }
                    />
                  );
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={"cell-" + index} fill={getColor(entry.value)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-sm bg-[hsl(var(--chart-1)/0.2)]"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-sm bg-[hsl(var(--chart-1)/0.4)]"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-sm bg-[hsl(var(--chart-1)/0.7)]"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-sm bg-[hsl(var(--chart-1))]"></div>
              <span className="text-xs">Very High</span>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Highest activity on Thursday at noon{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Data collected over the past month
        </div>
      </CardFooter>
    </Card>
  );
}
