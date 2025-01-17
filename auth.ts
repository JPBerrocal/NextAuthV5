import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

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
    async signIn({ user, account }) {
      if (!user.id) return false;
      //Allow OAuth providers without email verification. In this case we are only using Google and GitHub,
      //others may need email verification so adjust accordingly.
      if (account?.provider !== "credentials") {
        return true;
      }

      //Prevent sign in without email verification
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          user.id
        );

        if (!twoFactorConfirmation) {
          return false;
        }
        //delete the two factor confirmation for next login
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role; //as "ADMIN" | "USER";
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      //name, email and isOAuth are setting for updating the user profile, no need it for actual authentication
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const userFromDB = await getUserById(token.sub);

      if (!userFromDB) return token;

      const existingAccount = await getAccountByUserId(userFromDB.id);

      //name, email and isOAuth are setting for updating the user profile, no need it for actual authentication
      token.isOAuth = !!existingAccount;
      token.name = userFromDB.name;
      token.email = userFromDB.email;

      token.role = userFromDB.role;
      token.isTwoFactorEnabled = userFromDB.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
