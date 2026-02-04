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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import clsx from "clsx";

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

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

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      toast.success(
        selected
          ? "Jenis pembayaran berhasil diperbarui"
          : "Jenis pembayaran berhasil ditambahkan",
      );

      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      if (err?.fields) {
        setErrors(err.fields);
      }
      toast.error(err?.message || "Gagal menyimpan jenis pembayaran");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setErrors({});
        }
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selected ? "Edit Jenis Pembayaran" : "Tambah Jenis Pembayaran"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <Input
              type="text"
              name="metode_pembayaran"
              placeholder="Contoh: Transfer, E-Wallet"
              defaultValue={selected?.metode_pembayaran ?? ""}
              className={clsx(
                "w-full rounded-md border px-3 py-2 text-sm",
                errors.metode_pembayaran && "border-red-500",
              )}
            />
            {errors.metode_pembayaran && (
              <p className="text-xs text-red-500">{errors.metode_pembayaran}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
