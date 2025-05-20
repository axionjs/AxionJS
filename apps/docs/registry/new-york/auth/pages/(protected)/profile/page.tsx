import { CardWrapper } from "@/registry/new-york/auth/components/card-wrapper";
import { SettingsForm } from "@/registry/new-york/auth/components/settings-form";

export default function SettingsPage() {
  return (
    <div className="w-full mx-auto py-8 px-4">
      <CardWrapper
        mainHeaderLabel="Profile"
        subHeaderLabel="Update your account settings"
        backButtonLabel="Back to Dashboard"
        backButtonHref="/dashboard"
      >
        <SettingsForm />
      </CardWrapper>
    </div>
  );
}
