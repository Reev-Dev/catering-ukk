import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get("sortBy") || "created_at";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const pakets = await prisma.pakets.findMany({
    orderBy: {
      [sortBy]: order,
    },
  });

  return NextResponse.json(pakets.map((p) => ({ ...p, id: p.id.toString() })));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama_paket, jenis, kategori, jumlah_pax, harga_paket, deskripsi } =
      body;

    if (!nama_paket || !jenis || !kategori || !jumlah_pax || !harga_paket) {
      return NextResponse.json(
        { message: "Data wajib diisi" },
        { status: 400 },
      );
    }

    const paket = await prisma.pakets.create({
      data: {
        nama_paket,
        jenis,
        kategori,
        jumlah_pax: Number(jumlah_pax),
        harga_paket: Number(harga_paket),
        deskripsi,
      },
    });

    return NextResponse.json(paket, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal menambah paket" },
      { status: 500 },
    );
  }
}
