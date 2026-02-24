"use client";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { User } from "@/types/data/user";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function deleteUser(id: string, onSuccess: () => void) {
  try {
    const res = await fetch(`${API_URL}/auth/super-user/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error();
    }
    toast.success("User berhasil dihapus");
    onSuccess();
  } catch (err: any) {
    console.error(err);
    toast.error("Gagal menghapus user");
  }
}

export function userColumns(refresh: () => void): ColumnDef<User>[] {
  return [
    {
      id: "name",
      header: () => <span className="pl-3">Nama</span>,
      cell: ({ row }) => (
        <span className="pl-3 text-xs font-medium">{row.original.name}</span>
      ),
    },
    {
      id: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-xs font-medium">{row.original.email}</span>
      ),
    },
    {
      id: "level",
      header: "Level",
      cell: ({ row }) => (
        <Badge variant={row.original.level === "Admin" ? "success" : "orange"}>
          <span className="text-xs font-medium">{row.original.level}</span>
        </Badge>
      ),
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-red-600"
                >
                  <Trash className="h-4 w-4 text-destructive" /> Hapus User
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus User?</AlertDialogTitle>
                  <AlertDialogDescription>
                    User <span className="font-semibold">{data.name}</span> akan
                    dihapus secara permanen dan tidak dapat dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => deleteUser(data.id, refresh)}
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
}
