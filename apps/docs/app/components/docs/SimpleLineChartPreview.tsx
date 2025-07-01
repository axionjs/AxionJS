"use client";

import React from "react";
import { SimpleLineChart } from "@/registry/new-york/ui/line-chart";

// Sample data
const sampleData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

// Default chart
export function DefaultLineChartPreview() {
  return (
    <section className="space-y-4 max-w-2xl mx-auto not-prose">
      <SimpleLineChart
        data={sampleData}
        lines={[{ dataKey: "pv" }]}
        ariaLabel="Default Line Chart"
      />
    </section>
  );
}

// Chart with multiple lines
export function MultiLineChartPreview() {
  return (
    <section className="space-y-4 max-w-2xl mx-auto not-prose">
      <SimpleLineChart
        data={sampleData}
        lines={[
          { dataKey: "pv", strokeColor: "hsl(var(--primary))" },
          { dataKey: "uv", strokeColor: "hsl(var(--secondary))" },
        ]}
        ariaLabel="Line Chart with multiple data lines"
      />
    </section>
  );
}

// Chart with grid hidden
export function NoGridLineChartPreview() {
  return (
    <section className="space-y-4 max-w-2xl mx-auto not-prose">
      <SimpleLineChart
        data={sampleData}
        lines={[{ dataKey: "pv", strokeColor: "hsl(var(--primary))" }]}
        showGrid={false}
        ariaLabel="Line Chart without grid"
      />
    </section>
  );
}
