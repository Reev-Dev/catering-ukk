"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/helpers";
import { Pemesanan } from "@/types/data/pemesanan";
import { formatRupiah } from "@/lib/formatter";
import Image from "next/image";

interface Props {
  data: Pemesanan;
}

export function MonitoringPesananDialog({ data }: Props) {
  const detail = data.detail_pemesanans?.[0];
  const paket = detail?.paket;
  const pengiriman = data.pengirimans?.[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs" size="sm" variant="outline">
          Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pesanan</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {/* Paket */}
          <div>
            <h4 className="font-semibold mb-2">Paket</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>
                Nama Paket: {paket?.nama_paket} ({paket?.jumlah_pax} pax)
              </p>
              <p>Harga Paket: {formatRupiah(paket?.harga_paket)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            {/* Customer */}
            <div>
              <h4 className="font-semibold mb-2">Pembeli</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>Nama: {data.pelanggan?.nama_pelanggan}</p>
                <p>No Resi: {data.no_resi}</p>
                <p>Tanggal Pesan: {formatDate(data.tgl_pesan)}</p>
                <p>Total Bayar: {formatRupiah(Number(data.total_bayar))}</p>
              </div>
            </div>

            {/* Pengiriman */}
            <div>
              <h4 className="font-semibold mb-2">Pengiriman</h4>

              {!pengiriman && (
                <Badge variant="destructive">Belum dikirim</Badge>
              )}

              {pengiriman && (
                <div className="space-y-1 text-muted-foreground">
                  <p>Pengirim: {pengiriman.user?.name}</p>
                  {pengiriman.tgl_kirim && (
                    <p>Dikirim: {formatDate(pengiriman.tgl_kirim)}</p>
                  )}
                  {pengiriman.tgl_tiba && (
                    <p>Tiba: {formatDate(pengiriman.tgl_tiba)}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            {/* Bukti Kirim */}
            {pengiriman?.bukti_foto ? (
              <div className="mt-3">
                <p className="font-medium mb-1">Bukti Kirim:</p>
                <Image
                  src={pengiriman.bukti_foto}
                  alt="Bukti Kirim"
                  className="rounded-md border max-h-60"
                  width={160}
                  height={160}
                />
              </div>
            ) : (
              <div className="mt-3">
                <p className="font-medium mb-1">Bukti kirim:</p>
                <p className="mb-1 italic text-muted-foreground">
                  Belum ada bukti yang diupload
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
