"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function pesanAction(data: {
  paketId: bigint;
  jumlah: number;
  alamatId: bigint;
  jenisPembayaranId: bigint;
  total: number;
}) {
  const pesanan = await prisma.pemesanans.create({
    data: {
      id_pelanggan: data.alamatId, // nanti bisa ganti auth
      id_jenis_bayar: data.jenisPembayaranId,
      no_resi: `ORD-${Date.now()}`,
      tgl_pesan: new Date(),
      status_pesan: "MenungguKonfirmasi",
      total_bayar: data.total,
      detail_pemesanans: {
        create: {
          id_paket: data.paketId,
          subtotal: data.total,
        },
      },
    },
  });

  redirect(`/pesanan/${pesanan.no_resi}`);
}
