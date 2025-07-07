import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/registry/new-york/dynamic-components/simple-auth/lib/user";
import { verifyPassword } from "@/registry/new-york/dynamic-components/simple-auth/lib/auth-helpers";
import { LoginSchema } from "@/registry/new-york/dynamic-components/simple-auth/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await verifyPassword(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
