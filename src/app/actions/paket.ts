"use server";

import { prisma } from "@/lib/prisma";

export async function getPaket() {
  const totalPaket = await prisma.pakets.count();

  const totalPrasmanan = await prisma.pakets.count({
    where: {
      jenis: "Prasmanan",
    },
  });

  const totalBox = await prisma.pakets.count({
    where: {
      jenis: "Box",
    },
  });

  return { totalPaket, totalPrasmanan, totalBox };
}
