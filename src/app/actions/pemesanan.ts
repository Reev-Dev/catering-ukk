"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cache } from "react";

type SortableFields =
  | "created_at"
  | "tgl_pesan"
  | "total_bayar"
  | "status_pesan";

export async function getPemesanansByUserId(
  userId: bigint,
  sortBy: SortableFields = "created_at",
  order: "asc" | "desc" = "desc",
) {
  return prisma.pemesanans.findMany({
    where: {
      id_pelanggan: userId,
    },
    orderBy: {
      [sortBy]: order,
    },
    select: {
      id: true,
      no_resi: true,
      tgl_pesan: true,
      status_pesan: true,
      total_bayar: true,
      created_at: true,

      detail_pemesanans: {
        select: {
          id: true,
          subtotal: true,
          paket: {
            select: {
              id: true,
              nama_paket: true,
              harga_paket: true,
              jumlah_pax: true,
              foto1: true,
            },
          },
        },
      },

      pengirimans: {
        select: {
          id: true,
          status_kirim: true,
          tgl_kirim: true,
          tgl_tiba: true,
        },
      },
    },
  });
}

export const getPelangganById = cache(async (userId: bigint) => {
  return prisma.pelanggans.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nama_pelanggan: true,
      telepon: true,
      foto: true,
    },
  });
});

export const getAlamatPelanggan = cache(async (userId: bigint) => {
  const alamats = await prisma.pelanggans.findUnique({
    where: { id: userId },
    select: {
      id: true,
      alamat1: true,
      alamat2: true,
      alamat3: true,
    },
  });

  if (!alamats) return [];

  const alamatArray = [alamats.alamat1, alamats.alamat2, alamats.alamat3]
    .filter(Boolean) // buang null
    .map((alamat, index) => ({
      id: index + 1, // karena tidak ada id alamat di DB
      alamat,
    }));

  return alamatArray;
});

export const getJenisPembayaran = cache(async () => {
  return prisma.jenis_pembayarans.findMany({
    include: {
      detail_jenis_pembayarans: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
});

export const getPaketById = cache(async (paketId: bigint) => {
  return prisma.pakets.findUnique({
    where: { id: paketId },
  });
});

export async function pesanAction(data: {
  paketId: bigint;
  pelangganId: bigint;
  jumlah: number;
  alamatId: bigint;
  jenisPembayaranId: bigint;
  total: number;
}) {
  const pesanan = await prisma.pemesanans.create({
    data: {
      id_pelanggan: data.pelangganId,
      id_jenis_bayar: data.jenisPembayaranId,
      no_resi: `ORD-${Date.now()}`,
      tgl_pesan: new Date(),
      status_pesan: "MenungguKonfirmasi",
      total_bayar: data.total,
      detail_pemesanans: {
        create: {
          id_paket: data.paketId,
          subtotal: data.jumlah,
        },
      },
    },
  });

  redirect(`/pesanan-saya`);
}
