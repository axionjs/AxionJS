import { LineChartLinear } from "@/registry/new-york/charts/line-chart-linear";
import { AreaChartStacked } from "@/registry/new-york/charts/area-chart-stacked";
import { BarChartMultiple } from "@/registry/new-york/charts/bar-chart-multiple";
import { PieChartDonut } from "@/registry/new-york/charts/pie-chart-donut";
import { AreaChartStep } from "@/registry/new-york/charts/area-chart-step";
import { AreaChartLegend } from "@/registry/new-york/charts/area-chart-legend";
import { BarChartHorizontal } from "@/registry/new-york/charts/bar-chart-horizontal";
import { BarChartLabel } from "@/registry/new-york/charts/bar-chart-label";
import { BarChartMultiple2 } from "@/registry/new-york/charts/bar-chart-multiple-2";
import { LineChart } from "@/registry/new-york/charts/line-chart";
import { LineChartDots } from "@/registry/new-york/charts/line-chart-dots";
import { LineChartMultiple } from "@/registry/new-york/charts/line-chart-multiple";
import { PieChartLabel } from "@/registry/new-york/charts/pie-chart-label";
import { PieChartInteractive } from "@/registry/new-york/charts/pie-chart-interactive";
import { RadarChartGridFilled } from "@/registry/new-york/charts/radar-chart-grid-filled";
import { RadialChartLabel } from "@/registry/new-york/charts/radial-chart-label";
import { RadialChartShape } from "@/registry/new-york/charts/radial-chart-shape";
import { TooltipNoLabel } from "@/registry/new-york/charts/tooltip-no-label";
import { HeatmapChart } from "@/registry/new-york/charts/heatmap-chart";
import { ScatterPlotChart } from "@/registry/new-york/charts/scatter-chart";
import { BubbleChart } from "@/registry/new-york/charts/bubble-chart";
import { FunnelChartComponent } from "@/registry/new-york/charts/funnel-chart";
import { ComposedChartComponent } from "@/registry/new-york/charts/composed-chart";
import { StackedAreaPercentChart } from "@/registry/new-york/charts/stacked-area-percent";
import { GradientChart } from "@/registry/new-york/charts/gradient-chart";
import { BrushChart } from "@/registry/new-york/charts/brush-chart";
import { ReferenceLineChart } from "@/registry/new-york/charts/reference-line-chart";
import { PolarChartComponent } from "@/registry/new-york/charts/polar-chart";
import { MultiRadarChart } from "@/registry/new-york/charts/multi-radar-chart";
import { CustomRadialBarChart } from "@/registry/new-york/charts/custom-radial-bar";
import { CustomPieChart } from "@/registry/new-york/charts/custom-pie-chart";
import { GaugeChart } from "@/registry/new-york/charts/gauge-chart";
import { BulletChart } from "@/registry/new-york/charts/bullet-chart";
import { WaterfallChart } from "@/registry/new-york/charts/waterfall-chart";
import { TimelineChart } from "@/registry/new-york/charts/timeline-chart";
import { SunburstChart } from "@/registry/new-york/charts/sunburst-chart";
import { VerticalLineChart } from "@/registry/new-york/charts/vertical-line-chart";
import { ComposedAreaChart } from "@/registry/new-york/charts/composed-area-chart";

