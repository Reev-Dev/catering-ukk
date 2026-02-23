"use client";

import { formatRupiah } from "@/lib/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { MenuTerlaris } from "./menu-table";

export const menuColumns: ColumnDef<MenuTerlaris>[] = [
  {
    id: "nama_paket",
    header: "Paket",
    cell: ({ row }) => {
      const paket = row.original.nama_paket;
      return (
        <div className="flex flex-col">
          <span className="font-medium leading-tight max-w-25 truncate">
            {paket}
          </span>
        </div>
      );
    },
    size: 220,
  },
  {
    id: "jumlah_pesanan",
    header: "Jumlah Pesanan",
    cell: ({ row }) => row.original.totalDipesan,
    size: 60,
  },
  {
    id: "total_omzet",
    header: "Total Omzet",
    cell: ({ row }) => (
      <span className="text-green-600">
        {formatRupiah(row.original.totalOmzet)}
      </span>
    ),
    size: 80,
  },
];
