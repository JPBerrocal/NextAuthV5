import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { useCallback } from "react";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //always available
  if (isAPIAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackURL = nextUrl.pathname;

    if (nextUrl.search) {
      callbackURL += nextUrl.search;
    }

    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackURL}`, nextUrl)
    );
  }

  return;
});

// el matcher define donde se invocan los middlewares
export const config = {
  //expresion tomada de https://clerk.com/docs/references/nextjs/auth-middleware#usage
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
