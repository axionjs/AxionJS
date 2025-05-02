"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { country: "USA", gdp: 21.4, population: 331, lifeExpectancy: 78.5 },
  { country: "China", gdp: 14.7, population: 1411, lifeExpectancy: 77.3 },
  { country: "Japan", gdp: 5.1, population: 126, lifeExpectancy: 84.6 },
  { country: "Germany", gdp: 3.8, population: 83, lifeExpectancy: 81.2 },
  { country: "UK", gdp: 2.7, population: 67, lifeExpectancy: 81.3 },
  { country: "India", gdp: 2.9, population: 1380, lifeExpectancy: 69.7 },
  { country: "France", gdp: 2.6, population: 65, lifeExpectancy: 82.5 },
  { country: "Italy", gdp: 1.9, population: 60, lifeExpectancy: 83.6 },
  { country: "Brazil", gdp: 1.8, population: 212, lifeExpectancy: 75.9 },
  { country: "Canada", gdp: 1.6, population: 38, lifeExpectancy: 82.3 },
];

const chartConfig = {
  gdp: {
    label: "GDP (Trillion $)",
    color: "hsl(var(--chart-1))",
  },
  population: {
    label: "Population (Million)",
    color: "hsl(var(--chart-2))",
  },
  lifeExpectancy: {
    label: "Life Expectancy (Years)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BubbleChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bubble Chart</CardTitle>
        <CardDescription>GDP vs Life Expectancy by Country</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ScatterChart
            accessibilityLayer
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="gdp"
              name="GDP"
              unit=" trillion $"
              label={{
                value: "GDP (Trillion $)",
                position: "bottom",
                offset: 0,
              }}
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax + 2"]}
            />
            <YAxis
              dataKey="lifeExpectancy"
              name="Life Expectancy"
              unit=" years"
              label={{
                value: "Life Expectancy (Years)",
                angle: -90,
                position: "left",
              }}
              tickLine={false}
              axisLine={false}
              domain={[65, 90]}
            />
            <ZAxis
              dataKey="population"
              range={[50, 500]}
              name="Population"
              unit=" million"
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "GDP") return value + " trillion $";
                    if (name === "Life Expectancy") return value + " years";
                    if (name === "Population") return value + " million";
                    return value;
                  }}
                  labelFormatter={(label) =>
                    chartData.find(
                      (item) =>
                        item.gdp === label[0] &&
                        item.lifeExpectancy === label[1],
                    )?.country || ""
                  }
                />
              }
            />
            <Scatter
              name="Countries"
              data={chartData}
              fill="var(--color-gdp)"
              fillOpacity={0.7}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Japan has the highest life expectancy{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Bubble size represents population in millions
        </div>
      </CardFooter>
    </Card>
  );
}
