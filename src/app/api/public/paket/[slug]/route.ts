import { prisma } from "@/lib/prisma";
import { fromSlug } from "@/lib/slug";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const namaPaket = fromSlug(slug);

  const paket = await prisma.pakets.findFirst({
    where: { nama_paket: namaPaket },
  });

  if (!paket) {
    return NextResponse.json(
      { message: "Paket tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ...paket,
    id: paket.id.toString(),
  });
}
