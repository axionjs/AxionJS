import { CardWrapper } from "@/registry/default/dynamic-components/auth/components/card-wrapper";
import { AlertTriangleIcon } from "lucide-react";

export function ErrorCard() {
  return (
    <CardWrapper
      mainHeaderLabel="Error"
      subHeaderLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <AlertTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
