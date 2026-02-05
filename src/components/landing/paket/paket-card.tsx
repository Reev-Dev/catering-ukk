"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PaketCard({ paket }: { paket: any }) {
  return (
    <Card className="group overflow-hidden">
      {/* IMAGE */}
      <div className="aspect-square overflow-hidden">
        <Image
          src={paket.foto1 || "https://placehold.co/400x400/jpg"}
          alt={paket.nama_paket}
          width={400}
          height={400}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-2 pt-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{paket.jenis}</Badge>
          <Badge>{paket.kategori}</Badge>
        </div>

        <h3 className="font-semibold leading-tight line-clamp-2">
          {paket.nama_paket}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {paket.deskripsi}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="font-bold">
          Rp {paket.harga_paket.toLocaleString()}
        </span>

        <Link href={`/paket/${paket.id}`}>
          <Button size="sm">Detail</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
