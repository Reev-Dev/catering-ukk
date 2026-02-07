"use client";

import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatter";
import { PaketImageCarousel } from "@/components/landing/paket/paket-image-carousel";
import { ChevronsRight, Home, MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function PaketDetail({ paket }: { paket: any }) {
  const images = [paket.foto1, paket.foto2, paket.foto3].filter(Boolean); // buang null
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-3">
        {/* IMAGE */}
        <PaketImageCarousel
          images={images.length ? images : ["https://placehold.co/400x400/jpg"]}
        />

        {/* CONTENT */}
        <div className="flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronsRight />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/paket">Paket</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronsRight />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="max-w-50 truncate">
                      {paket.nama_paket}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Button
                variant="ghost"
                size="sm"
                className="flex w-fit items-center rounded-xs transition-all duration-300 hover:translate-x-1"
                onClick={() => router.back()}
              >
                <MoveLeftIcon />
                Kembali
              </Button>
            </div>
            <h1 className="text-4xl font-bold">{paket.nama_paket}</h1>
            <h5 className="text-md font-medium">
              Stok: <span className="font-bold">{paket.jumlah_pax}</span>
            </h5>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Badge className="text-sm px-4 py-1">{paket.kategori}</Badge>
              <Badge variant="outline" className="text-sm px-4 py-1">
                {paket.jenis}
              </Badge>
            </div>

            <div className="text-3xl font-bold mt-2">
              {formatRupiah(paket.harga_paket)}
            </div>

            <Button
              size="lg"
              className="w-full rounded-xs mt-4"
              onClick={() => router.push(`/pesan/${paket.id}`)}
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Separator />
        <h2 className="mt-4">Deskripsi</h2>
        <p className="text-muted-foreground">{paket.deskripsi || "-"}</p>
      </div>
    </div>
  );
}
