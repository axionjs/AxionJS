"use client";
import React from "react";
import { motion } from "motion/react";
import { AxionTerminalDemo } from "../../components/docs/terminal-card";
import TableBasic from "./table-basic";
import { CardsCreateAccount } from "./create-account";
import CardRadio from "./card-select";
import { MultipleSelectionCalendar } from "./Calendar";
import { LineChartMultiple } from "./line-chart-multiple";
import ContactPreferenceCard from "./radio-group";
import BottomNavigation from "./Navigation";
import type { BottomNavigationProps } from "./Navigation";
import { Badge } from "@/registry/new-york/ui/badge";
import Link from "next/link";

const FeatureGrid = (props: BottomNavigationProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -4,
      scale: 1.01,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="mx-2 px-2 sm:px-6 py-4 sm:py-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 auto-rows-fr grid-flow-row-dense"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {/* CLI Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          className="col-span-1 sm:col-span-2 lg:col-span-2 min-h-[300px] sm:min-h-[400px]"
        >
          <AxionTerminalDemo />
        </motion.div>

        {/* Weekly Sales Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 sm:col-span-2 lg:col-span-2 min-h-[300px] sm:min-h-[400px]"
        >
          <LineChartMultiple />
        </motion.div>

        {/* Badge Collection */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 sm:col-span-2 lg:col-span-2 min-h-[300px] sm:min-h-[400px]"
        >
          <TableBasic />
        </motion.div>

        {/* Avatar Showcase */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 min-h-[300px] sm:min-h-[400px]"
        >
          <CardsCreateAccount />
        </motion.div>

        {/* Progress Card */}
        <motion.div
          variants={cardVariants}
          className="col-span-1 min-h-[300px] sm:min-h-[400px]"
        >
          <ContactPreferenceCard />
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="col-span-1 min-h-[300px] sm:min-h-[400px]"
        >
          <CardRadio />
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="col-span-1 sm:col-span-2 lg:col-span-2 min-h-[300px] sm:min-h-[400px]"
        >
          <MultipleSelectionCalendar />
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="col-span-1 min-h-[300px] sm:min-h-[400px]"
        >
          <BottomNavigation mode="preview" {...props} />
        </motion.div>
      </motion.div>
      <div className="mt-4 sm:mt-6 mx-auto flex justify-center">
        <Badge
          variant="primary"
          className="text-sm sm:text-lg bg-white dark:bg-gray-800 rounded-full px-4 py-2"
        >
          <Link href="/docs">Explore more components</Link>
        </Badge>
      </div>
    </div>
  );
};

export default FeatureGrid;
