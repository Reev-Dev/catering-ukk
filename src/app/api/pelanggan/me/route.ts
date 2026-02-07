import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // ⚠️ sementara: ambil pelanggan pertama
    // nanti ganti pakai session user
    const pelanggan = await prisma.pelanggans.findFirst({
      select: {
        id: true,
        nama_pelanggan: true,
        email: true,
        telepon: true,
        alamat1: true,
        alamat2: true,
        alamat3: true,
      },
    });

    if (!pelanggan) {
      return NextResponse.json(
        { message: "Pelanggan tidak ditemukan" },
        { status: 404 },
      );
    }

    const alamat = [
      pelanggan.alamat1 && {
        key: "alamat1",
        label: "Alamat Utama",
        value: pelanggan.alamat1,
      },
      pelanggan.alamat2 && {
        key: "alamat2",
        label: "Alamat Alternatif",
        value: pelanggan.alamat2,
      },
      pelanggan.alamat3 && {
        key: "alamat3",
        label: "Alamat Lainnya",
        value: pelanggan.alamat3,
      },
    ].filter(Boolean);

    return NextResponse.json({
      id: pelanggan.id.toString(),
      nama_pelanggan: pelanggan.nama_pelanggan,
      email: pelanggan.email,
      telepon: pelanggan.telepon,
      alamat,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
