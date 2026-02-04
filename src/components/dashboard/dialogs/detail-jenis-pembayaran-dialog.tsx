"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { DetailJenisPembayaran } from "@/types/data/pembayaran";
import { toast } from "sonner";
import { useState } from "react";
import clsx from "clsx";
import ImageUpload from "@/components/image-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DetailJenisPembayaranDialog({
  open,
  onOpenChange,
  jenisPembayaranId,
  selected,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  jenisPembayaranId: string;
  selected: DetailJenisPembayaran | null;
  onSuccess: () => void;
}) {
  const [logo, setLogo] = useState<FileWithPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const logoFile = logo?.file;

    if (logoFile && logoFile instanceof File) {
      formData.append("logo", logoFile);
    }

    try {
      const url = selected
        ? `${API_URL}/detail-jenis-pembayaran/${selected.id}`
        : `${API_URL}/jenis-pembayaran/${jenisPembayaranId}/detail`;

      const method = selected ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw data;

      toast.success(
        selected
          ? "Detail pembayaran diperbarui"
          : "Detail pembayaran ditambahkan",
      );

      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      if (err?.fields) setErrors(err.fields);
      toast.error(err?.message || "Gagal menyimpan detail pembayaran");
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
            {selected ? "Edit Detail Pembayaran" : "Tambah Detail Pembayaran"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <div className="flex gap-2">
            {/* LOGO */}
            <ImageUpload
              label="Logo"
              shape="circle"
              size={80}
              value={selected?.logo ?? null}
              description="(Optional)"
              onChange={setLogo}
            />

            <div className="flex flex-col w-full justify-between">
              {/* TEMPAT BAYAR */}
              <div className="space-y-1">
                <Label htmlFor="tempat_bayar" className="mb-2">
                  Tempat Bayar
                </Label>
                <Input
                  id="tempat_bayar"
                  name="tempat_bayar"
                  placeholder="Contoh: BCA, BRI, Dana"
                  defaultValue={selected?.tempat_bayar ?? ""}
                  disabled={loading}
                  className={clsx(
                    "w-full rounded-md border px-3 py-2 text-sm",
                    errors.tempat_bayar && "border-red-500",
                  )}
                />
                {errors.tempat_bayar && (
                  <p className="text-xs text-red-500">{errors.tempat_bayar}</p>
                )}
              </div>

              {/* NO REKENING / ID */}
              <div className="space-y-1">
                <Label htmlFor="no_rek" className="mb-2">
                  No Rekening / ID Pembayaran
                </Label>
                <Input
                  id="no_rek"
                  name="no_rek"
                  placeholder="No rekening / ID pembayaran"
                  defaultValue={selected?.no_rek ?? ""}
                  disabled={loading}
                  className={clsx(
                    "w-full rounded-md border px-3 py-2 text-sm",
                    errors.no_rek && "border-red-500",
                  )}
                />
                {errors.no_rek && (
                  <p className="text-xs text-red-500">{errors.no_rek}</p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
