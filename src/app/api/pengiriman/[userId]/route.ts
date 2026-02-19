import { serializeBigInt } from "@/helper/serializeBigInt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const data = await prisma.pengirimans.findMany({
    where: {
      id_user: BigInt(userId),
    },
    include: {
      pemesanan: {
        include: {
            pelanggan: true,
            detail_pemesanans: true,
        }
      },
    },
  });

  return NextResponse.json(serializeBigInt(data));
}
