import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(request: NextRequest) {
    const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
    const token = (request as any).nextauth.token;

    if (isAdminPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

        if (isProtectedRoute || isAdminRoute) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
  ],
};
