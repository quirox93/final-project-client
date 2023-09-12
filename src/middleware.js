import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getUserById } from "./utils/api";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: ["/", "/api(.*)", "/product(.*)"],
  //ignoredRoutes: ["/api"],
  async afterAuth(auth, req) {
    const adminRoutes = [
      "/dashboard/products",
      "/dashboard/statistics",
      "/dashboard/users",
      "/dashboard/orders",
    ];

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && adminRoutes.includes(req.nextUrl.pathname)) {
      let isAdmin = false;

      if (auth.userId) {
        try {
          const user = await getUserById(auth.userId);
          isAdmin = user.dbData.isAdmin;
        } catch (error) {
          console.log({ isAdmin });
        }
      }
      const orgSelection = new URL("/", req.url);
      if (!isAdmin) return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
