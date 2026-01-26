"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between px-10 py-6 border-b">
      <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
        <Image src="/logo.ico" alt="logo" width={30} height={30} />
        Catering-in
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/paket">Paket</Link>

        {status === "authenticated" ? (
          <>
            <Link href="/cart">Keranjang</Link>
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
      </nav>
    </header>
  );
}
