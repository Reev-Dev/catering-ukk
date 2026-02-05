"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function PaketDetail({ paket }: { paket: any }) {
  return (
    <div className="grid grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="space-y-4">
        <img
          src={paket.foto || "https://placehold.co/600x400"}
          alt={paket.nama_paket}
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{paket.nama_paket}</h1>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{paket.kategori}</span>
          <span>{paket.jumlah_pax} pax</span>
        </div>

        <p className="text-muted-foreground">{paket.deskripsi}</p>

        <div className="text-2xl font-bold">
          Rp {paket.harga_paket.toLocaleString()}
        </div>

        <Button size="lg" className="w-full">
          Pesan Sekarang
        </Button>
      </div>
    </div>
  );
}
