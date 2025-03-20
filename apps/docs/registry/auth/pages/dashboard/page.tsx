import { redirect } from "next/navigation";
import { auth } from "@/registry/auth/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { UserInfo } from "@/registry/auth/components/user-info";

export default async function UserDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <UserInfo user={session?.user} label="" />

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your account settings and preferences.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild variant="outline">
                <a href="/profile">Edit Profile</a>
              </Button>
              {!session?.user?.isOAuth && (
                <Button className="w-full" asChild variant="outline">
                  <a href="/profile/change-password">Change Password</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {session.user.role === "ADMIN" && (
        <div className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You have admin privileges. You can access the admin dashboard to
                manage users and system settings.
              </p>
              <Button asChild>
                <a href="/admin">Go to Admin Dashboard</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
