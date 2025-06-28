"use client";
import { TwoFactorForm } from "@/registry/new-york/dynamic-components/two-factor-form/components/two-factor-form";

export default function TwoFA() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-xl px-4">
        <div className="grid gap-8">
          <div className="space-y-4">
            <TwoFactorForm
              onSuccess={(email) => {
                console.log("2FA Success for:", email);
              }}
              onError={(error) => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
