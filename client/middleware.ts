import jwtDecode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN } from "./config/storage";

type DecodedResponse = {
  id: string;
  iat: number;
  exp: number;
  role: "user" | "admin" | "vendor";
};

export default function middleware(req: NextRequest, res: NextResponse) {
  const authToken = req.cookies.get(AUTH_TOKEN)?.value;

  const url = req.nextUrl.pathname;

  const authRoutes = ["/login", "/register", "/forgotPassword"];

  const isAdminRoute = url.startsWith("/admin");
  const isVendorRoute = url.startsWith("/vendor");
  const isAuthRoute = authRoutes.includes(url);

  if (authToken) {
    try {
      // Decode token
      const decoded: DecodedResponse = jwtDecode(authToken);
      const userRole = decoded.role;

      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Allow all routes to admin
      if (userRole === "admin") {
        // Nothing to do
      } else if (userRole === "vendor") {
        if (isAdminRoute) {
          return NextResponse.redirect(new URL("/", req.url));
        } else {
          // Nothing to do
        }
      } else if (userRole === "user") {
        if (isAdminRoute || isVendorRoute)
          return NextResponse.redirect(new URL("/", req.url));
      }

      // Check if it is allowed to access current route
    } catch (error) {
      console.log(error);
    }
  } else {
    // Admin & Vendor (and some more protected routes like profile, orders etc.) routes not allowed if there is no token
    if (isAdminRoute || isVendorRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
