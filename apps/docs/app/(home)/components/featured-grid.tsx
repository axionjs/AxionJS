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
    <div className=" mx-2 px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-4 auto-rows-fr *:grid-flow-row-dense">
        {/* CLI Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          className=" col-span-4 lg:col-span-2"
        >
          <AxionTerminalDemo />
        </motion.div>

        {/* Weekly Sales Card */}
        <motion.div
          variants={cardVariants}
          className=" col-span-4 lg:col-span-2 "
        >
          <LineChartMultiple />
        </motion.div>

        {/* Badge Collection */}
        <motion.div
          variants={cardVariants}
          className="  col-span-4 lg:col-span-2"
        >
          <TableBasic />
        </motion.div>

        {/* Avatar Showcase */}
        <motion.div
          variants={cardVariants}
          className=" col-span-4 lg:col-span-1"
        >
          <CardsCreateAccount />
        </motion.div>

        {/* Progress Card */}
        <motion.div
          variants={cardVariants}
          className=" col-span-4 lg:col-span-1"
        >
          <ContactPreferenceCard />
        </motion.div>
        <motion.div
          variants={cardVariants}
          className=" col-span-4 lg:col-span-1"
        >
          <CardRadio />
        </motion.div>
        <motion.div
          variants={cardVariants}
          className=" col-span-4 lg:col-span-2"
        >
          <MultipleSelectionCalendar />
        </motion.div>
        <motion.div
          variants={cardVariants}
          className=" col-span-4 lg:col-span-1"
        >
          <BottomNavigation mode="preview" {...props} />
        </motion.div>
      </div>
      <div className="mt-4 mx-auto flex justify-center">
        <Badge
          variant="primary"
          className="text-lg bg-white dark:bg-gray-800 rounded-full"
        >
          <Link href="/docs">Explore more components</Link>
        </Badge>
      </div>
    </div>
  );
};

export default FeatureGrid;
