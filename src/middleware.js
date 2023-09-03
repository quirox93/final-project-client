import { authMiddleware, redirectToSignIn, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getUserById } from "./utils/api";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: ["/", "/api(.*)", "/product(.*)"],
  //ignoredRoutes: ["/api"],
  async afterAuth(auth, req, evt) {
    const adminRoutes = ["/dashboard/products", "/dashboard/statistics"];

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // handle users in admin routes
    let isAdmin = false;

    if (auth.userId) {
      try {
        const user = await getUserById(auth.userId);
        isAdmin = user.dbData.isAdmin;
        console.log({ isAdmin });
      } catch (error) {
        console.log({ isAdmin });
      }
    }
    console.log({ userId: auth.userId, middleware: isAdmin });
    if (auth.userId && !isAdmin && adminRoutes.includes(req.nextUrl.pathname)) {
      const orgSelection = new URL("/", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
