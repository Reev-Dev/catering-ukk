import { serializeBigInt } from "@/helper/serializeBigInt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = await prisma.pemesanans.findMany({
    include: {
      detail_pemesanans: {
        include: {
          paket: true,
        },
      },
      pelanggan: true,
      pengirimans: {
        include: {
          user: true,
        },
      },
      jenis_bayar: {
        include: {
          detail_jenis_pembayarans: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(serializeBigInt(data));
}
