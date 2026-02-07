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
    <header className="bg-accent shadow-xl px-6 py-6 sticky top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-5xl w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
          <Image src="/logo.ico" alt="logo" width={30} height={30} />
          Catering-in
        </Link>

        <nav className="flex items-center gap-6">
          <ModeToggle />
          <Link href="/paket">Paket</Link>
          
          <NavbarActions session={session} role={role} />
        </nav>
      </div>
    </header>
  );
}
