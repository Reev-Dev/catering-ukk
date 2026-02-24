"use server";

import { prisma } from "@/lib/prisma";

export async function getPelanggan() {
  const totalPelanggan = await prisma.pelanggans.count();

  const totalPelangganAktif = await prisma.pemesanans
    .groupBy({
      by: ["id_pelanggan"],
    })
    .then((data) => data.length);

  return { totalPelanggan, totalPelangganAktif };
}

export async function getTablePelanggan() {
  const data = await prisma.pelanggans.findMany({
    select: {
      id: true,
      nama_pelanggan: true,
      email: true,
      telepon: true,
      foto: true,
      tgl_lahir: true,
      kartu_id: true,
      alamat1: true,
      alamat2: true,
      alamat3: true,
      pemesanans: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return data;
}
