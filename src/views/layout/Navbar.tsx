import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavbarActions from "@/components/layouts/navbar-actions";
import { ModeToggle } from "@/components/toggle-mode";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  return (
    <header className="border-b px-6 py-6">
      <div className="mx-auto flex max-w-5xl w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
          <Image src="/logo.ico" alt="logo" width={30} height={30} />
          Catering-in
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/paket">Paket</Link>
          <ModeToggle />
          
          <NavbarActions session={session} role={role} />
        </nav>
      </div>
    </header>
  );
}
