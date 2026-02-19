"use server";

import { prisma } from "@/lib/prisma";
import { saveFile } from "@/lib/upload";

export async function selesaikanPengiriman(data: {
  pengirimanId: bigint;
  bukti_foto: File | null;
}) {
  const bukti_foto = data.bukti_foto;
  let buktifoto: string | null = null;
  if (bukti_foto && bukti_foto.size > 0) {
    buktifoto = await saveFile(bukti_foto, "uploads/bukti_foto");
  }

  await prisma.pengirimans.update({
    where: { id: data.pengirimanId },
    data: {
      status_kirim: "TibaDiTujuan",
      tgl_tiba: new Date(),
      bukti_foto: buktifoto,
      pemesanan: {
        update: {
          status_pesan: "PesananSelesai",
        },
      },
    },
  });
}
