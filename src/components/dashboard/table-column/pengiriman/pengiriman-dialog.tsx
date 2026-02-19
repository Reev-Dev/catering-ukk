"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pengiriman } from "@/types/data/pengiriman";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/helpers";
import { selesaikanPengiriman } from "@/app/actions/pengiriman";
import ImageUpload from "@/components/image-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function DetailPengirimanDialog({
  pengiriman,
}: {
  pengiriman: Pengiriman;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"detail" | "selesai">("detail");
  const [buktiFoto, setBuktiFoto] = useState<FileWithPreview | null>(null);
  const [isPending, startTransition] = useTransition();

  const pemesananId = BigInt(pengiriman.id);

  const pemesanan = pengiriman.pemesanan;
  const pelanggan = pemesanan.pelanggan;

  const isSelesai = pengiriman.status_kirim === "TibaDiTujuan";

  const handleSubmit = () => {
    if (!buktiFoto) {
      toast.error("Upload bukti foto terlebih dahulu!");
      return;
    }

    startTransition(async () => {
      try {
        await selesaikanPengiriman({
          pengirimanId: pemesananId,
          bukti_foto: buktiFoto.file as File,
        });

        toast.success("Pengiriman berhasil diselesaikan!");
        router.refresh();

        setMode("detail");
        setOpen(false);
      } catch (error) {
        toast.error("Gagal menyelesaikan pengiriman!");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pengiriman</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* RESI */}
          <div className="flex justify-between">
            <p className="text-muted-foreground">No Resi</p>
            <span className="font-bold">{pemesanan.no_resi}</span>
          </div>

          {/* STATUS */}
          <div className="flex justify-between">
            <p className="text-muted-foreground">Status</p>
            <Badge
              variant={
                pengiriman.status_kirim === "TibaDiTujuan" ? "success" : "blue"
              }
              className="font-bold"
            >
              {pengiriman.status_kirim.replace(/([A-Z])/g, " $1").trim()}
            </Badge>
          </div>

          {/* PENERIMA */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col font-bold">
              <p className="text-muted-foreground text-xs mb-1">Penerima</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 rounded-xs">
                  <AvatarImage
                    src={pelanggan?.foto ?? ""}
                    alt={pelanggan?.nama_pelanggan ?? ""}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  {pelanggan?.nama_pelanggan}
                  <p className="font-light">{pelanggan?.telepon}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col font-bold">
              <p className="text-muted-foreground text-xs mb-1">
                Alamat Pengiriman
              </p>
              <p className="text-xs font-normal">{pelanggan?.alamat1}</p>
            </div>
          </div>

          {/* TANGGAL */}
          <div className="grid grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs">Tgl Kirim</p>
              <span className="font-medium text-xs">
                {formatDateTime(pengiriman.tgl_kirim)}
              </span>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Tgl Tiba</p>
              <span className="font-medium text-xs">
                {pengiriman.tgl_tiba
                  ? formatDateTime(pengiriman.tgl_tiba)
                  : "-"}
              </span>
            </div>
          </div>

          {/* ===============================
              KONDISI SUDAH SELESAI
          =============================== */}
          {isSelesai && (
            <div className="space-y-2">
              <p className="font-semibold">Bukti Pengiriman</p>
              <Image
                src={`${pengiriman.bukti_foto}`}
                alt={pengiriman.bukti_foto ?? ""}
                width={500}
                height={250}
                className="w-full h-48 object-cover rounded-md border"
              />
            </div>
          )}

          {/* ===============================
              MODE SELESAI (UPLOAD)
          =============================== */}
          {!isSelesai && mode === "selesai" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Upload Bukti Pengiriman</h3>

              <ImageUpload
                shape="rounded"
                value={null}
                onChange={(file) => setBuktiFoto(file)}
                label="Bukti Foto"
              />

              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setMode("detail")}>
                  Batal
                </Button>

                <Button onClick={handleSubmit} disabled={isPending}>
                  {isPending ? "Loading..." : "Konfirmasi Selesai"}
                </Button>
              </div>
            </div>
          )}

          {/* ===============================
              MODE DETAIL (BELUM SELESAI)
          =============================== */}
          {!isSelesai && mode === "detail" && (
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => setMode("selesai")}
                className="text-xs"
              >
                Selesaikan Tugas
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
