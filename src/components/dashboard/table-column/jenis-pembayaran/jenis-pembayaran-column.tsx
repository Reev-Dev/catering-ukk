"use client";

import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { List, Pencil, Trash } from "lucide-react";
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
import { API_URL } from "@/lib/api";
import { JenisPembayaran } from "@/types/data/pembayaran";
import { Badge } from "@/components/ui/badge";

async function deleteJenisPembayaran(id: string, onSuccess: () => void) {
  try {
    const res = await fetch(`${API_URL}/jenis-pembayaran/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error();

    toast.success("Jenis pembayaran berhasil dihapus");
    onSuccess();
  } catch (err: any) {
    console.error(err);
    toast.error("Gagal menghapus jenis pembayaran");
  }
}

export function jenisPembayaranColumns(
  refresh: () => void,
  setSelected: (data: JenisPembayaran) => void,
  setOpen: (v: boolean) => void,
): ColumnDef<JenisPembayaran>[] {
  return [
    {
      accessorKey: "metode_pembayaran",
      header: () => <span className="pl-3">Metode Pembayaran</span>,
      cell: ({ row }) => (
        <span className="font-medium pl-3">
          {row.getValue("metode_pembayaran")}
        </span>
      ),
    },
    {
      id: "detail",
      header: "Detail",
      cell: ({ row }) => {
        const details = row.original.detail_jenis_pembayarans;

        if (!details.length) {
          return (
            <span className="text-xs italic text-slate-500">
              Belum ada detail
            </span>
          );
        }

        return (
          <div className="flex flex-wrap gap-1">
            {details.map((detail) => (
              <Badge key={detail.id} variant="secondary">
                {detail.tempat_bayar}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-end gap-2">
            {/* 🔥 KELOLA DETAIL */}
            <Link href={`/dashboard/jenis-pembayaran/${data.id}/detail`}>
              <Button size="icon" variant="outline">
                <List className="h-4 w-4" />
              </Button>
            </Link>

            {/* EDIT */}
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
                  <AlertDialogTitle>Hapus Jenis Pembayaran?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Jenis pembayaran{" "}
                    <span className="font-semibold">
                      {data.metode_pembayaran}
                    </span>{" "}
                    akan dihapus secara permanen dan tidak dapat dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => deleteJenisPembayaran(data.id, refresh)}
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
      size: 120,
    },
  ];
}
