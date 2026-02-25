"use server";

import { prisma } from "@/lib/prisma";
export async function getDashboardStats() {
  const totalPemesanan = await prisma.pemesanans.count();

  const totalPemesananMenunggu = await prisma.pemesanans.count({
    where: {
      status_pesan: {
        in: ["MenungguKonfirmasi", "MenungguKurir"],
      },
    },
  });
  const totalPemesananMenungguKonfirmasi = await prisma.pemesanans.count({
    where: {
      status_pesan: "MenungguKonfirmasi",
    },
  });
  const totalPemesananMenungguKurir = await prisma.pemesanans.count({
    where: {
      status_pesan: "MenungguKurir",
    },
  });

  const totalPemesananSedangDiproses = await prisma.pemesanans.count({
    where: { status_pesan: "SedangDiproses" },
  });

  const totalPemesananSelesai = await prisma.pemesanans.count({
    where: { status_pesan: "PesananSelesai" },
  });

  const totalPendapatanAgg = await prisma.pemesanans.aggregate({
    _sum: {
      total_bayar: true,
    },
    where: {
      status_pesan: "PesananSelesai",
    },
  });

  const totalPendapatan = Number(totalPendapatanAgg._sum.total_bayar || 0);

  const totalPelanggan = await prisma.pelanggans.count();

  const totalPaketAktif = await prisma.pakets.count();

  // Rata-rata omzet = totalPendapatan / jumlah pesanan selesai
  const totalPesananSelesai = await prisma.pemesanans.count({
    where: { status_pesan: "PesananSelesai" },
  });

  const rataRataOmzet =
    totalPesananSelesai > 0 ? totalPendapatan / totalPesananSelesai : 0;

  // Total pelanggan aktif = pelanggan yang pernah melakukan pemesanan
  const totalPelangganAktif = await prisma.pemesanans
    .groupBy({
      by: ["id_pelanggan"],
    })
    .then((res) => res.length);

  return {
    totalPemesanan,
    totalPemesananMenungguKonfirmasi,
    totalPemesananMenungguKurir,
    totalPemesananMenunggu,
    totalPemesananSedangDiproses,
    totalPemesananSelesai,
    totalPendapatan,
    totalPelanggan,
    totalPaketAktif,
    rataRataOmzet: Math.round(rataRataOmzet),
    totalPelangganAktif,
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
      created_at: "desc",
    },
  });
}

export async function getMenuTerlaris() {
  const result = await prisma.$queryRaw<
    {
      id_paket: bigint;
      nama_paket: string;
      harga_paket: number;
      total_dipesan: bigint;
      total_omzet: bigint;
    }[]
  >`
    SELECT 
      dp.id_paket,
      pk.nama_paket,
      pk.harga_paket,
      SUM(dp.subtotal) as total_dipesan,
      SUM(dp.subtotal * pk.harga_paket) as total_omzet
    FROM detail_pemesanans dp
    JOIN pemesanans p ON p.id = dp.id_pemesanan
    JOIN pakets pk ON pk.id = dp.id_paket
    WHERE p.status_pesan = 'PesananSelesai'
    GROUP BY dp.id_paket, pk.nama_paket, pk.harga_paket
    ORDER BY total_dipesan DESC
  `;

  return result.map((item) => ({
    id: item.id_paket,
    nama_paket: item.nama_paket,
    hargaPaket: item.harga_paket,
    totalDipesan: Number(item.total_dipesan),
    totalOmzet: Number(item.total_omzet),
  }));
}
