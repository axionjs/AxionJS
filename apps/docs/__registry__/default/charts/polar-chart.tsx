"use client";

import { TrendingUp } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
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
  { subject: "Math", score: 90, fullMark: 100 },
  { subject: "English", score: 80, fullMark: 100 },
  { subject: "Science", score: 85, fullMark: 100 },
  { subject: "History", score: 75, fullMark: 100 },
  { subject: "Art", score: 95, fullMark: 100 },
  { subject: "Music", score: 85, fullMark: 100 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
  fullMark: {
    label: "Full Mark",
    color: "hsl(var(--chart-2) / 0.3)",
  },
} satisfies ChartConfig;

export function PolarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Polar Chart</CardTitle>
        <CardDescription>Student performance across subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RadarChart
            accessibilityLayer
            outerRadius={90}
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="var(--color-score)"
              fill="var(--color-score)"
              fillOpacity={0.6}
            />
            <Radar
              name="Full Mark"
              dataKey="fullMark"
              stroke="var(--color-fullMark)"
              fill="var(--color-fullMark)"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Highest performance in Art (95/100) <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          End of semester student assessment
        </div>
      </CardFooter>
    </Card>
  );
}
