import { Navbar } from "@/registry/auth/components/navbar";
import { SessionProvider } from "next-auth/react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <SessionProvider>
      <div className="grid items-center justify-center h-full grid-col-2 gap-y-10">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
