"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function NavbarActions({
  session,
  role,
}: {
  session: any;
  role?: string;
}) {
  return (
    <>
      {session ? (
        <>
          {role === "Pelanggan" ? (
            <Link href="/cart">Keranjang</Link>
          ) : (
            <Link href="/dashboard">Dashboard</Link>
          )}

          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border px-4 py-2"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link
            href="/register"
            className="rounded-full bg-zinc-900 px-4 py-2 text-white"
          >
            Register
          </Link>
        </>
      )}
    </>
  );
}
