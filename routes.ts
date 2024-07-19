/**
 * Routes that are accesible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect in users ...
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
