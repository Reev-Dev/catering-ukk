import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = token?.role;

  // Redirect authenticated users away from auth pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(
      new URL(role === "Pelanggan" ? "/" : "/dashboard", req.url),
    );
  }

  // Protecting dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const allowedRoles = ["Admin", "Owner", "Kurir"];

    if (!token || !allowedRoles.includes(role as string)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Protection Cart and Checkout routes
  if (
    pathname.startsWith("/pesanan-saya") ||
    pathname.startsWith("/checkout")
  ) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If role isn't Pelanggan, redirect to unauthorized
    if (role !== "Pelanggan") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/checkout/:path*",
    "/pesanan-saya/:path*",
  ],
};
