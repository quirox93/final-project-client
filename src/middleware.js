import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { CLERK_ORG_ID } from "./utils/config";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: ["/", "/api(.*)", "/product(.*)"],
  //ignoredRoutes: ["/api"],
  async afterAuth(auth, req, evt) {
    const adminRoutes = ["/dashboard/products", "/dashboard/statistics"];

    // get all organizations from user
    let orgs = [];
    if (auth.sessionClaims?._orgs) orgs = Object.keys(auth.sessionClaims._orgs);

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // handle users in admin routes
    if (auth.userId && !orgs.includes(CLERK_ORG_ID) && adminRoutes.includes(req.nextUrl.pathname)) {
      const orgSelection = new URL("/", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
