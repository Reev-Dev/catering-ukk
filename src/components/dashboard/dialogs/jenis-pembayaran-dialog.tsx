"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { JenisPembayaran } from "@/types/data/pembayaran";

export default function JenisPembayaranDialog({
  open,
  onOpenChange,
  selected,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selected: JenisPembayaran | null;
  onSuccess: () => void;
}) {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const url = selected
        ? `${API_URL}/jenis-pembayaran/${selected.id}`
        : `${API_URL}/jenis-pembayaran`;

      const method = selected ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success(
        selected
          ? "Jenis pembayaran berhasil diperbarui"
          : "Jenis pembayaran berhasil ditambahkan",
      );

      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error("Gagal menyimpan jenis pembayaran");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selected ? "Edit Jenis Pembayaran" : "Tambah Jenis Pembayaran"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="metode_pembayaran"
            placeholder="Contoh: Transfer, E-Wallet"
            defaultValue={selected?.metode_pembayaran ?? ""}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <Button type="submit" className="w-full">
            Simpan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
