"use client";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/helpers";
import { Pemesanan } from "@/types/data/pemesanan";
import { ColumnDef } from "@tanstack/react-table";
import { MonitoringPesananDialog } from "./monitoring-pesanan-dialog";

export const monitoringPesananColumns: ColumnDef<Pemesanan>[] = [
  {
    id: "no_resi",
    header: "No Resi",
    cell: ({ row }) => (
      <span className="font-medium text-xs">{row.original.no_resi}</span>
    ),
    size: 80,
  },
  {
    id: "pelanggan",
    header: "Pelanggan",
    cell: ({ row }) => (
      <span className="font-medium text-xs">
        {row.original.pelanggan?.nama_pelanggan}
      </span>
    ),
    size: 80,
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
    size: 120,
  },
  {
    id: "tgl_pesan",
    header: "Tgl Pesan",
    cell: ({ row }) => (
      <span className="font-medium text-xs">
        {formatDate(row.original.tgl_pesan)}
      </span>
    ),
    size: 80,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status_pesan;

      const label = status ? status.replace(/([A-Z])/g, " $1").trim() : "-";

      if (label === "Pesanan Selesai") {
        return (
          <Badge className="font-medium text-xs" variant="success">
            {label}
          </Badge>
        );
      } else if (label === "Sedang Diproses") {
        return (
          <Badge className="font-medium text-xs" variant="blue">
            {label}
          </Badge>
        );
      } else if (label === "Menunggu Konfirmasi") {
        return (
          <Badge className="font-medium text-xs" variant="orange">
            {label}
          </Badge>
        );
      } else if (label === "Menunggu Kurir") {
        return (
          <Badge className="font-medium text-xs" variant="yellow">
            {label}
          </Badge>
        );
      }
    },
    size: 100,
  },
  {
    id: "pengiriman",
    header: "Pengiriman",
    cell: ({ row }) => {
      const pengiriman = row.original.pengirimans?.[0];

      let status_pengiriman = "Belum dikirim";

      if (pengiriman) {
        if (pengiriman.tgl_tiba) {
          status_pengiriman = `Tiba: ${formatDate(pengiriman.tgl_tiba)}`;
        } else if (pengiriman.tgl_kirim) {
          status_pengiriman = `Dikirim: ${formatDate(pengiriman.tgl_kirim)}`;
        }
      }

      return (
        <div className="flex">
          <span className="font-medium text-muted-foreground text-xs max-w-58 truncate">
            {status_pengiriman}
          </span>
        </div>
      );
    },
    size: 100,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => <MonitoringPesananDialog data={row.original} />,
    size: 60,
  },
];
