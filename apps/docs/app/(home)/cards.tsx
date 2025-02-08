"use client";
// Import BentoGrid + BentoCard from the file above:
import { BentoGrid, BentoCard } from "./bento-grid";
import { DotPattern } from "@/registry/new-york/ui/dot";
import { cn } from "@/lib/utils";
// Import your preview components:
import { ButtonPreview } from "@/app/components/docs/ButtonPreview";
import { MultipleSelectionCalendar } from "@/app/components/docs/CalendarPreview";
import { LoginCardExample } from "@/app/components/docs/CardPreview";
import { MultiCarousel } from "@/app/components/docs/CarouselPreview";
import { SimpleDrawerPreview } from "@/app/components/docs/DrawerPreview";
import { HoverCardPreview } from "@/app/components/docs/HoverCardPreview";
import PasswordPreview from "@/app/components/docs/PasswordPreview";
import { ProgressWithLabelPreview } from "@/app/components/docs/ProgressPreview";
import { SingleButtonSheetPreview } from "@/app/components/docs/SheetPreview";
import SwitchPreview from "@/app/components/docs/SwitchPreview";
import { SingleSelectToggleGroupPreview } from "@/app/components/docs/ToggleGroupPreview";
import { MultiLineChartPreview } from "@/app/components/docs/SimpleLineChartPreview";
import { HorizontalPanelsPreview } from "@/app/components/docs/ResizablePreview";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:60px_60px] dark:bg-grid-gray-400/[0.05]" />
        <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8 mx-10 sm:mx-14">
          <div className="text-start">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Axion / js – Create Your <br />
              Ultimate Component Library
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-gray-500 dark:text-gray-300">
              Sleek, copy-paste-ready components for your apps. Built with
              Tailwind CSS. Open source.
            </p>
          </div>
        </div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] -z-20"
          )}
        />
      </section>

      {/* Bento Grid Section */}
      <section className="py-20  sm:py-20">
        <div className="mx-auto px-4 sm:px-8 lg:px-12 ">
          <BentoGrid className="grid-flow-row-dense">
            <BentoCard className="col-span-2 row-span-2 lg:col-span-1 lg:row-span-2">
              <div className="h-full w-full">
                <MultiLineChartPreview />
              </div>
            </BentoCard>
            <BentoCard className="col-span-2 lg:col-span-1 row-span-1">
              <ButtonPreview />
            </BentoCard>

            <BentoCard className="col-span-2 lg:col-span-1 lg:row-span-3">
              <LoginCardExample />
            </BentoCard>

            <BentoCard className="col-span-2 lg:col-span-1 row-span-2">
              <MultipleSelectionCalendar />
            </BentoCard>

            <BentoCard className="col-span-2 md:col-span-1 row-span-1">
              <SimpleDrawerPreview />
            </BentoCard>

            <BentoCard className="col-span-2 row-span-1">
              <MultiCarousel />
            </BentoCard>

            <BentoCard className="col-span-2 md:col-span-1 lg:row-span-2 ">
              <HorizontalPanelsPreview />
            </BentoCard>

            <BentoCard className="col-span-2 md:col-span-1 row-span-1">
              <HoverCardPreview />
            </BentoCard>

            <BentoCard className="col-span-2 md:col-span-1 lg:row-span-4">
              <PasswordPreview />
            </BentoCard>

            <BentoCard className="col-span-2 lg:col-span-1 row-span-1">
              <ProgressWithLabelPreview />
            </BentoCard>

            <BentoCard className="col-span-2 md:col-span-1 row-span-1">
              <SingleButtonSheetPreview />
            </BentoCard>

            <BentoCard className="col-span-2 md:col-span-2 lg:col-span-1 row-span-1">
              <SwitchPreview />
            </BentoCard>

            <BentoCard className="col-span-1 row-span-1">
              <SingleSelectToggleGroupPreview />
            </BentoCard>
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}
