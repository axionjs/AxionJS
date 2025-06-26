import { NewPasswordForm } from "@/registry/new-york/dynamic-components/auth/components/new-password-form";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
}
