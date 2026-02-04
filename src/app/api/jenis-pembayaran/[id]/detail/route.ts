import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { saveFile } from "@/lib/upload";
import { serializeBigInt } from "@/helper/serializeBigInt";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const no_rek = formData.get("no_rek") as string;
    const tempat_bayar = formData.get("tempat_bayar") as string;
    const logoFile = formData.get("logo") as File | null;
    const errors: Record<string, string> = {};

    if (!tempat_bayar) {
      errors.tempat_bayar = "Tempat bayar wajib diisi";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: "Gagal menambah detail pembayaran, data wajib diisi",
          fields: errors,
        },
        { status: 400 },
      );
    }

    const jenis = await prisma.jenis_pembayarans.findUnique({
      where: { id: BigInt(id) },
    });

    if (!jenis) {
      return NextResponse.json(
        { message: "Jenis pembayaran tidak ditemukan" },
        { status: 404 },
      );
    }

    const exists = await prisma.detail_jenis_pembayarans.findFirst({
      where: {
        id_jenis_pembayaran: BigInt(id),
        tempat_bayar,
      },
    });

    if (exists) {
      errors.tempat_bayar = "Detail pembayaran sudah ada";
      return NextResponse.json(
        { message: "Detail pembayaran sudah ada", fields: errors },
        { status: 409 },
      );
    }

    let logoPath: string | null = null;
    if (logoFile && logoFile.size > 0) {
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

    return NextResponse.json(serializeBigInt(data), { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
