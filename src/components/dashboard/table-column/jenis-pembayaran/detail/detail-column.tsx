"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { DetailJenisPembayaran } from "@/types/data/pembayaran";

async function handleDelete(id: string, onSuccess: () => void) {
  try {
    const res = await fetch(`${API_URL}/detail-jenis-pembayaran/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error();
    toast.success("Detail pembayaran dihapus");
    onSuccess();
  } catch {
    toast.error("Gagal menghapus detail");
  }
}

export function detailJenisPembayaranColumns(
  refresh: () => void,
): ColumnDef<DetailJenisPembayaran>[] {
  return [
    {
      accessorKey: "logo",
      header: () => <span className="pl-3">Logo</span>,
      cell: ({ row }) => {
        const logo = row.getValue("logo") as string | null;

        return (
          <div className="relative pl-3 h-10 w-10 overflow-hidden rounded-md border">
            {logo ? (
              <Image
                src={logo}
                alt="logo"
                fill
                className="object-contain p-1"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                N/A
              </div>
            )}
          </div>
        );
      },
      size: 80,
    },

    {
      accessorKey: "tempat_bayar",
      header: "Tempat Bayar",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("tempat_bayar")}</Badge>
      ),
      size: 160,
    },

    {
      accessorKey: "no_rek",
      header: "No. Rekening / ID",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {row.getValue("no_rek")}
        </span>
      ),
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-end gap-2">
            <Button size="icon" variant="outline">
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => handleDelete(data.id, refresh)}
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
      size: 100,
    },
  ];
}
