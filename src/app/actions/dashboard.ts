"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const totalPemesanan = await prisma.pemesanans.count();

  const totalPendapatan = await prisma.pemesanans.aggregate({
    _sum: {
      total_bayar: true,
    },
    where: {
      status_pesan: "PesananSelesai",
    },
  });

  const totalPelanggan = await prisma.pelanggans.count();

  const totalPaketAktif = await prisma.pakets.count();

  return {
    totalPemesanan,
    totalPendapatan: Number(totalPendapatan._sum.total_bayar || 0),
    totalPelanggan,
    totalPaketAktif,
  };
}

export async function getStatusSummary() {
  const result = await prisma.pemesanans.groupBy({
    by: ["status_pesan"],
    _count: {
      status_pesan: true,
    },
  });

  return result;
}

export async function getPendapatan(rangeInDays: number) {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - rangeInDays);

  const result = await prisma.$queryRaw<{ date: Date; total: bigint }[]>`
    SELECT 
      DATE(tgl_pesan) as date,
      SUM(total_bayar) as total
    FROM pemesanans
    WHERE 
      status_pesan = 'PesananSelesai'
      AND tgl_pesan >= ${startDate}
    GROUP BY DATE(tgl_pesan)
    ORDER BY DATE(tgl_pesan) ASC
  `;

  return result.map((item) => ({
    date: item.date.toISOString().split("T")[0],
    total: Number(item.total),
  }));
}

export async function getPemesanan() {
  return prisma.pemesanans.findMany({
    include: {
      detail_pemesanans: {
        include: {
          paket: true,
        },
      },
      pelanggan: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });
}
