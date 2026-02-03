import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get("sortBy") || "created_at";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const data = await prisma.jenis_pembayarans.findMany({
    include: {
      detail_jenis_pembayarans: true,
    },
    orderBy: {
      [sortBy]: order,
    },
  });

  return NextResponse.json(
    data.map((d) => ({
      ...d,
      id: d.id.toString(),
      detail_jenis_pembayarans: d.detail_jenis_pembayarans.map((det) => ({
        ...det,
        id: det.id.toString(),
        id_jenis_pembayaran: det.id_jenis_pembayaran.toString(),
      })),
    })),
  );
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const metode_pembayaran = formData.get("metode_pembayaran") as string;
    const errors: Record<string, string> = {};

    if (!metode_pembayaran)
      errors.metode_pembayaran = "Metode pembayaran wajib diisi";
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: "Gagal menambah jenis pembayaran, data wajib diisi",
          fields: errors,
        },
        { status: 400 },
      );
    }
    const newJenisPembayaran = await prisma.jenis_pembayarans.create({
      data: {
        metode_pembayaran,
      },
    });

    return NextResponse.json(
      {
        ...newJenisPembayaran,
        id: newJenisPembayaran.id.toString(),
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
