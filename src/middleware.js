import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
const admins = [
  "user_2U7MgZBslUlX4zg3iieKxINzKIB",
  "user_2U8LCZZrvJWPMSAgM2MsYPe9XId",
  "user_2U7BkiE3nPsHRj7WtJWG9SwDanS",
  "user_2UA7mWtF6PJciejLdAFLWkOSTCd",
  "user_2U8FMC4m61iVZhi1bCY0wgBVYAh",
  "user_2U7lyFuCZmlhOKV24fdPrIn3Ktp",
];
export default authMiddleware({
  publicRoutes: ["/", "/api(.*)", "/product(.*)"],
  //ignoredRoutes: ["/api"],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to home page
    if (auth.userId && !admins.includes(auth.userId) && !auth.isPublicRoute) {
      const orgSelection = new URL("/", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
