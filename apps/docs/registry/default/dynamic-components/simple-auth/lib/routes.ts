/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/verify"];

/**
 * An array of routes that are accessible only to authenticated users.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * An array of routes that are accessible only to admin users.
 * @type {string[]}
 */
export const adminRoutes = [
  "/admin",
  // Add other admin routes here
];

/**
 * The prefix for all API auth routes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/auth/dashboard";
