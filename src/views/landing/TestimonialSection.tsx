"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { fadeUpOnce } from "@/lib/motion/motion";

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Event Organizer",
    rating: 5,
    comment:
      "Makanannya enak, pengiriman tepat waktu, dan pelayanannya profesional.",
  },
  {
    name: "Siti Nurhaliza",
    role: "Karyawan",
    rating: 5,
    comment: "Catering harian jadi lebih praktis. Tinggal pesan, beres!",
  },
  {
    name: "Budi Santoso",
    role: "Owner Startup",
    rating: 4,
    comment: "Pilihan paketnya banyak dan fleksibel untuk kebutuhan kantor.",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.h2
          {...fadeUpOnce}
          className="text-center text-4xl font-bold mb-12"
        >
          Apa Kata Pelanggan Kami?
        </motion.h2>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-background p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                “{t.comment}”
              </p>

              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
