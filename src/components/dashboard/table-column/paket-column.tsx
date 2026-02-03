"use client";

import { Paket } from "@/types/data/paket";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Pencil, Trash } from "lucide-react";
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
} from "../../ui/alert-dialog";
import { API_URL } from "@/lib/api";
import { PaketDetailDrawer } from "./paket-detail-drawer";
import { useRouter } from "next/navigation";

async function handleDeletePaket(id: string, onSuccess: () => void) {
  try {
    const res = await fetch(`${API_URL}/paket/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Gagal menghapus paket");
    }

    toast.success("Paket berhasil dihapus");
    onSuccess();
  } catch (err: any) {
    console.error(err);
    toast.error("Gagal menghapus paket");
  }
}

export function paketColumns(
  onDeleteSuccess: (id: string) => void,
): ColumnDef<Paket>[] {
  return [
    {
      id: "produk",
      accessorKey: "nama_paket",
      header: () => <span className="pl-3">Paket</span>,

      cell: ({ row }) => {
        const paket = row.original;

        return (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
              {paket.foto1 ? (
                <Image
                  src={paket.foto1}
                  alt={paket.nama_paket}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  IMG
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-medium leading-tight">
                {paket.nama_paket}
              </span>
              <span className="text-xs text-muted-foreground max-w-65 truncate">
                {paket.deskripsi}
              </span>
            </div>
          </div>
        );
      },
      size: 280,
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => {
        const k = row.getValue("kategori") as string;
        return (
          <Badge variant="secondary">
            {k.replace(/([A-Z])/g, " $1").trim()}
          </Badge>
        );
      },
      size: 120,
    },
    {
      accessorKey: "jenis",
      header: "Jenis",
      cell: ({ row }) => {
        const jenis = row.getValue("jenis") as string;

        return (
          <Badge variant={jenis === "Prasmanan" ? "default" : "outline"}>
            {jenis}
          </Badge>
        );
      },
      size: 120,
    },
    {
      accessorKey: "harga_paket",
      header: "Harga",
      cell: ({ row }) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(row.getValue("harga_paket")),
      size: 120,
    },
    {
      accessorKey: "jumlah_pax",
      header: "Pax",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("jumlah_pax")}</span>
      ),
      size: 80,
    },
    {
      id: "actions",
      // header: () => <span className="pr-3 text-right">Actions</span>,
      cell: ({ row }) => {
        const paket = row.original;
        const router = useRouter();

        return (
          <div className="flex justify-end gap-2">
            <PaketDetailDrawer
              paket={paket}
              onEdit={(id) => router.push(`/dashboard/paket/${id}/edit`)}
              onDelete={async (id) => {
                try {
                  const res = await fetch(`${API_URL}/paket/${id}`, {
                    method: "DELETE",
                  });

                  if (!res.ok) throw new Error();

                  toast.success("Paket berhasil dihapus");
                  onDeleteSuccess(id);
                } catch {
                  toast.error("Gagal menghapus paket");
                }
              }}
            />

            <Link href={`/dashboard/paket/${paket.id}/edit`}>
              <Button size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus Paket?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Paket{" "}
                    <span className="font-semibold">{paket.nama_paket}</span>{" "}
                    akan ddihapus secara permanen dan tidak dapat dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() =>
                      handleDeletePaket(paket.id, async () => {
                        await onDeleteSuccess(paket.id);
                      })
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
