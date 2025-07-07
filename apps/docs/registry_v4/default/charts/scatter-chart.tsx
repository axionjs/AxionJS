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
  { category: "A", price: 120, rating: 4.5, sales: 240 },
  { category: "A", price: 150, rating: 4.8, sales: 280 },
  { category: "A", price: 90, rating: 4.2, sales: 200 },
  { category: "A", price: 180, rating: 4.9, sales: 300 },
  { category: "A", price: 110, rating: 4.3, sales: 220 },
  { category: "B", price: 70, rating: 3.8, sales: 150 },
  { category: "B", price: 60, rating: 3.5, sales: 130 },
  { category: "B", price: 80, rating: 4.0, sales: 170 },
  { category: "B", price: 50, rating: 3.2, sales: 120 },
  { category: "B", price: 65, rating: 3.7, sales: 140 },
  { category: "C", price: 200, rating: 4.7, sales: 180 },
  { category: "C", price: 220, rating: 4.9, sales: 190 },
  { category: "C", price: 190, rating: 4.6, sales: 170 },
  { category: "C", price: 250, rating: 5.0, sales: 210 },
  { category: "C", price: 230, rating: 4.8, sales: 200 },
];

const chartConfig = {
  A: {
    label: "Category A",
    color: "hsl(var(--chart-1))",
  },
  B: {
    label: "Category B",
    color: "hsl(var(--chart-2))",
  },
  C: {
    label: "Category C",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ScatterPlotChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scatter Plot Chart</CardTitle>
        <CardDescription>Price vs. Rating with Sales Volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ScatterChart
            accessibilityLayer
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="price"
              name="Price"
              unit="$"
              label={{ value: "Price ($)", position: "bottom", offset: 0 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="rating"
              name="Rating"
              unit=" stars"
              label={{ value: "Rating", angle: -90, position: "left" }}
              tickLine={false}
              axisLine={false}
              domain={[3, 5]}
            />
            <ZAxis
              dataKey="sales"
              range={[50, 400]}
              name="Sales"
              unit=" units"
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "Price") return "$" + value;
                    if (name === "Rating") return value + " stars";
                    if (name === "Sales") return value + " units";
                    return value;
                  }}
                />
              }
            />
            <Scatter
              name="Category A"
              data={chartData.filter((item) => item.category === "A")}
              fill="var(--color-A)"
            />
            <Scatter
              name="Category B"
              data={chartData.filter((item) => item.category === "B")}
              fill="var(--color-B)"
            />
            <Scatter
              name="Category C"
              data={chartData.filter((item) => item.category === "C")}
              fill="var(--color-C)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Higher ratings correlate with higher sales{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Bubble size represents sales volume
        </div>
      </CardFooter>
    </Card>
  );
}
