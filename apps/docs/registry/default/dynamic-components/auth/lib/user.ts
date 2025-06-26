import { db } from "@/registry/default/dynamic-components/auth/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    return user;
  } catch (e) {
    return null;
  }
};
export const getUpdatedEmailUser = async (email: string) => {
  try {
    const user = await db.verificationToken.findFirst({
      where: { email },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: { id },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch {
    return null;
  }
};
