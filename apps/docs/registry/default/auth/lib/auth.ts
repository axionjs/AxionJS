import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/registry/default/auth/lib/auth.config";
import { db } from "@/registry/default/auth/lib/db";
import {
  getAccountByUserId,
  getUserById,
} from "@/registry/default/auth/lib/user";
import { getTwoFactorConfirmationByUserId } from "@/registry/default/auth/actions/two-factor";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      if (account?.type !== "credentials") return true;
      const existingUser = await getUserById(user.id!);

      //Prevent login if email is not verified
      if (!existingUser?.emailVerified) return false;

      //2FA Check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      // model fields that can be updated by the user in the settings page
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth;
        session.user.image = token.image as string;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      // model fields that can be updated by the user in the settings page
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      // type conversion to boolean
      token.isOAuth = !!existingAccount;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
