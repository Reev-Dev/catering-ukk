import { serializeBigInt } from "@/helper/serializeBigInt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get("sortBy") || "created_at";
  const order = searchParams.get("order") === "desc" ? "desc" : "asc";

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
    },
    orderBy: {
      [sortBy]: order,
    },
  });

  return NextResponse.json(serializeBigInt(data));
}
