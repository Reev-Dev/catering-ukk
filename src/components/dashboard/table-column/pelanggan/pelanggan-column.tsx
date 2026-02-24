"use client";

import { formatDate } from "@/lib/helpers";
import { Pelanggan } from "@/types/data/pelanggan";
import { ColumnDef } from "@tanstack/react-table";

export function pelangganColumns(): ColumnDef<Pelanggan>[] {
  return [
    {
      id: "nama_pelanggan",
      header: () => <span className="text-xs">Nama Pelanggan</span>,
      accessorKey: "nama_pelanggan",
      cell: ({ row }) => (
        <span className="text-xs font-medium">
          {row.getValue("nama_pelanggan")}
        </span>
      ),
    },
    {
      id: "tgl_lahir",
      header: () => <span className="text-xs">Tanggal Lahir</span>,
      accessorKey: "tgl_lahir",
      cell: ({ row }) => (
        <span className="text-xs font-medium">
          {row.original.tgl_lahir ? formatDate(row.getValue("tgl_lahir")) : "-"}
        </span>
      ),
      enableSorting: false,
    },
    {
      id: "email",
      header: () => <span className="text-xs">Email</span>,
      accessorKey: "email",
      cell: ({ row }) => (
        <span className="text-xs font-medium">{row.getValue("email")}</span>
      ),
      enableSorting: false,
    },
    {
      id: "telepon",
      header: () => <span className="text-xs">Telepon</span>,
      accessorKey: "telepon",
      cell: ({ row }) => (
        <span className="text-xs font-medium">
          {row.original.telepon ? row.getValue("telepon") : "-"}{" "}
        </span>
      ),
      enableSorting: false,
    },
    {
      id: "total_pesanan",
      header: () => <span className="text-xs">Total Pesanan (Nominal)</span>,
      cell: ({ row }) => {
        const pemesanans = row.original.pemesanans ?? [];

        const total: number = pemesanans
          .filter((p) => p.status_pesan === "PesananSelesai")
          .reduce((sum: number, p) => {
            return sum + Number(p.total_bayar ?? 0);
          }, 0);

        return (
          <span className="text-xs font-medium">
            {total > 0 ? `Rp ${total.toLocaleString("id-ID")}` : "-"}
          </span>
        );
      },
      enableSorting: false,
    },
  ];
}
