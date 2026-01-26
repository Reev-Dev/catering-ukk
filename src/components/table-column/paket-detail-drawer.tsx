"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import { formatRupiah } from "@/lib/formatter";
import { toAbsoluteUrl } from "@/lib/helpers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type Paket = {
  id: string;
  nama_paket: string;
  jenis: string;
  kategori: string;
  deskripsi?: string;
  jumlah_pax: number;
  harga_paket: number;
  foto1?: string | null;
  foto2?: string | null;
  foto3?: string | null;
};

interface PaketDetailDrawerProps {
  paket: Paket;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PaketDetailDrawer({
  paket,
  onEdit,
  onDelete,
}: PaketDetailDrawerProps) {
  const images = [paket.foto1, paket.foto2, paket.foto3].filter(
    (img): img is string => Boolean(img),
  );

  return (
    <Drawer direction="right">
      {/* TRIGGER */}
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <Eye className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-105 sm:w-120">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            Detail Paket
            <DrawerClose asChild>
              <Button size="icon" variant="ghost">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        {/* CONTENT */}
        <div className="no-scrollbar overflow-y-auto px-4 space-y-4">
          {/* 🔥 CAROUSEL IMAGE */}
          {images.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-square overflow-hidden rounded-md border">
                      <img
                        src={toAbsoluteUrl(img)}
                        alt={`foto-${i}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {images.length > 1 && (
                <>
                  <CarouselPrevious className="ml-16" />
                  <CarouselNext className="mr-16" />
                </>
              )}
            </Carousel>
          )}

          {/* INFO */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{paket.nama_paket}</h2>
            <p className="text-sm text-muted-foreground">
              {paket.jenis} • {paket.kategori.replace(/([A-Z])/g, " $1").trim()}
            </p>
          </div>

          <div className="text-sm leading-relaxed text-muted-foreground -mt-2">
            {paket.deskripsi || (
              <span className="italic">Tidak ada deskripsi</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Jumlah Pax</p>
              <p className="font-medium">{paket.jumlah_pax}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Harga</p>
              <p className="font-medium">{formatRupiah(paket.harga_paket)}</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DrawerFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(paket.id)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>

          {/* 🔥 DELETE WITH ALERT */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex-1 bg-red-600 text-white hover:bg-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Paket?</AlertDialogTitle>
                <AlertDialogDescription>
                  Paket{" "}
                  <span className="font-semibold">{paket.nama_paket}</span> akan
                  dihapus secara permanen dan tidak bisa dikembalikan.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => onDelete(paket.id)}
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
