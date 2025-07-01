import { currentRole } from "@/registry/new-york/dynamic-components/auth/lib/get-user";
import { UserRole } from "@prisma/client";
import { FormError } from "@/registry/new-york/dynamic-components/auth/components/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export async function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = await currentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }
  return <>{children}</>;
}
