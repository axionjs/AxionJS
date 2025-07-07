"use client";
import { OAuthLogin } from "@/registry/default/dynamic-components/social-auth/components/oauth-login";

export default function Social() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-xl px-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">OAuth Login</h2>
          <OAuthLogin
            onSuccess={(provider, user) => {
              console.log("OAuth Success:", { provider, user });
            }}
            onError={(error) => {
              console.error("OAuth Error:", error);
            }}
            providers={["github"]}
          />
        </div>
      </div>
    </div>
  );
}
