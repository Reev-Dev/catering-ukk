"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { UtensilsCrossed, Truck, CreditCard } from "lucide-react";

export default function LandingPage() {
  const { status } = useSession();

  return (
    <>
      {/* HERO */}
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-32 text-center">
        <h2 className="text-5xl font-bold leading-tight">
          Solusi Catering Online
          <span className="block text-primary">
            Cepat • Mudah • Terorganisir
          </span>
        </h2>

        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          <b>Catering-in</b> adalah aplikasi catering online yang memudahkan
          pelanggan memesan makanan, kurir mengantar pesanan, dan admin
          mengelola bisnis catering dalam satu sistem.
        </p>

        {status === "unauthenticated" && (
          <div className="flex gap-4">
            <Link
              href="/register"
              className="rounded-full bg-zinc-900 px-8 py-3 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black"
            >
              Mulai Sekarang
            </Link>
            <Link
              href="/login"
              className="rounded-full border px-8 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Login
            </Link>
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-32 md:grid-cols-3">
        <Feature
          icon={<UtensilsCrossed />}
          title="Pemesanan Catering"
          desc="Pilih paket catering sesuai kebutuhan acara atau harian."
        />
        <Feature
          icon={<CreditCard />}
          title="Pembayaran Fleksibel"
          desc="Mendukung berbagai metode pembayaran dengan sistem tercatat."
        />
        <Feature
          icon={<Truck />}
          title="Kurir Terintegrasi"
          desc="Pesanan dikelola dan diantar oleh kurir dengan status realtime."
        />
      </section>
    </>
  );
}

/* COMPONENT KECIL */
function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{desc}</p>
    </div>
  );
}
