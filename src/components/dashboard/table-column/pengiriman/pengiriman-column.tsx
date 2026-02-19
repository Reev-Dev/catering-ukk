"use client";

import { Badge } from "@/components/ui/badge";
import { Pengiriman } from "@/types/data/pengiriman";
import { ColumnDef } from "@tanstack/react-table";
import { DetailPengirimanDialog } from "./pengiriman-dialog";
import { formatDate } from "@/lib/helpers";

export function pengirimanColumns(): ColumnDef<Pengiriman>[] {
  return [
    {
      id: "no_resi",
      header: "No Resi",
      cell: ({ row }) => (
        <span className="font-medium text-xs">
          {row.original.pemesanan.no_resi}
        </span>
      ),
    },
    {
      id: "nama_pelanggan",
      header: "Nama Penerima",
      cell: ({ row }) => (
        <span className="font-medium text-xs">
          {row.original.pemesanan.pelanggan?.nama_pelanggan}
        </span>
      ),
    },
    {
      id: "alamat",
      header: "Alamat",
      cell: ({ row }) => (
        <span className="font-medium text-xs">
          {row.original.pemesanan.pelanggan?.alamat1}
        </span>
      ),
    },
    {
      id: "status_kirim",
      header: "Status Kirim",
      accessorKey: "status_kirim",
      cell: ({ row }) => {
        const status = row.original.status_kirim;

        const label = status ? status.replace(/([A-Z])/g, " $1").trim() : "-";
        if (label === "Tiba Di Tujuan") {
          return (
            <Badge variant="success" className="font-medium text-xs">
              {label}
            </Badge>
          );
        }

        return (
          <Badge variant="blue" className="font-medium text-xs">
            {label}
          </Badge>
        );
      },
    },
    {
      id: "tgl_pesan",
      header: "Tgl Pesan",
      accessorKey: "tgl_pesan",
      cell: ({ row }) => (
        <span className="font-medium text-xs">
          {formatDate(row.original.pemesanan.tgl_pesan)}
        </span>
      ),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        return <DetailPengirimanDialog pengiriman={row.original} />;
      },
    },
  ];
}
