"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/registry/new-york/ui/card";
import { Social } from "@/registry/new-york/auth/components/social";
import { BackButton } from "@/registry/new-york/auth/components/back-button";

interface HeaderProps {
  mainLabel: string;
  subLabel: string;
}

export const Header = ({ mainLabel, subLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-bold">{mainLabel}</h1>
      <p className="text-muted-foreground text-sm">{subLabel}</p>
    </div>
  );
};

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
