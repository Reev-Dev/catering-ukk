import { fadeUpOnce } from "@/lib/motion/motion";
import { CreditCard, Truck, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

export default function FeatureSection() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900 py-20">
      <div className="mx-auto max-w-5xl flex flex-col gap-12">
        <motion.div
          {...fadeUpOnce}
          className="flex flex-col mx-auto text-center px-4 gap-2"
        >
          <h2 className="text-4xl font-bold">Kenapa memilih kami?</h2>
          <h5 className="text-lg font-medium">
            Aplikasi kami memberikan pengalaman terbaik untuk anda
          </h5>
        </motion.div>
        <div className="grid grid-cols-3 gap-8 px-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <UtensilsCrossed />,
    title: "Banyak Pilihan Paket",
    desc: "Pilih paket catering sesuai keingan dan kebutuhan acara atau harian.",
  },
  {
    icon: <Truck />,
    title: "Mudah dan Cepat",
    desc: "Pesanan diantar lebih cepat dari anggaran yang anda ajukan.",
  },
  {
    icon: <CreditCard />,
    title: "Pembayaran Fleksibel",
    desc: "Mendukung berbagai metode pembayaran dengan sistem transparan.",
  },
];
