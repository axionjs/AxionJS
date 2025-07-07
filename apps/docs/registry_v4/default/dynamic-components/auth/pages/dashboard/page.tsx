import { redirect } from "next/navigation";
import { auth } from "@/registry/default/dynamic-components/auth/lib/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Button } from "@/registry/default/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { currentUser } from "@/registry/default/dynamic-components/simple-auth/lib/get-user";
import Link from "next/link";

export default async function UserDashboard() {
  const session = await auth();
  const userData = await currentUser();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="h-screen w-screen bg-white overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Compact Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {session?.user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Online</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-2 h-full max-w-5xl mx-auto">
            {/* Profile Card */}
            <Card className="border border-gray-200 bg-white h-fit">
              <CardHeader className="text-center pb-4 pt-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border border-gray-200">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-700 text-lg font-medium">
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {session?.user?.name || "User"}
                </h2>
                <p className="text-sm text-gray-500">Profile Information</p>
              </CardHeader>

              <CardContent className="space-y-3 px-6 pb-6">
                {/* User ID */}
                <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">User ID</p>
                    <p className="text-xs text-gray-500">Identifier</p>
                  </div>
                  <p className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded border">
                    {session?.user?.id
                      ? `${session.user.id.slice(0, 8)}...`
                      : "N/A"}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-xs text-gray-500">Contact</p>
                  </div>
                  <p className="text-sm text-gray-700 truncate max-w-[150px]">
                    {session?.user?.email || "Not provided"}
                  </p>
                </div>

                {/* Role */}
                <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Role</p>
                    <p className="text-xs text-gray-500">Access level</p>
                  </div>
                  <Badge
                    variant={
                      session?.user?.role === "ADMIN" ? "default" : "secondary"
                    }
                    className={`text-xs ${
                      session?.user?.role === "ADMIN"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {session?.user?.role || "USER"}
                  </Badge>
                </div>

                {/* Two Factor Authentication */}
                {!userData?.isOAuth && (
                  <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Two-Factor Auth
                      </p>
                      <p className="text-xs text-gray-500">Security</p>
                    </div>
                    <Badge
                      className={`text-xs ${
                        session?.user?.isTwoFactorEnabled
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {session?.user?.isTwoFactorEnabled
                        ? "ENABLED"
                        : "DISABLED"}
                    </Badge>
                  </div>
                )}

                {/* Account Status */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-medium text-green-800">
                      Account Active
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions & Settings */}
            <div className="space-y-6">
              {/* Account Settings */}
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="pb-4 pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Settings
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Manage account</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 px-6 pb-6">
                  <Link href="/profile">
                    <Button
                      className="w-full justify-between bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 h-10"
                      variant="outline"
                    >
                      <span>Edit Profile</span>
                      <span>→</span>
                    </Button>
                  </Link>

                  {!session?.user?.isOAuth && (
                    <Link href="/profile/change-password">
                      <Button
                        className="w-full justify-between bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 h-10"
                        variant="outline"
                      >
                        <span>Change Password</span>
                        <span>→</span>
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Admin Access */}
              {session.user.role === "ADMIN" && (
                <Card className="border border-gray-300 bg-gray-50">
                  <CardHeader className="pb-4 pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Admin Panel
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Administrative access
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      Manage users and system settings
                    </p>
                    <Link href="/admin">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-10">
                        <span>Admin Dashboard</span>
                        <span className="ml-2">→</span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
