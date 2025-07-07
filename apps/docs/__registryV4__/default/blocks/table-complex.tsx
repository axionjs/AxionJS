"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { motion } from "motion/react";
import { CheckIcon, MonitorIcon, SmartphoneIcon, XIcon } from "lucide-react";
import { useState } from "react";

// Browser compatibility data
const browserFeatures = [
  {
    feature: "container-queries",
    desktop: [
      { name: "Chrome", supported: true, version: "105" },
      { name: "Edge", supported: true, version: "105" },
      { name: "Firefox", supported: true, version: "110" },
      { name: "Opera", supported: true, version: "91" },
      { name: "Safari", supported: true, version: "16" },
    ],
    mobile: [
      { name: "Chrome Android", supported: true, version: "105" },
      { name: "Firefox Android", supported: true, version: "110" },
      { name: "Opera Android", supported: true, version: "73" },
      { name: "Safari iOS", supported: true, version: "16" },
      { name: "Samsung Internet", supported: true, version: "20" },
    ],
  },
  {
    feature: "subgrid",
    desktop: [
      { name: "Chrome", supported: true, version: "117" },
      { name: "Edge", supported: true, version: "117" },
      { name: "Firefox", supported: true, version: "71" },
      { name: "Opera", supported: true, version: "103" },
      { name: "Safari", supported: true, version: "16" },
    ],
    mobile: [
      { name: "Chrome Android", supported: true, version: "117" },
      { name: "Firefox Android", supported: true, version: "71" },
      { name: "Opera Android", supported: true, version: "79" },
      { name: "Safari iOS", supported: true, version: "16" },
      { name: "Samsung Internet", supported: true, version: "22" },
    ],
  },
  {
    feature: "has-selector",
    desktop: [
      { name: "Chrome", supported: true, version: "121" },
      { name: "Edge", supported: true, version: "121" },
      { name: "Firefox", supported: true, version: "121" },
      { name: "Opera", supported: true, version: "107" },
      { name: "Safari", supported: true, version: "15.4" },
    ],
    mobile: [
      { name: "Chrome Android", supported: true, version: "121" },
      { name: "Firefox Android", supported: true, version: "121" },
      { name: "Opera Android", supported: true, version: "79" },
      { name: "Safari iOS", supported: true, version: "15.4" },
      { name: "Samsung Internet", supported: false, version: "No" },
    ],
  },
];

export default function TableComplex() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div className="p-6 bg-background rounded-lg border">
      <h2 className="text-2xl font-bold mb-6">CSS Feature Compatibility</h2>
      <div className="overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow className="*:border-border border-y-0 hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell></TableCell>
                <TableHead className="border-b text-center" colSpan={5}>
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MonitorIcon
                      className="inline-flex"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>Desktop browsers</span>
                  </motion.div>
                </TableHead>
                <TableHead className="border-b text-center" colSpan={5}>
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <SmartphoneIcon
                      className="inline-flex"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>Mobile browsers</span>
                  </motion.div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableHeader>
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell></TableCell>
                {browserFeatures[0].desktop.map((browser) => (
                  <TableHead
                    key={browser.name}
                    className="h-auto py-3 align-bottom text-foreground"
                  >
                    <span className="relative left-[calc(50%-.5rem)] block rotate-180 whitespace-nowrap leading-4 [text-orientation:sideways] [writing-mode:vertical-rl]">
                      {browser.name}
                    </span>
                  </TableHead>
                ))}
                {browserFeatures[0].mobile.map((browser) => (
                  <TableHead
                    key={browser.name}
                    className="h-auto py-3 align-bottom text-foreground"
                  >
                    <span className="relative left-[calc(50%-.5rem)] block rotate-180 whitespace-nowrap leading-4 [text-orientation:sideways] [writing-mode:vertical-rl]">
                      {browser.name}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {browserFeatures.map((item) => (
                <TableRow
                  key={item.feature}
                  className="*:border-border [&>:not(:last-child)]:border-r"
                  onMouseEnter={() => setHoveredFeature(item.feature)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <TableHead className="font-medium text-foreground">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`transition-colors duration-200 ${hoveredFeature === item.feature ? "text-primary" : ""}`}
                    >
                      {item.feature}
                    </motion.div>
                  </TableHead>
                  {[...item.desktop, ...item.mobile].map((browser, index) => (
                    <TableCell
                      key={`${browser.name}-${index}`}
                      className="space-y-1 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                      >
                        {browser.supported ? (
                          <CheckIcon
                            className="inline-flex stroke-emerald-600"
                            size={16}
                            aria-hidden="true"
                          />
                        ) : (
                          <XIcon
                            className="inline-flex stroke-red-600"
                            size={16}
                            aria-hidden="true"
                          />
                        )}
                      </motion.div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {browser.version}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
