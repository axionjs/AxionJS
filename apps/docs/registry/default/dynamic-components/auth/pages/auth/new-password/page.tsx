import { NewPasswordForm } from "@/registry/default/dynamic-components/auth/components/new-password-form";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
}
