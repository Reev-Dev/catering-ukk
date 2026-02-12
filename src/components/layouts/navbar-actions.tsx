"use client";

import Link from "next/link";
import { ProfileMenu } from "./profile-menu";

export default function NavbarActions({
  session,
  role,
}: {
  session: any;
  role?: string;
}) {
  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">Login</Link>
        <Link
          href="/register"
          className="rounded-full bg-zinc-900 px-4 py-2 text-white"
        >
          Register
        </Link>
      </div>
    );
  }

  // Pelanggan
  if (role === "Pelanggan") {
    const pelanggan = session.user;

    return (
      <ProfileMenu
        name={pelanggan.name}
        email={pelanggan.email}
        image={pelanggan.image}
        role={role}
      />
    );
  }

  // Admin / Owner / Kurir
  return (
    <>
      <Link href="/dashboard">Dashboard</Link>
      <ProfileMenu
        name={session.user.name}
        email={session.user.email}
        image={session.user.foto}
        role={role}
      />
    </>
  );
}
