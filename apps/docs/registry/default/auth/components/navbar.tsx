import { UserButton } from "@/registry/default/auth/components/user-button";

export const Navbar = async () => {
  return (
    <nav className="flex w-full mt-9 justify-end rounded-xl p-4 shadow-lg">
      <UserButton />
    </nav>
  );
};
