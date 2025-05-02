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
} from "@/registry/new-york/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

const chartData = [
  { skill: "JavaScript", student1: 90, student2: 75, student3: 85 },
  { skill: "HTML/CSS", student1: 85, student2: 90, student3: 80 },
  { skill: "React", student1: 80, student2: 70, student3: 95 },
  { skill: "Node.js", student1: 70, student2: 65, student3: 90 },
  { skill: "Database", student1: 75, student2: 80, student3: 70 },
  { skill: "UI/UX", student1: 65, student2: 85, student3: 75 },
];

const chartConfig = {
  student1: {
    label: "Student A",
    color: "hsl(var(--chart-1))",
  },
  student2: {
    label: "Student B",
    color: "hsl(var(--chart-2))",
  },
  student3: {
    label: "Student C",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function MultiRadarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-Series Radar Chart</CardTitle>
        <CardDescription>
          Comparing student skills across domains
        </CardDescription>
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
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              name="Student A"
              dataKey="student1"
              stroke="var(--color-student1)"
              fill="var(--color-student1)"
              fillOpacity={0.5}
            />
            <Radar
              name="Student B"
              dataKey="student2"
              stroke="var(--color-student2)"
              fill="var(--color-student2)"
              fillOpacity={0.5}
            />
            <Radar
              name="Student C"
              dataKey="student3"
              stroke="var(--color-student3)"
              fill="var(--color-student3)"
              fillOpacity={0.5}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Student C excels in React and Node.js{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Coding bootcamp skills assessment
        </div>
      </CardFooter>
    </Card>
  );
}
