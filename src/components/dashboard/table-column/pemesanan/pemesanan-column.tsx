"use client";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/helpers";
import { Pemesanan } from "@/types/data/pemesanan";
import { ColumnDef } from "@tanstack/react-table";
import { DetailPemesananDialog } from "./pemesanan-dialog";

export const pemesananColumns: ColumnDef<Pemesanan>[] = [
  {
    id: "no_resi",
    header: "No Resi",
    cell: ({ row }) => (
      <span className="font-medium text-xs">{row.original.no_resi}</span>
    ),
    size: 120,
  },
  {
    id: "pelanggan",
    header: "Pelanggan",
    cell: ({ row }) => (
      <span className="font-medium text-xs">
        {row.original.pelanggan?.nama_pelanggan}
      </span>
    ),
    size: 120,
  },
  {
    id: "nama_paket",
    header: "Paket",
    cell: ({ row }) => {
      const detail = row.original.detail_pemesanans?.[0];
      const paket = detail?.paket;

      return (
        <div className="flex">
          <span className="font-medium text-xs max-w-58 truncate">
            {paket?.nama_paket}
          </span>
        </div>
      );
    },
    size: 220,
  },
  {
    id: "tgl_pesan",
    header: "Tgl Pesan",
    cell: ({ row }) => (
      <span className="font-medium text-xs">
        {formatDate(row.original.tgl_pesan)}
      </span>
    ),
    size: 140,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status_pesan;

      const label = status ? status.replace(/([A-Z])/g, " $1").trim() : "-";

      if (label === "Pesanan Selesai") {
        return <Badge className="font-medium text-xs" variant="success">{label}</Badge>;
      } else if (label === "Sedang Diproses") {
        return <Badge className="font-medium text-xs" variant="blue">{label}</Badge>;
      } else if (label === "Menunggu Konfirmasi" || label === "Menunggu Kurir") {
        return <Badge className="font-medium text-xs" variant="orange">{label}</Badge>;
      }

      return <Badge className="font-medium text-xs" variant={label === "Pesanan Selesai" ? "success" : "blue"}>{label}</Badge>;
    },
    size: 160,
  },
  {
    id: "kurir",
    header: "Kurir",
    cell: ({ row }) => {
      const pengiriman = row.original.pengirimans;

      if (!pengiriman || pengiriman.length === 0) {
        return (
          <span className="text-xs text-muted-foreground">Belum dikirim</span>
        );
      }

      const kurir = pengiriman[0]?.user?.name;

      return (
        <span className="font-medium text-xs">
          {kurir ?? "Belum assign kurir"}
        </span>
      );
    },

    size: 120,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      return <DetailPemesananDialog pemesanan={row.original} />;
    },
    size: 100,
  },
];
