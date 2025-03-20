import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { RoleGate } from "@/registry/auth/components/role-gate";
import { FormSuccess } from "@/registry/auth/components/form-success";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/registry/auth/lib/get-user";

export default async function AdminPage() {
  const user = await currentRole();
  if (user !== "ADMIN") {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <RoleGate allowedRole={UserRole.ADMIN}>
              <FormSuccess message="You are allowed to view this content!" />
            </RoleGate>
            <p className="text-sm text-muted-foreground mb-4">
              You have admin privileges. You can manage users and system
              settings.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild variant="outline">
                <a href="#">Manage Users</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Perform quick actions from the admin dashboard.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild variant="outline">
                <a href="/admin/create-user">Create New User</a>
              </Button>
              <Button className="w-full" asChild variant="outline">
                <a href="/admin/reports">View Reports</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Admin Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Overview of system statistics and performance.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild variant="outline">
                <a href="/admin/statistics">View Statistics</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
