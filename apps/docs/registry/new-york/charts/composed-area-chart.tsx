"use client";

import { AreaChart } from "lucide-react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

const data = [
  {
    name: "Page A",
    a: [0, 0],
    b: 0,
  },
  {
    name: "Page B",
    a: [50, 300],
    b: 106,
  },
  {
    name: "Page C",
    a: [150, 423],
  },
  {
    name: "Page D",
    b: 312,
  },
  {
    name: "Page E",
    a: [367, 678],
    b: 451,
  },
  {
    name: "Page F",
    a: [305, 821],
    b: 623,
  },
];

const chartConfig = {
  b: {
    label: "Series B",
    color: "hsl(var(--chart-1))",
  },
};

export function ComposedAreaChart() {
  // Custom render functions to exclude "a" from tooltip and legend
  const CustomizedTooltip = (props) => {
    const { payload, ...rest } = props;
    if (payload && payload.length) {
      const newPayload = payload.filter((x) => x.dataKey !== "a");
      return (
        <ChartTooltipContent indicator="line" payload={newPayload} {...rest} />
      );
    }
    return <ChartTooltipContent indicator="line" {...rest} />;
  };

  const CustomizedLegend = (props) => {
    const { payload, ...rest } = props;
    if (payload && payload.length) {
      const newPayload = payload.filter((x) => x.dataKey !== "a");
      return <ChartLegendContent payload={newPayload} {...rest} />;
    }
    return <ChartLegendContent {...rest} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Composed Area Chart</CardTitle>
        <CardDescription>
          Combining area ranges with line series
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            accessibilityLayer
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<CustomizedTooltip />} />
            <Area
              type="monotone"
              dataKey="a"
              stroke="none"
              fill="#cccccc"
              fillOpacity={0.4}
              connectNulls
              dot={false}
              activeDot={false}
            />
            <Line
              type="natural"
              dataKey="b"
              stroke="var(--color-b)"
              connectNulls
            />
            <ChartLegend content={<CustomizedLegend />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Range areas with trend lines <AreaChart className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Pages A through F with connected nulls
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ComposedAreaChart;
