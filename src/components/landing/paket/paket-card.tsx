"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toSlug } from "@/lib/slug";
import { formatRupiah } from "@/lib/formatter";

export function PaketCard({ paket }: { paket: any }) {
  return (
    <a href={`/paket/${toSlug(paket.nama_paket)} `} className="block">
      <Card
        className="
        group 
        h-full 
        overflow-hidden
        transition
        hover:shadow-lg
        hover:-translate-y-1
        pt-0
        pb-3
        gap-0
        rounded-xs
        "
      >
        {/* IMAGE */}
        <div className="aspect-square overflow-hidden">
          <Image
            src={paket.foto1 || "https://placehold.co/400x400/jpg"}
            alt={paket.nama_paket}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        <CardContent className="flex flex-col justify-between my-3 px-3">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 transition-opacity group-hover:opacity-100 opacity-80">
              <Badge variant="secondary">{paket.jenis}</Badge>
              <Badge>{paket.kategori}</Badge>
            </div>
            <h3 className="font-bold leading-tight line-clamp-1 group-hover:underline">
              {paket.nama_paket}
            </h3>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2 mt-auto px-3">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {paket.deskripsi || "-"}
          </p>
          <div className="flex w-full items-end justify-between">
            <div className="font-bold">
              {formatRupiah(paket.harga_paket)}
              {""}
              <span className="text-xs font-medium">/pax</span>
            </div>
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              stok {paket.jumlah_pax}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}
