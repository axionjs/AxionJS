import { OnboardingWizard } from "@/registry/new-york/dynamic-components/multi-step-form/components/onboarding-wizard";

export default function OnboardingPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Complete Your Profile
      </h1>
      <OnboardingWizard
        redirectUrl="/dashboard"
        showStepIndicator={true}
        submitButtonLabel="Complete Setup"
      />
    </div>
  );
}
