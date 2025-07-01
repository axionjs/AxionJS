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

// Chart metadata with just the structure (removed tsCode as it's now handled by RegistryViewerSingle)
export const chartComponents = [
  {
    name: "line-chart-linear",
    component: LineChartLinear,
    displayName: "Line Chart - Linear",
    category: "Line",
    description: "Simple linear chart showing trend data over time",
    installCommand: "npx axionjs-ui add line-chart-linear",
  },
  {
    name: "area-chart-stacked",
    component: AreaChartStacked,
    displayName: "Area Chart - Stacked",
    category: "Area",
    description: "Stacked area chart for comparing multiple data series",
    installCommand: "npx axionjs-ui add area-chart-stacked",
  },
  {
    name: "bar-chart-multiple",
    component: BarChartMultiple,
    displayName: "Bar Chart - Multiple",
    category: "Bar",
    description: "Multiple bar chart for comparing categories",
    installCommand: "npx axionjs-ui add bar-chart-multiple",
  },
  {
    name: "pie-chart-donut",
    component: PieChartDonut,
    displayName: "Pie Chart - Donut",
    category: "Pie",
    description: "Donut chart for showing proportional data",
    installCommand: "npx axionjs-ui add pie-chart-donut",
  },
  {
    name: "line-chart",
    component: LineChart,
    displayName: "Line Chart",
    category: "Line",
    description: "Basic line chart for trend visualization",
    installCommand: "npx axionjs-ui add line-chart",
  },
  {
    name: "line-chart-dots",
    component: LineChartDots,
    displayName: "Line Chart - Dots",
    category: "Line",
    description: "Line chart with dot markers",
    installCommand: "npx axionjs-ui add line-chart-dots",
  },
  {
    name: "line-chart-multiple",
    component: LineChartMultiple,
    displayName: "Line Chart - Multiple",
    category: "Line",
    description: "Line chart with multiple series",
    installCommand: "npx axionjs-ui add line-chart-multiple",
  },
  {
    name: "area-chart-step",
    component: AreaChartStep,
    displayName: "Area Chart - Step",
    category: "Area",
    description: "Area chart with step interpolation",
    installCommand: "npx axionjs-ui add area-chart-step",
  },
  {
    name: "area-chart-legend",
    component: AreaChartLegend,
    displayName: "Area Chart - Legend",
    category: "Area",
    description: "Area chart with custom legend",
    installCommand: "npx axionjs-ui add area-chart-legend",
  },
  {
    name: "bar-chart-horizontal",
    component: BarChartHorizontal,
    displayName: "Bar Chart - Horizontal",
    category: "Bar",
    description: "Horizontal bar chart for category comparison",
    installCommand: "npx axionjs-ui add bar-chart-horizontal",
  },
  {
    name: "bar-chart-label",
    component: BarChartLabel,
    displayName: "Bar Chart - Label",
    category: "Bar",
    description: "Bar chart with custom labels",
    installCommand: "npx axionjs-ui add bar-chart-label",
  },
  {
    name: "bar-chart-multiple-2",
    component: BarChartMultiple2,
    displayName: "Bar Chart - Multiple 2",
    category: "Bar",
    description: "Alternative multiple bar chart style",
    installCommand: "npx axionjs-ui add bar-chart-multiple-2",
  },
  {
    name: "pie-chart-label",
    component: PieChartLabel,
    displayName: "Pie Chart - Label",
    category: "Pie",
    description: "Pie chart with custom labels",
    installCommand: "npx axionjs-ui add pie-chart-label",
  },
  {
    name: "pie-chart-interactive",
    component: PieChartInteractive,
    displayName: "Pie Chart - Interactive",
    category: "Pie",
    description: "Interactive pie chart with hover effects",
    installCommand: "npx axionjs-ui add pie-chart-interactive",
  },
  {
    name: "radar-chart-grid-filled",
    component: RadarChartGridFilled,
    displayName: "Radar Chart - Grid Filled",
    category: "Radar",
    description: "Radar chart with filled grid",
    installCommand: "npx axionjs-ui add radar-chart-grid-filled",
  },
  {
    name: "radial-chart-label",
    component: RadialChartLabel,
    displayName: "Radial Chart - Label",
    category: "Radial",
    description: "Radial chart with custom labels",
    installCommand: "npx axionjs-ui add radial-chart-label",
  },
  {
    name: "radial-chart-shape",
    component: RadialChartShape,
    displayName: "Radial Chart - Shape",
    category: "Radial",
    description: "Radial chart with custom shapes",
    installCommand: "npx axionjs-ui add radial-chart-shape",
  },
  {
    name: "tooltip-no-label",
    component: TooltipNoLabel,
    displayName: "Tooltip - No Label",
    category: "Tooltip",
    description: "Chart with tooltip without labels",
    installCommand: "npx axionjs-ui add tooltip-no-label",
  },
  {
    name: "heatmap-chart",
    component: HeatmapChart,
    displayName: "Heatmap Chart",
    category: "Heatmap",
    description: "Heatmap for displaying density data",
    installCommand: "npx axionjs-ui add heatmap-chart",
  },
  {
    name: "scatter-chart",
    component: ScatterPlotChart,
    displayName: "Scatter Plot Chart",
    category: "Scatter",
    description: "Scatter plot for correlation data",
    installCommand: "npx axionjs-ui add scatter-chart",
  },
  {
    name: "bubble-chart",
    component: BubbleChart,
    displayName: "Bubble Chart",
    category: "Bubble",
    description: "Bubble chart for multi-dimensional data",
    installCommand: "npx axionjs-ui add bubble-chart",
  },
  {
    name: "funnel-chart",
    component: FunnelChartComponent,
    displayName: "Funnel Chart",
    category: "Funnel",
    description: "Funnel chart for flow visualization",
    installCommand: "npx axionjs-ui add funnel-chart",
  },
  {
    name: "composed-chart",
    component: ComposedChartComponent,
    displayName: "Composed Chart",
    category: "Composed",
    description: "Combined chart with multiple types",
    installCommand: "npx axionjs-ui add composed-chart",
  },
  {
    name: "stacked-area-percent",
    component: StackedAreaPercentChart,
    displayName: "Stacked Area Percent Chart",
    category: "Area",
    description: "Area chart with percentage stacking",
    installCommand: "npx axionjs-ui add stacked-area-percent",
  },
  {
    name: "gradient-chart",
    component: GradientChart,
    displayName: "Gradient Chart",
    category: "Line",
    description: "Line chart with gradient fill",
    installCommand: "npx axionjs-ui add gradient-chart",
  },
  {
    name: "brush-chart",
    component: BrushChart,
    displayName: "Brush Chart",
    category: "Line",
    description: "Line chart with brush for zooming",
    installCommand: "npx axionjs-ui add brush-chart",
  },
  {
    name: "reference-line-chart",
    component: ReferenceLineChart,
    displayName: "Reference Line Chart",
    category: "Line",
    description: "Line chart with reference lines",
    installCommand: "npx axionjs-ui add reference-line-chart",
  },
  {
    name: "polar-chart",
    component: PolarChartComponent,
    displayName: "Polar Chart",
    category: "Polar",
    description: "Polar chart for angular data",
    installCommand: "npx axionjs-ui add polar-chart",
  },
  {
    name: "multi-radar-chart",
    component: MultiRadarChart,
    displayName: "Multi Radar Chart",
    category: "Radar",
    description: "Radar chart with multiple datasets",
    installCommand: "npx axionjs-ui add multi-radar-chart",
  },
  {
    name: "custom-radial-bar",
    component: CustomRadialBarChart,
    displayName: "Custom Radial Bar Chart",
    category: "Radial",
    description: "Customized radial bar chart",
    installCommand: "npx axionjs-ui add custom-radial-bar",
  },
  {
    name: "custom-pie-chart",
    component: CustomPieChart,
    displayName: "Custom Pie Chart",
    category: "Pie",
    description: "Customized pie chart with animations",
    installCommand: "npx axionjs-ui add custom-pie-chart",
  },
  {
    name: "gauge-chart",
    component: GaugeChart,
    displayName: "Gauge Chart",
    category: "Gauge",
    description: "Gauge chart for displaying metrics",
    installCommand: "npx axionjs-ui add gauge-chart",
  },
  {
    name: "bullet-chart",
    component: BulletChart,
    displayName: "Bullet Chart",
    category: "Bullet",
    description: "Bullet chart for goal comparison",
    installCommand: "npx axionjs-ui add bullet-chart",
  },
  {
    name: "waterfall-chart",
    component: WaterfallChart,
    displayName: "Waterfall Chart",
    category: "Waterfall",
    description: "Waterfall chart for financial data",
    installCommand: "npx axionjs-ui add waterfall-chart",
  },
  {
    name: "timeline-chart",
    component: TimelineChart,
    displayName: "Timeline Chart",
    category: "Timeline",
    description: "Timeline chart for sequential events",
    installCommand: "npx axionjs-ui add timeline-chart",
  },
  {
    name: "sunburst-chart",
    component: SunburstChart,
    displayName: "Sunburst Chart",
    category: "Sunburst",
    description: "Sunburst chart for hierarchical data visualization",
    installCommand: "npx axionjs-ui add sunburst-chart",
  },
  {
    name: "vertical-line-chart",
    component: VerticalLineChart,
    displayName: "Vertical Line Chart",
    category: "Line",
    description: "Line chart with vertical layout for better comparison",
    installCommand: "npx axionjs-ui add vertical-line-chart",
  },
  {
    name: "composed-area-chart",
    component: ComposedAreaChart,
    displayName: "Composed Area Chart",
    category: "Composed",
    description: "Area chart with range areas and trend lines",
    installCommand: "npx axionjs-ui add composed-area-chart",
  },
];
