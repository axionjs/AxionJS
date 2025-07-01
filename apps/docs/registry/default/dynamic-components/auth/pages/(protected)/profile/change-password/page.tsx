import { ChangePasswordForm } from "@/registry/default/dynamic-components/auth/components/change-password-form";
import { Suspense } from "react";

export default function ChangePasswordPage() {
  return (
    <Suspense>
      <ChangePasswordForm />
    </Suspense>
  );
}
