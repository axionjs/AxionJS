"use client";

import { Button } from "@/registry/new-york/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="font-normal w-full" size="sm" variant="link" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
