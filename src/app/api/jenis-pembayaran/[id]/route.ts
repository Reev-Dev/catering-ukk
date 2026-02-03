import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const data = await prisma.jenis_pembayarans.findUnique({
    where: { id: BigInt(id) },
    include: {
      detail_jenis_pembayarans: true,
    },
  });

  if (!data) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({
    ...data,
    id: data.id.toString(),
    detail_jenis_pembayarans: data.detail_jenis_pembayarans.map((det) => ({
      ...det,
      id: det.id.toString(),
      id_jenis_pembayaran: det.id_jenis_pembayaran.toString(),
    })),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.formData();

  const existing = await prisma.jenis_pembayarans.findUnique({
    where: { id: BigInt(id) },
  });

  if (!existing) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const errors: Record<string, string> = {};

  const metode_pembayaran = body.get("metode_pembayaran") as string;

  if (!metode_pembayaran)
    errors.metode_pembayaran = "Metode pembayaran wajib diisi";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Gagal mengubah jenis pembayaran, data wajib diisi",
        fields: errors,
      },
      { status: 400 },
    );
  }

  const data = await prisma.jenis_pembayarans.update({
    where: { id: BigInt(id) },
    data: { metode_pembayaran },
  });

  return NextResponse.json({ ...data, id: data.id.toString() });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await prisma.jenis_pembayarans.delete({
    where: { id: BigInt(id) },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}
