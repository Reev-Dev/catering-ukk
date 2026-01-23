import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, saveFile } from "@/lib/upload";
import { JenisPaket, KategoriPaket } from "@prisma/client";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const paket = await prisma.pakets.findUnique({
    where: { id: BigInt(id) },
  });

  if (!paket) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({
    ...paket,
    id: paket.id.toString(),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const formData = await req.formData();

  const existing = await prisma.pakets.findUnique({
    where: { id: BigInt(id) },
  });

  if (!existing) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  // ===============================
  // 🔴 VALIDASI
  // ===============================
  const errors: Record<string, string> = {};

  const nama_paket = formData.get("nama_paket") as string;
  const jenis = formData.get("jenis") as string;
  const kategori = formData.get("kategori") as string;
  const jumlah_pax = Number(formData.get("jumlah_pax"));
  const harga_paket = Number(formData.get("harga_paket"));
  const deskripsi = formData.get("deskripsi") as string;

  if (!nama_paket) errors.nama_paket = "Nama paket wajib diisi";
  if (!jenis) errors.jenis = "Jenis wajib dipilih";
  if (!kategori) errors.kategori = "Kategori wajib dipilih";
  if (!jumlah_pax) errors.jumlah_pax = "Jumlah pax wajib diisi";
  if (!harga_paket) errors.harga_paket = "Harga paket wajib diisi";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Gagal update paket, data wajib diisi", fields: errors },
      { status: 400 },
    );
  }

  // ===============================
  // 🔥 IMAGE HANDLING
  // ===============================
  const keptImages = JSON.parse(
    (formData.get("keptImages") as string) || "[]",
  ) as string[];

  const allOldImages = [existing.foto1, existing.foto2, existing.foto3];

  for (const img of allOldImages) {
    if (img && !keptImages.includes(img)) {
      await deleteFile(img);
    }
  }

  const newFiles = formData.getAll("newImages") as File[];
  const newPaths: string[] = [];

  for (const file of newFiles) {
    const path = await saveFile(file, "uploads/paket");
    newPaths.push(path);
  }

  const finalImages = [...keptImages, ...newPaths];

  const paket = await prisma.pakets.update({
    where: { id: BigInt(id) },
    data: {
      nama_paket,
      jenis: jenis as JenisPaket,
      kategori: kategori as KategoriPaket,
      deskripsi,
      jumlah_pax,
      harga_paket,
      foto1: finalImages[0] ?? null,
      foto2: finalImages[1] ?? null,
      foto3: finalImages[2] ?? null,
    },
  });

  return NextResponse.json({
    ...paket,
    id: paket.id.toString(),
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const paket = await prisma.pakets.findUnique({
    where: { id: BigInt(id) },
  });

  if (paket) {
    await deleteFile(paket.foto1);
    await deleteFile(paket.foto2);
    await deleteFile(paket.foto3);
  }

  await prisma.pakets.delete({
    where: { id: BigInt(id) },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}