// Chart metadata with just the structure
export const chartComponents = [
  {
    name: "LineChartLinear",
    component: LineChartLinear,
    displayName: "Line Chart - Linear",
    category: "Line",
    description: "Simple linear chart showing trend data over time",
    installCommand: "npx axionjs add line-chart-linear",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import {
      CartesianGrid,
      Line,
      LineChart as RechartsLineChart,
      XAxis,
    } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;
    
    export function LineChartLinear() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Line Chart - Linear</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <RechartsLineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="linear"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "AreaChartStacked",
    component: AreaChartStacked,
    displayName: "Area Chart - Stacked",
    category: "Area",
    description: "Stacked area chart for comparing multiple data series",
    installCommand: "npx axionjs add area-chart-stacked",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function AreaChartStacked() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Area Chart - Stacked</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "BarChartMultiple",
    component: BarChartMultiple,
    displayName: "Bar Chart - Multiple",
    category: "Bar",
    description: "Multiple bar chart for comparing categories",
    installCommand: "npx axionjs add bar-chart-multiple",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function BarChartMultiple() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "PieChartDonut",
    component: PieChartDonut,
    displayName: "Pie Chart - Donut",
    category: "Pie",
    description: "Donut chart for showing proportional data",
    installCommand: "npx axionjs add pie-chart-donut",
    tsCode: `"use client";
    
    import * as React from "react";
    import { TrendingUp } from "lucide-react";
    import { Label, Pie, PieChart } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
      { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
      { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
      { browser: "other", visitors: 190, fill: "var(--color-other)" },
    ];
    
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;
    
    export function PieChartDonut() {
      const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
      }, []);
    
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "LineChart",
    component: LineChart,
    displayName: "Line Chart",
    category: "Line",
    description: "Basic line chart for trend visualization",
    installCommand: "npx axionjs add line-chart",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import {
      CartesianGrid,
      Line,
      LineChart as RechartsLineChart,
      XAxis,
    } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;
    
    export function LineChart() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <RechartsLineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "LineChartDots",
    component: LineChartDots,
    displayName: "Line Chart - Dots",
    category: "Line",
    description: "Line chart with dot markers",
    installCommand: "npx axionjs add line-chart-dots",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function LineChartDots() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Line Chart - Dots</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "LineChartMultiple",
    component: LineChartMultiple,
    displayName: "Line Chart - Multiple",
    category: "Line",
    description: "Line chart with multiple series",
    installCommand: "npx axionjs add line-chart-multiple",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function LineChartMultiple() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Line Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "AreaChartStep",
    component: AreaChartStep,
    displayName: "Area Chart - Step",
    category: "Area",
    description: "Area chart with step interpolation",
    installCommand: "npx axionjs add area-chart-step",
    tsCode: `"use client";

import { Activity, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  },
} satisfies ChartConfig;

export function AreaChartStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Step</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="step"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
`,
  },
  {
    name: "AreaChartLegend",
    component: AreaChartLegend,
    displayName: "Area Chart - Legend",
    category: "Area",
    description: "Area chart with custom legend",
    installCommand: "npx axionjs add area-chart-legend",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartLegend,
      ChartLegendContent,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function AreaChartLegend() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Area Chart - Legend</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "BarChartHorizontal",
    component: BarChartHorizontal,
    displayName: "Bar Chart - Horizontal",
    category: "Bar",
    description: "Horizontal bar chart for category comparison",
    installCommand: "npx axionjs add bar-chart-horizontal",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Bar, BarChart, XAxis, YAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;
    
    export function BarChartHorizontal() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Horizontal</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: -20,
                }}
              >
                <XAxis type="number" dataKey="desktop" hide />
                <YAxis
                  dataKey="month"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "BarChartLabel",
    component: BarChartLabel,
    displayName: "Bar Chart - Label",
    category: "Bar",
    description: "Bar chart with custom labels",
    installCommand: "npx axionjs add bar-chart-label",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig;
    
    export function BarChartLabel() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "BarChartMultiple2",
    component: BarChartMultiple2,
    displayName: "Bar Chart - Multiple 2",
    category: "Bar",
    description: "Alternative multiple bar chart style",
    installCommand: "npx axionjs add bar-chart-multiple-2",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    
    const chartConfig = {
      desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
      },
      mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function BarChartMultiple2() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "PieChartLabel",
    component: PieChartLabel,
    displayName: "Pie Chart - Label",
    category: "Pie",
    description: "Pie chart with custom labels",
    installCommand: "npx axionjs add pie-chart-label",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Pie, PieChart } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
      { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
      { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
      { browser: "other", visitors: 90, fill: "var(--color-other)" },
    ];
    
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;
    
    export function PieChartLabel() {
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "PieChartInteractive",
    component: PieChartInteractive,
    displayName: "Pie Chart - Interactive",
    category: "Pie",
    description: "Interactive pie chart with hover effects",
    installCommand: "npx axionjs add pie-chart-interactive",
    tsCode: `"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChartInteractive() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );
  const months = React.useMemo(() => desktopData.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: "var(--color-" + key + ")",
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}`,
  },
  {
    name: "RadarChartGridFilled",
    component: RadarChartGridFilled,
    displayName: "Radar Chart - Grid Filled",
    category: "Radar",
    description: "Radar chart with filled grid",
    installCommand: "npx axionjs add radar-chart-grid-filled",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 285 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 203 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 264 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadarChartGridFilled() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Grid Filled</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid className="fill-[--color-desktop] opacity-20" />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
`,
  },
  {
    name: "RadialChartLabel",
    component: RadialChartLabel,
    displayName: "Radial Chart - Label",
    category: "Radial",
    description: "Radial chart with custom labels",
    installCommand: "npx axionjs add radial-chart-label",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { LabelList, RadialBar, RadialBarChart } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
      { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
      { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
      { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
      { browser: "other", visitors: 90, fill: "var(--color-other)" },
    ];
    
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
    } satisfies ChartConfig;
    
    export function RadialChartLabel() {
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Radial Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="browser" />}
                />
                <RadialBar dataKey="visitors" background>
                  <LabelList
                    position="insideStart"
                    dataKey="browser"
                    className="fill-white capitalize mix-blend-luminosity"
                    fontSize={11}
                  />
                </RadialBar>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "RadialChartShape",
    component: RadialChartShape,
    displayName: "Radial Chart - Shape",
    category: "Radial",
    description: "Radial chart with custom shapes",
    installCommand: "npx axionjs add radial-chart-shape",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import {
      Label,
      PolarGrid,
      PolarRadiusAxis,
      RadialBar,
      RadialBarChart,
    } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
    
    const chartData = [
      { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
    ];
    
    const chartConfig = {
      visitors: {
        label: "Visitors",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function RadialChartShape() {
      return (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Radial Chart - Shape</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                endAngle={100}
                innerRadius={80}
                outerRadius={140}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="visitors" background />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {chartData[0].visitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "TooltipNoLabel",
    component: TooltipNoLabel,
    displayName: "Tooltip - No Label",
    category: "Tooltip",
    description: "Chart with tooltip without labels",
    installCommand: "npx axionjs add tooltip-no-label",
    tsCode: `"use client";
    
    import { Bar, BarChart, XAxis } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { date: "2024-07-15", running: 450, swimming: 300 },
      { date: "2024-07-16", running: 380, swimming: 420 },
      { date: "2024-07-17", running: 520, swimming: 120 },
      { date: "2024-07-18", running: 140, swimming: 550 },
      { date: "2024-07-19", running: 600, swimming: 350 },
      { date: "2024-07-20", running: 480, swimming: 400 },
    ];
    
    const chartConfig = {
      running: {
        label: "Running",
        color: "hsl(var(--chart-1))",
      },
      swimming: {
        label: "Swimming",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
    
    export function TooltipNoLabel() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Tooltip - No Label</CardTitle>
            <CardDescription>Tooltip with no label.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                  }}
                />
                <Bar
                  dataKey="running"
                  stackId="a"
                  fill="var(--color-running)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="swimming"
                  stackId="a"
                  fill="var(--color-swimming)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideIndicator hideLabel />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );
    }
    `,
  },
  {
    name: "HeatmapChart",
    component: HeatmapChart,
    displayName: "Heatmap Chart",
    category: "Heatmap",
    description: "Heatmap for displaying density data",
    installCommand: "npx axionjs add heatmap-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
                      aria-label={props.day + " at " + props.hour + ": " + value + " activity points"}
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
}`,
  },
  {
    name: "ScatterPlotChart",
    component: ScatterPlotChart,
    displayName: "Scatter Plot Chart",
    category: "Scatter",
    description: "Scatter plot for correlation data",
    installCommand: "npx axionjs add scatter-plot-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
}`,
  },
  {
    name: "BubbleChart",
    component: BubbleChart,
    displayName: "Bubble Chart",
    category: "Bubble",
    description: "Bubble chart for multi-dimensional data",
    installCommand: "npx axionjs add bubble-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
                        item.lifeExpectancy === label[1]
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
}`,
  },
  {
    name: "FunnelChartComponent",
    component: FunnelChartComponent,
    displayName: "Funnel Chart",
    category: "Funnel",
    description: "Funnel chart for flow visualization",
    installCommand: "npx axionjs add funnel-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Visitors", value: 5000, fill: "var(--color-visitors)" },
  { name: "Leads", value: 2500, fill: "var(--color-leads)" },
  { name: "Prospects", value: 1250, fill: "var(--color-prospects)" },
  { name: "Customers", value: 600, fill: "var(--color-customers)" },
  { name: "Repeat Buyers", value: 300, fill: "var(--color-repeat)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-2))",
  },
  prospects: {
    label: "Prospects",
    color: "hsl(var(--chart-3))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-4))",
  },
  repeat: {
    label: "Repeat Buyers",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function FunnelChartComponent() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Funnel Chart</CardTitle>
        <CardDescription>Sales conversion funnel</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center px-2 pb-0">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart
              margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
              isAnimationActive={true}
              animationDuration={800}
            >
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => value.toLocaleString() + " users"}
                  />
                }
              />
              <Funnel
                dataKey="value"
                data={chartData}
                isAnimationActive={true}
                animationDuration={800}
                labelLine={false}
              >
                <LabelList
                  position="right"
                  fill="var(--foreground)"
                  stroke="none"
                  dataKey="name"
                  className="text-sm font-medium"
                />
                <LabelList
                  position="left"
                  fill="var(--foreground)"
                  stroke="none"
                  dataKey="value"
                  formatter={(value) => value.toLocaleString()}
                  className="text-sm"
                />
                {chartData.map((entry, index) => (
                  <Cell key={"cell-" + index} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          6% conversion rate from visitor to customer{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Q2 2024 sales funnel data
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "ComposedChartComponent",
    component: ComposedChartComponent,
    displayName: "Composed Chart",
    category: "Composed",
    description: "Combined chart with multiple types",
    installCommand: "npx axionjs add composed-chart",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import {
      Area,
      Bar,
      CartesianGrid,
      ComposedChart,
      Line,
      XAxis,
      YAxis,
    } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartLegend,
      ChartLegendContent,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
    const chartData = [
      { month: "Jan", revenue: 4000, profit: 1400, expenses: 2600, growth: 0 },
      { month: "Feb", revenue: 5000, profit: 1800, expenses: 3200, growth: 5 },
      { month: "Mar", revenue: 4500, profit: 1600, expenses: 2900, growth: 10 },
      { month: "Apr", revenue: 6000, profit: 2400, expenses: 3600, growth: 15 },
      { month: "May", revenue: 7000, profit: 3000, expenses: 4000, growth: 20 },
      { month: "Jun", revenue: 8000, profit: 3600, expenses: 4400, growth: 25 },
    ];
    
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
      },
      profit: {
        label: "Profit",
        color: "hsl(var(--chart-2))",
      },
      expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-3))",
      },
      growth: {
        label: "Growth",
        color: "hsl(var(--chart-4))",
      },
    } satisfies ChartConfig;
    
    export function ComposedChartComponent() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Composed Chart</CardTitle>
            <CardDescription>Financial performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ComposedChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: "Amount ($)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: "Growth (%)",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  stroke="var(--color-revenue)"
                  fillOpacity={0.3}
                />
                <Bar
                  yAxisId="left"
                  dataKey="profit"
                  fill="var(--color-profit)"
                  barSize={20}
                />
                <Bar
                  yAxisId="left"
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  barSize={20}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  stroke="var(--color-growth)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-growth)", r: 4 }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Revenue and profit trending upward <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              First half of 2024 financial data
            </div>
          </CardFooter>
        </Card>
      );
    }
    `,
  },
  {
    name: "StackedAreaPercentChart",
    component: StackedAreaPercentChart,
    displayName: "Stacked Area Percent Chart",
    category: "Area",
    description: "Area chart with percentage stacking",
    installCommand: "npx axionjs add stacked-area-percent-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { year: "2018", mobile: 30, desktop: 60, tablet: 10 },
  { year: "2019", mobile: 35, desktop: 55, tablet: 10 },
  { year: "2020", mobile: 45, desktop: 45, tablet: 10 },
  { year: "2021", mobile: 50, desktop: 40, tablet: 10 },
  { year: "2022", mobile: 55, desktop: 35, tablet: 10 },
  { year: "2023", mobile: 60, desktop: 30, tablet: 10 },
  { year: "2024", mobile: 65, desktop: 25, tablet: 10 },
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

export function StackedAreaPercentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stacked Area Percent Chart</CardTitle>
        <CardDescription>Device usage trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            stackOffset="expand"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(value) => (value * 100).toFixed(0) + "%"}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => value + "%"} />
              }
            />
            <Area
              type="monotone"
              dataKey="mobile"
              stackId="1"
              stroke="var(--color-mobile)"
              fill="var(--color-mobile)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="tablet"
              stackId="1"
              stroke="var(--color-tablet)"
              fill="var(--color-tablet)"
              fillOpacity={0.6}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Mobile usage increased by 35% since 2018{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Percentage distribution of device usage
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "GradientChart",
    component: GradientChart,
    displayName: "Gradient Chart",
    category: "Line",
    description: "Line chart with gradient fill",
    installCommand: "npx axionjs add gradient-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 5000 },
  { month: "Mar", value: 4500 },
  { month: "Apr", value: 6000 },
  { month: "May", value: 7000 },
  { month: "Jun", value: 8000 },
];

const chartConfig = {
  value: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function GradientChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Chart</CardTitle>
        <CardDescription>Monthly revenue with gradient fill</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => "$" + value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => "$" + value} />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Revenue doubled from January to June{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          First half of 2024 revenue data
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "BrushChart",
    component: BrushChart,
    displayName: "Brush Chart",
    category: "Line",
    description: "Line chart with brush for zooming",
    installCommand: "npx axionjs add brush-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Brush, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-01-01", value: 4000 },
  { date: "2024-01-15", value: 4200 },
  { date: "2024-02-01", value: 5000 },
  { date: "2024-02-15", value: 5200 },
  { date: "2024-03-01", value: 4500 },
  { date: "2024-03-15", value: 4700 },
  { date: "2024-04-01", value: 6000 },
  { date: "2024-04-15", value: 6200 },
  { date: "2024-05-01", value: 7000 },
  { date: "2024-05-15", value: 7200 },
  { date: "2024-06-01", value: 8000 },
  { date: "2024-06-15", value: 8200 },
];

const chartConfig = {
  value: {
    label: "Stock Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BrushChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brush Chart</CardTitle>
        <CardDescription>Stock price with time range selection</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return (date.getMonth() + 1) + "/" + date.getDate();
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => "$" + value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => "$" + value}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              fill="var(--color-value)"
              fillOpacity={0.3}
            />
            <Brush
              dataKey="date"
              height={30}
              stroke="var(--color-value)"
              tickFormatter={(value) => {
                const date = new Date(value);
                return (date.getMonth() + 1) + "/" + date.getDate();
              }}
              startIndex={2}
              endIndex={8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Stock price up 105% in 6 months <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Use the brush below to select a time range
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "ReferenceLineChart",
    component: ReferenceLineChart,
    displayName: "Reference Line Chart",
    category: "Line",
    description: "Line chart with reference lines",
    installCommand: "npx axionjs add reference-line-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", actual: 4000, target: 4500 },
  { month: "Feb", actual: 5000, target: 4500 },
  { month: "Mar", actual: 4500, target: 4500 },
  { month: "Apr", actual: 6000, target: 4500 },
  { month: "May", actual: 7000, target: 4500 },
  { month: "Jun", actual: 8000, target: 4500 },
];

const chartConfig = {
  actual: {
    label: "Actual Sales",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
  average: {
    label: "Average",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ReferenceLineChart() {
  // Calculate average
  const average =
    chartData.reduce((sum, item) => sum + item.actual, 0) / chartData.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reference Line Chart</CardTitle>
        <CardDescription>
          Sales performance with target and average
        </CardDescription>
      </CardHeader>
      <CardContent className="h-auto">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 30, right: 50, bottom: 30, left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => "$" + value}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent formatter={(value) => "$" + value} />
                }
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={chartConfig.actual.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.actual.color, r: 4 }}
              />
              <ReferenceLine
                y={4500}
                stroke={chartConfig.target.color}
                strokeDasharray="3 3"
                label={{
                  value: "Target: $4,500",
                  position: "right",
                  fill: chartConfig.target.color,
                  fontSize: 12,
                  offset: 10,
                }}
              />
              <ReferenceLine
                y={average}
                stroke={chartConfig.average.color}
                strokeDasharray="3 3"
                label={{
                  value: "Average: $" + average.toFixed(0),
                  position: "right",
                  fill: chartConfig.average.color,
                  fontSize: 12,
                  offset: 10,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Exceeded target in 5 out of 6 months{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          First half of 2024 sales performance
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "PolarChartComponent",
    component: PolarChartComponent,
    displayName: "Polar Chart",
    category: "Polar",
    description: "Polar chart for angular data",
    installCommand: "npx axionjs add polar-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
}`,
  },
  {
    name: "MultiRadarChart",
    component: MultiRadarChart,
    displayName: "Multi Radar Chart",
    category: "Radar",
    description: "Radar chart with multiple datasets",
    installCommand: "npx axionjs add multi-radar-chart",
    tsCode: `"use client";
    
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
    } from "@/components/ui/card";
    import {
      type ChartConfig,
      ChartContainer,
      ChartLegend,
      ChartLegendContent,
      ChartTooltip,
      ChartTooltipContent,
    } from "@/components/ui/chart";
    
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
    `,
  },
  {
    name: "CustomRadialBarChart",
    component: CustomRadialBarChart,
    displayName: "Custom Radial Bar Chart",
    category: "Radial",
    description: "Customized radial bar chart",
    installCommand: "npx axionjs add custom-radial-bar-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function CustomRadialBarChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
            isAnimationActive={true}
            animationDuration={800}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background isAnimationActive={true}>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
`,
  },
  {
    name: "CustomPieChart",
    component: CustomPieChart,
    displayName: "Custom Pie Chart",
    category: "Pie",
    description: "Customized pie chart with animations",
    installCommand: "npx axionjs add custom-pie-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
}`,
  },
  {
    name: "GaugeChart",
    component: GaugeChart,
    displayName: "Gauge Chart",
    category: "Gauge",
    description: "Gauge chart for displaying metrics",
    installCommand: "npx axionjs add gauge-chart",
    tsCode: `"use client";
    
    import { TrendingUp } from "lucide-react";
    import { Pie, PieChart, Sector } from "recharts";
    
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
    
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
    `,
  },
  {
    name: "BulletChart",
    component: BulletChart,
    displayName: "Bullet Chart",
    category: "Bullet",
    description: "Bullet chart for goal comparison",
    installCommand: "npx axionjs add bullet-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
}`,
  },
  {
    name: "WaterfallChart",
    component: WaterfallChart,
    displayName: "Waterfall Chart",
    category: "Waterfall",
    description: "Waterfall chart for financial data",
    installCommand: "npx axionjs add waterfall-chart",
    tsCode: `"use client";

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
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
      0
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
                        return name + ": " + (item.value >= 0 ? "Increase" : "Decrease");
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
}`,
  },
  {
    name: "TimelineChart",
    component: TimelineChart,
    displayName: "Timeline Chart",
    category: "Timeline",
    description: "Timeline chart for sequential events",
    installCommand: "npx axionjs add timeline-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const milestones = [
  { date: "2024-01-15", event: "Project Start" },
  { date: "2024-02-10", event: "Design Phase Complete" },
  { date: "2024-03-05", event: "Development Milestone 1" },
  { date: "2024-04-20", event: "Testing Phase" },
  { date: "2024-05-15", event: "Beta Release" },
  { date: "2024-06-30", event: "Product Launch" },
];

const progressData = [
  { date: "2024-01-01", progress: 0 },
  { date: "2024-01-15", progress: 5 },
  { date: "2024-02-01", progress: 15 },
  { date: "2024-02-10", progress: 25 },
  { date: "2024-02-15", progress: 30 },
  { date: "2024-03-01", progress: 40 },
  { date: "2024-03-05", progress: 45 },
  { date: "2024-03-15", progress: 50 },
  { date: "2024-04-01", progress: 60 },
  { date: "2024-04-20", progress: 70 },
  { date: "2024-05-01", progress: 80 },
  { date: "2024-05-15", progress: 85 },
  { date: "2024-06-01", progress: 95 },
  { date: "2024-06-30", progress: 100 },
];

const chartConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-1))",
  },
  milestone: {
    label: "Milestone",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TimelineChart() {
  // Function to determine optimal label position based on milestone index
  const getLabelPosition = (index) => {
    // Alternate positions to reduce overlap
    return index % 2 === 0 ? "top" : "bottom";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Chart</CardTitle>
        <CardDescription>Project progress and milestones</CardDescription>
      </CardHeader>
      <CardContent className="h-auto">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={progressData}
              margin={{ top: 40, right: 30, bottom: 40, left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return (date.getMonth() + 1) + "/" + date.getDate();
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => value + "%"}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => value + "%"}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke={chartConfig.progress.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.progress.color, r: 4 }}
              />
              {milestones.map((milestone, index) => (
                <ReferenceLine
                  key={"milestone-" + index}
                  x={milestone.date}
                  stroke={chartConfig.milestone.color}
                  strokeDasharray="3 3"
                  label={{
                    value: milestone.event,
                    position: getLabelPosition(index),
                    fill: chartConfig.milestone.color,
                    fontSize: 10,
                    angle: -35,
                    offset: 15,
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Project on track for June 30 launch <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Vertical lines indicate key milestones
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "SunburstChart",
    component: SunburstChart,
    displayName: "Sunburst Chart",
    category: "Sunburst",
    description: "Sunburst chart for hierarchical data visualization",
    installCommand: "npx axionjs add sunburst-chart",
    tsCode: `"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Data structure for sunburst chart
const innerData = [
  { name: "Electronics", value: 400, fill: "var(--color-electronics)" },
  { name: "Clothing", value: 300, fill: "var(--color-clothing)" },
  { name: "Home", value: 200, fill: "var(--color-home)" },
  { name: "Other", value: 100, fill: "var(--color-other)" },
];

const outerData = [
  // Electronics
  {
    name: "Phones",
    value: 200,
    category: "Electronics",
    fill: "var(--color-electronics-1)",
  },
  {
    name: "Computers",
    value: 120,
    category: "Electronics",
    fill: "var(--color-electronics-2)",
  },
  {
    name: "Accessories",
    value: 80,
    category: "Electronics",
    fill: "var(--color-electronics-3)",
  },

  // Clothing
  {
    name: "Men's",
    value: 120,
    category: "Clothing",
    fill: "var(--color-clothing-1)",
  },
  {
    name: "Women's",
    value: 150,
    category: "Clothing",
    fill: "var(--color-clothing-2)",
  },
  {
    name: "Children's",
    value: 30,
    category: "Clothing",
    fill: "var(--color-clothing-3)",
  },

  // Home
  { name: "Kitchen", value: 80, category: "Home", fill: "var(--color-home-1)" },
  {
    name: "Furniture",
    value: 70,
    category: "Home",
    fill: "var(--color-home-2)",
  },
  { name: "Decor", value: 50, category: "Home", fill: "var(--color-home-3)" },

  // Other
  { name: "Books", value: 60, category: "Other", fill: "var(--color-other-1)" },
  {
    name: "Beauty",
    value: 40,
    category: "Other",
    fill: "var(--color-other-2)",
  },
];

const chartConfig = {
  electronics: {
    label: "Electronics",
    color: "hsl(var(--chart-1))",
  },
  clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-2))",
  },
  home: {
    label: "Home",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
  "electronics-1": {
    label: "Phones",
    color: "hsl(var(--chart-1) / 0.8)",
  },
  "electronics-2": {
    label: "Computers",
    color: "hsl(var(--chart-1) / 0.6)",
  },
  "electronics-3": {
    label: "Accessories",
    color: "hsl(var(--chart-1) / 0.4)",
  },
  "clothing-1": {
    label: "Men's",
    color: "hsl(var(--chart-2) / 0.8)",
  },
  "clothing-2": {
    label: "Women's",
    color: "hsl(var(--chart-2) / 0.6)",
  },
  "clothing-3": {
    label: "Children's",
    color: "hsl(var(--chart-2) / 0.4)",
  },
  "home-1": {
    label: "Kitchen",
    color: "hsl(var(--chart-3) / 0.8)",
  },
  "home-2": {
    label: "Furniture",
    color: "hsl(var(--chart-3) / 0.6)",
  },
  "home-3": {
    label: "Decor",
    color: "hsl(var(--chart-3) / 0.4)",
  },
  "other-1": {
    label: "Books",
    color: "hsl(var(--chart-4) / 0.8)",
  },
  "other-2": {
    label: "Beauty",
    color: "hsl(var(--chart-4) / 0.4)",
  },
} satisfies ChartConfig;

export function SunburstChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunburst Chart</CardTitle>
        <CardDescription>
          Sales distribution by category and subcategory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart
            accessibilityLayer
            width={500}
            height={280}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(value) => value + "k"} />
              }
            />
            {/* Inner ring - Categories */}
            <Pie
              data={innerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={60}
              paddingAngle={2}
              stroke="var(--background)"
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={800}
            >
              {innerData.map((entry, index) => (
                <Cell
                  key={"cell-inner-" + index}
                  fill={entry.fill}
                  className="transition-colors duration-300"
                  role="graphics-symbol"
                  aria-label={entry.name + ": " + entry.value + "k"}
                />
              ))}
            </Pie>

            {/* Outer ring - Subcategories */}
            <Pie
              data={outerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={1}
              stroke="var(--background)"
              strokeWidth={1}
              isAnimationActive={true}
              animationDuration={800}
            >
              {outerData.map((entry, index) => (
                <Cell
                  key={"cell-outer-" + index}
                  fill={entry.fill}
                  className="transition-colors duration-300"
                  role="graphics-symbol"
                  aria-label={entry.name + ": " + entry.value + "k"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Electronics is the top category at 40%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Inner ring shows categories, outer ring shows subcategories
        </div>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    name: "VerticalLineChart",
    component: VerticalLineChart,
    displayName: "Vertical Line Chart",
    category: "Line",
    description: "Line chart with vertical layout for better comparison",
    installCommand: "npx axionjs add vertical-line-chart",
    tsCode: `"use client";

import { ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const chartConfig = {
  pv: {
    label: "Page Views",
    color: "hsl(var(--chart-1))",
  },
  uv: {
    label: "Unique Visitors",
    color: "hsl(var(--chart-2))",
  },
};

export function VerticalLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vertical Line Chart</CardTitle>
        <CardDescription>
          Page performance metrics with vertical layout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line dataKey="pv" stroke="var(--color-pv)" type="natural" />
            <Line dataKey="uv" stroke="var(--color-uv)" type="natural" />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Vertical orientation for better page comparison{" "}
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Pages A through G
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default VerticalLineChart;
`,
  },
  {
    name: "ComposedAreaChart",
    component: ComposedAreaChart,
    displayName: "Composed Area Chart",
    category: "Composed",
    description: "Area chart with range areas and trend lines",
    installCommand: "npx axionjs add composed-area-chart",
    tsCode: `"use client";

import { AreaChart } from "lucide-react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
`,
  },
];
