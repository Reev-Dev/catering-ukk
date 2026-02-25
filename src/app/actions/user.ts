"use server";

import { prisma } from "@/lib/prisma";

export async function getUser() {
  const totalUser = await prisma.users.count({
    where: {
      level: {
        not: "Owner",
      },
    },
  });

  const totalAdmin = await prisma.users.count({
    where: {
      level: "Admin",
    },
  });

  const totalKurir = await prisma.users.count({
    where: {
      level: "Kurir",
    },
  });

  const totalKurirAktif = await prisma.users.count({
    where: {
      level: "Kurir",
      pengirimans: {
        some: {
          status_kirim: "SedangDikirim",
        },
      },
    },
  });

  const totalKurirTersedia = await prisma.users.count({
    where: {
      level: "Kurir",
      pengirimans: {
        none: {
          status_kirim: "SedangDikirim",
        },
      },
    },
  });

  return {
    totalUser,
    totalAdmin,
    totalKurir,
    totalKurirAktif,
    totalKurirTersedia,
  };
}
