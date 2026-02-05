import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const MotionImage = motion(Image);

export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl items-center gap-8 px-6 mb-4 text-start">
      <div className="flex flex-col">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold leading-tight mb-2"
        >
          Solusi Catering Online
          <span className="block text-2xl text-primary">
            Cepat • Simpel • Satset
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-md text-zinc-600 dark:text-zinc-400 mb-8"
        >
          <b>Catering-in</b> adalah aplikasi catering online yang memudahkan
          pelanggan memesan makanan dengan banyak pilihan paket yang lengkap,
          harga yang transparan dan pemesanan yang mudah.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-4"
        >
          <Link
            href="/paket"
            className="rounded-full bg-zinc-900 px-8 py-3 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black"
          >
            Pesan Sekarang
          </Link>
        </motion.div>
      </div>
      <MotionImage
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        src={"/hero-section (2).png"}
        width={500}
        height={500}
        alt="hero image"
        className="hidden md:block"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
        priority
      />
    </section>
  );
}
