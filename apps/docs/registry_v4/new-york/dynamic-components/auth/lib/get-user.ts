import { auth } from "@/registry/new-york/dynamic-components/simple-auth/lib/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
export const isCurrentAccountOAuth = async () => {
  const session = await auth();
  return session?.user?.isOAuth;
};
