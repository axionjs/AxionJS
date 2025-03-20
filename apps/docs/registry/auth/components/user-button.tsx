import { User } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { LogoutButton } from "@/registry/auth/components/logout-button";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/registry/new-york/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { currentUser } from "@/registry/auth/lib/get-user";

export const UserButton = async () => {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {/* tutorial code: cursor-pointer on LogoutButton won't work because DropdownMenuItem will override it */}
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
