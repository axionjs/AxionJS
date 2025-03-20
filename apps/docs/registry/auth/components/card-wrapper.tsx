"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/registry/new-york/ui/card";
import { Header } from "@/registry/auth/components/header";
import { Social } from "@/registry/auth/components/social";
import { BackButton } from "@/registry/auth/components/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  mainHeaderLabel: string;
  subHeaderLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  mainHeaderLabel,
  subHeaderLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <Header mainLabel={mainHeaderLabel} subLabel={subHeaderLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
