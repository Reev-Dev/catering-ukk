"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import { DetailJenisPembayaran } from "@/types/data/pembayaran";
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
} from "@/components/ui/alert-dialog";

async function deleteDetailJenisPembayaran(id: string, onSuccess: () => void) {
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
  setSelected: (data: DetailJenisPembayaran) => void,
  setOpen: (v: boolean) => void,
): ColumnDef<DetailJenisPembayaran>[] {
  return [
    {
      accessorKey: "logo",
      header: () => <span className="pl-3">Logo</span>,
      cell: ({ row }) => {
        const logo = row.getValue("logo") as string | null;

        return (
          <div className="relative ml-3 h-10 w-10 overflow-hidden rounded-md border">
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
      enableSorting: false,
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
        <span className="font-mono text-sm">{row.getValue("no_rek")}</span>
      ),
      enableSorting: false,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-end gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setSelected(data);
                setOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Hapus Detail Jenis Pembayaran?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Detail jenis pembayaran{" "}
                    <span className="font-semibold">{data.tempat_bayar}</span>{" "}
                    akan dihapus secara permanen dan tidak dapat dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() =>
                      deleteDetailJenisPembayaran(data.id, refresh)
                    }
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
      size: 100,
    },
  ];
}
