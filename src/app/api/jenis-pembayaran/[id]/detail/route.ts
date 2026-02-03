import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { saveFile } from "@/lib/upload";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const formData = await req.formData();

  const no_rek = formData.get("no_rek") as string;
  const tempat_bayar = formData.get("tempat_bayar") as string;
  const logoFile = formData.get("logo") as File | null;

  if (!no_rek || !tempat_bayar) {
    return NextResponse.json({ message: "Data wajib diisi" }, { status: 400 });
  }

  // ✅ VALIDASI JENIS PEMBAYARAN
  const jenis = await prisma.jenis_pembayarans.findUnique({
    where: { id: BigInt(id) },
  });

  if (!jenis) {
    return NextResponse.json(
      { message: "Jenis pembayaran tidak ditemukan" },
      { status: 404 },
    );
  }

  // (opsional) cegah duplikasi
  const exists = await prisma.detail_jenis_pembayarans.findFirst({
    where: {
      id_jenis_pembayaran: BigInt(id),
      no_rek,
    },
  });

  if (exists) {
    return NextResponse.json(
      { message: "Detail pembayaran sudah ada" },
      { status: 409 },
    );
  }

  let logoPath: string | null = null;
  if (logoFile) {
    logoPath = await saveFile(logoFile, "uploads/logo_jenis_pembayaran");
  }

  const data = await prisma.detail_jenis_pembayarans.create({
    data: {
      id_jenis_pembayaran: BigInt(id),
      no_rek,
      tempat_bayar,
      logo: logoPath,
    },
  });

  return NextResponse.json(
    { ...data, id: data.id.toString() },
    { status: 201 },
  );
}
