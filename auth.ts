import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import async from "./app/(protected)/settings/page";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    //se dispara cuando un usuario de Oauth se registra en la DB
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role; //as "ADMIN" | "USER";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const userFromDB = await getUserById(token.sub);

      if (!userFromDB) return token;

      token.role = userFromDB.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
