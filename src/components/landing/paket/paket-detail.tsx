"use client";

import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatter";
import Image from "next/image";

export function PaketDetail({ paket }: { paket: any }) {
  return (
    <div className="grid grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="space-y-4">
        <Image
          src={paket.foto1 || "https://placehold.co/600x400"}
          alt={paket.nama_paket}
          width={400}
          height={400}
          className="rounded-xs object-cover"
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
          {formatRupiah(paket.harga_paket)} / pax
        </div>

        <Button size="lg" className="w-full">
          Pesan Sekarang
        </Button>
      </div>
    </div>
  );
}
