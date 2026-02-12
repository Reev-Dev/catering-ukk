import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get("sortBy") || "created_at";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const data = await prisma.pemesanans.findMany({
    include: {
      detail_pemesanans: true,
    },
    orderBy: {
      [sortBy]: order,
    },
  });

  return NextResponse.json(
    data.map((d) => ({
        ...d,
        id: d.id.toString(),
        detail_pemesanans: d.detail_pemesanans.map((det) => ({
          ...det,
          id: det.id.toString(),
          id_pemesanan: det.id_pemesanan.toString(),
        }))
    }))
  )
}
