"use client";
import { TwoFactorForm } from "@/registry/default/dynamic-components/two-factor-form/components/two-factor-form";

export default function TwoFA() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-xl px-4">
        <div className="grid gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Two-Factor Authentication
            </h2>
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
