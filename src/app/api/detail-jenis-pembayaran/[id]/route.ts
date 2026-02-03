import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, saveFile } from "@/lib/upload";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await prisma.detail_jenis_pembayarans.findUnique({
    where: { id: BigInt(id) },
  });

  if (!data) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ ...data, id: data.id.toString() });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const formData = await req.formData();

  const existing = await prisma.detail_jenis_pembayarans.findUnique({
    where: { id: BigInt(id) },
  });

  if (!existing) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const no_rek = formData.get("no_rek") as string;
  const tempat_bayar = formData.get("tempat_bayar") as string;
  const logoFile = formData.get("logo") as File | null;

  let logoPath = existing.logo;

  if (logoFile) {
    if (existing.logo) await deleteFile(existing.logo);
    logoPath = await saveFile(logoFile, "uploads/pembayaran");
  }

  const data = await prisma.detail_jenis_pembayarans.update({
    where: { id: BigInt(id) },
    data: {
      no_rek,
      tempat_bayar,
      logo: logoPath,
    },
  });

  return NextResponse.json({ ...data, id: data.id.toString() });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await prisma.detail_jenis_pembayarans.findUnique({
    where: { id: BigInt(id) },
  });

  if (data?.logo) {
    await deleteFile(data.logo);
  }

  await prisma.detail_jenis_pembayarans.delete({
    where: { id: BigInt(id) },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}
