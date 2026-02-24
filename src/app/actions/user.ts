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

  return { totalUser, totalAdmin, totalKurir };
}
