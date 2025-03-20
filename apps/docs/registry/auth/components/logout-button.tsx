"use client";

import { logout } from "@/registry/auth/actions/auth-actions";

// alternatively, use client-side signOut() from next-auth/react
// import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
