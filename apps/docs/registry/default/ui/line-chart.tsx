"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

interface SimpleLineChartProps {
  data: Record<string, any>[];

  lines: {
    dataKey: string;
    strokeColor?: string;
  }[];

  xAxisKey?: string;

  width?: number | string;

  height?: number;

  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };

  showGrid?: boolean;

  className?: string;

  ariaLabel?: string;
}

export function SimpleLineChart({
  data,
  lines,
  xAxisKey = "name",
  width = "100%",
  height = 300,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
  showGrid = true,
  className,
  ariaLabel = "Line Chart",
}: SimpleLineChartProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-md border bg-background p-4 ${className ?? ""}`}
    >
      {/* Screen reader-only label for accessibility */}
      <h2 className="sr-only">{ariaLabel}</h2>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={margin}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          )}

          <XAxis dataKey={xAxisKey} tick={false} stroke="var(--foreground)" />
          <YAxis tick={false} stroke="var(--foreground)" />

          {/* Customize tooltip background and text color via contentStyle */}
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            }}
          />

          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.strokeColor ?? "hsl(var(--primary))"}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
