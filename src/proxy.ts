import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  /* ================================
     1️⃣ Jika SUDAH LOGIN
     ================================ */
  if (token && (pathname === "/login" || pathname === "/register")) {
    if (token.role === "Pelanggan") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  /* ================================
     Proteksi admin dashboard
     ================================ */
  if (pathname.startsWith("/dashboard")) {
    if (!token || (token.role !== "Admin" && token.role !== "Owner")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  /* ================================
     4️⃣ Proteksi kurir
     ================================ */
  if (pathname.startsWith("/kurir")) {
    if (!token || token.role !== "Kurir") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/register",
    "/login",
    "/dashboard/:path*",
    "/admin/:path*",
    "/kurir/:path*",
  ],
};
