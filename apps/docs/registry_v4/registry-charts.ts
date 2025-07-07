import { Registry } from "@/registry/schema";

export const charts: Registry["items"] = [
  // Area Charts
  {
    name: "area-chart-legend",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    dependencies: ["recharts"],
    files: [
      {
        path: "charts/area-chart-legend.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "area-chart-stacked",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/area-chart-stacked.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "area-chart-step",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/area-chart-step.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "stacked-area-percent",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/stacked-area-percent.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },

  // Bar Charts
  {
    name: "bar-chart-horizontal",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-horizontal.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "bar-chart-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "bar-chart-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-multiple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "bar-chart-multiple-2",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bar-chart-multiple-2.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "brush-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/brush-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-brush"],
  },
  {
    name: "bubble-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bubble-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bubble"],
  },
  {
    name: "bullet-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/bullet-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bullet"],
  },
  {
    name: "composed-area-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/composed-area-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-composed"],
  },
  {
    name: "composed-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/composed-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-composed"],
  },
  {
    name: "custom-pie-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/custom-pie-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
  },

  {
    name: "custom-radial-bar",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/custom-radial-bar.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "funnel-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/funnel-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-funnel"],
  },
  {
    name: "gauge-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/gauge-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-gauge"],
  },
  {
    name: "gradient-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/gradient-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-gradient"],
  },
  {
    name: "heatmap-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/heatmap-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-heatmap"],
  },
  // Line Charts
  {
    name: "line-chart-dots",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart-dots.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
  },
  {
    name: "reference-line-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/reference-line-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
  },
  {
    name: "line-chart-linear",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart-linear.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
  },
  {
    name: "line-chart-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart-multiple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
  },
  {
    name: "line-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/line-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
  },
  {
    name: "vertical-line-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/vertical-line-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
  },

  // Radar Charts
  {
    name: "multi-radar-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/multi-radar-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
  },
  {
    name: "radar-chart-grid-filled",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/radar-chart-grid-filled.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
  },
  {
    name: "radial-chart-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/radial-chart-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
  },
  {
    name: "radial-chart-shape",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/radial-chart-shape.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
  },
  {
    name: "pie-chart-donut",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/pie-chart-donut.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
  },
  {
    name: "pie-chart-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/pie-chart-interactive.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
  },
  {
    name: "pie-chart-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/pie-chart-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
  },
  {
    name: "polar-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/polar-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-polar"],
  },
  {
    name: "scatter-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/scatter-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-scatter"],
  },
  {
    name: "sunburst-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/sunburst-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-sunburst"],
  },
  {
    name: "timeline-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/timeline-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-timeline"],
  },
  {
    name: "toolooltip-no-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/tooltip-no-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
  },
  {
    name: "waterfall-chart",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/waterfall-chart.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-waterfall"],
  },
];
