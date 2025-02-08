import React from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// -------------------------------
// 1) PROPS INTERFACES
// -------------------------------
interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background: ReactNode;
  children?: ReactNode;
}

// -------------------------------
// 2) BENTO GRID
// -------------------------------
export const BentoGrid = ({
  children,
  className,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]",
        "mx-auto max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// -------------------------------
// 3) BENTO CARD
// -------ass---------------------
export const BentoCard = ({
  name,
  className,
  background,
  children,
  ...props
}: BentoCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] border border-gray-100",
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
      {...props}
    >
      {/* Background container with centering */}
      <div className="absolute inset-0 z-0 flex content-center px-4 ">
        <div className="h-full w-full z-10 flex items-center justify-center ">
          {background}
        </div>
      </div>

      {/* Foreground content container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-2">
        {children ?? <span>{name}</span>}
      </div>
    </div>
  );
};
