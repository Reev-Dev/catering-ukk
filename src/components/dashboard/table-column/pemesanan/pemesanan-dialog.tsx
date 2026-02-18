"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pemesanan } from "@/types/data/pemesanan";
import { ApproveSection } from "./pemesanan-approve";
import { AssignKurir } from "./pemesanan-assign";

export function DetailPemesananDialog({ pemesanan }: { pemesanan: Pemesanan }) {
  const [open, setOpen] = useState(false);
  const pemesananId = BigInt(pemesanan.id);

  const detail = pemesanan.detail_pemesanans?.[0];
  const paket = detail?.paket;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pemesanan</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p>
            <b>No Resi:</b> {pemesanan.no_resi}
          </p>
          <p>
            <b>Pelanggan:</b> {pemesanan.pelanggan?.nama_pelanggan}
          </p>
          <p>
            <b>Paket:</b> {paket?.nama_paket}
          </p>
          <p>
            <b>Jumlah:</b> {detail?.subtotal}
          </p>
          <p>
            <b>Total:</b> Rp {pemesanan.total_bayar}
          </p>
          <p>
            <b>Status:</b> {pemesanan.status_pesan}
          </p>
        </div>

        {/* SECTION APPROVE */}
        <ApproveSection
          pemesananId={pemesananId}
          status={pemesanan.status_pesan}
        />

        {/* SECTION ASSIGN KURIR */}
        <AssignKurir
          pemesananId={pemesananId}
          status={pemesanan.status_pesan}
        />
      </DialogContent>
    </Dialog>
  );
}
