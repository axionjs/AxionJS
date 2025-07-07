"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams, useRouter } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { FormSuccess } from "@/registry/default/dynamic-components/auth/components/form-success";
import { FormError } from "@/registry/default/dynamic-components/auth/components/form-error";
import {
  newVerification,
  verifyEmailChange,
} from "@/registry/default/dynamic-components/auth/actions/auth-actions";

export function NewVerificationForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isEmailChange = searchParams.get("emailChange") === "true";

  const onsubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    if (isEmailChange) {
      verifyEmailChange(token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
          if (data.success) {
            // Refresh the page after a short delay to reflect changes
            setTimeout(() => {
              router.refresh();
            }, 2000);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    } else {
      newVerification(token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
          if (data.success) {
            // Refresh the page after a short delay to reflect changes
            setTimeout(() => {
              router.refresh();
            }, 2000);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    }
  }, [token, success, error, isEmailChange, router]);

  useEffect(() => {
    onsubmit();
  }, [onsubmit]);

  return (
    <CardWrapper
      mainHeaderLabel="Email Verification"
      subHeaderLabel={
        isEmailChange
          ? "Confirming your email change"
          : "Confirming your verification"
      }
      backButtonHref={isEmailChange ? "/profile" : "/login"}
      backButtonLabel={isEmailChange ? "Back to Profile" : "Back to Login"}
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
