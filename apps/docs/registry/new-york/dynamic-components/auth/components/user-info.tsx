import { ExtendedUser } from "@/registry/new-york/dynamic-components/auth/lib/next-auth";
import { Badge } from "@/registry/new-york/ui/badge";
import { Card, CardContent, CardHeader } from "@/registry/new-york/ui/card";
import { currentUser } from "@/registry/new-york/dynamic-components/auth/lib/get-user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { User } from "lucide-react";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export async function UserInfo({ user, label }: UserInfoProps) {
  const userData = await currentUser();
  return (
    <Card className="shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="text-sm text-muted-foreground">{user?.id}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="mtext-sm text-muted-foreground">{user?.name}</p>
        </div>

        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="text-sm text-muted-foreground">{user?.role}</p>
        </div>
        {!userData?.isOAuth && (
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">Two Factor Authentication</p>
            <Badge
              variant={user?.isTwoFactorEnabled ? "default" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
