"use client";

import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/formatter";
import { toSlug } from "@/lib/slug";
import { Pemesanan } from "@/types/data/pemesanan";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export const pesananColumns: ColumnDef<Pemesanan>[] = [
  {
    id: "nama_paket",
    header: () => <span className="pl-3">Nama Paket</span>,
    cell: ({ row }) => {
      const detail = row.original.detail_pemesanans?.[0];
      const paket = detail?.paket;

      if (!paket) {
        return (
          <span className="pl-3 text-muted-foreground">
            Paket tidak tersedia / paket telah dihapus
          </span>
        );
      }

      return (
        <div className="flex items-center gap-3 pl-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xs bg-muted">
            {paket.foto1 ? (
              <Image
                src={paket.foto1}
                alt={paket.nama_paket}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                IMG
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <Link
              href={`/paket/${toSlug(paket.nama_paket)}`}
              className="font-medium truncate hover:underline max-w-48"
            >
              {paket.nama_paket}
            </Link>

            <span className="text-xs text-muted-foreground flex justify-between max-w-65 truncate">
              <span>{paket.jumlah_pax} Pax</span>
              <span>{formatRupiah(Number(paket.harga_paket))}</span>
            </span>
          </div>
        </div>
      );
    },
    size: 220,
  },

  {
    id: "subtotal",
    header: "Qty (Paket)",
    cell: ({ row }) => {
      const detail = row.original.detail_pemesanans?.[0];

      return (
        <span className="font-medium">
          {detail?.subtotal ?? 0} Paket
        </span>
      );
    },
    size: 100,
  },

  {
    id: "total_bayar",
    header: "Total Bayar",
    cell: ({ row }) => (
      <span className="font-medium">
        {formatRupiah(Number(row.original.total_bayar ?? 0))}
      </span>
    ),
    size: 120,
  },

  {
    id: "status_pemesanan",
    header: "Status Pemesanan",
    cell: ({ row }) => {
      const status = row.original.status_pesan;

      const label = status
        ? status.replace(/([A-Z])/g, " $1").trim()
        : "-";

      return <span className="font-medium">{label}</span>;
    },
    size: 150,
  },

  {
    id: "status_pengiriman",
    header: "Status Pengiriman",
    cell: ({ row }) => {
      // Ambil pengiriman terbaru kalau ada
      const pengiriman = row.original.pengirimans?.[0];

      const status = pengiriman?.status_kirim;

      const label =
        status === undefined
          ? "Belum Dikirim"
          : status.replace(/([A-Z])/g, " $1").trim();

      return (
        <Badge
          variant={
            status === "TibaDiTujuan"
              ? "success"
              : status === "SedangDikirim"
              ? "blue"
              : "secondary"
          }
          className="font-medium"
        >
          {label}
        </Badge>
      );
    },
    size: 160,
  },
];
