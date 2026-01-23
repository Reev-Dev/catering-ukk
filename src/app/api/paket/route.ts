import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import { JenisPaket, KategoriPaket } from "@prisma/client";

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
    const formData = await req.formData();

    const nama_paket = formData.get("nama_paket") as string;
    const jenis = formData.get("jenis");
    const kategori = formData.get("kategori") as string;
    const jumlah_pax = Number(formData.get("jumlah_pax"));
    const harga_paket = Number(formData.get("harga_paket"));
    const deskripsi = formData.get("deskripsi") as string;

    const errors: Record<string, string> = {};

    if (!nama_paket) errors.nama_paket = "Nama paket wajib diisi";
    if (!jenis) errors.jenis = "Jenis wajib dipilih";
    if (!kategori) errors.kategori = "Kategori wajib dipilih";
    if (!jumlah_pax) errors.jumlah_pax = "Jumlah pax wajib diisi";
    if (!harga_paket) errors.harga_paket = "Harga paket wajib diisi";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: "Gagal menambah paket, data wajib diisi",
          fields: errors,
        },
        { status: 400 },
      );
    }

    const images = ["foto1", "foto2", "foto3"] as const;
    const savedImages: Record<string, string | null> = {
      foto1: null,
      foto2: null,
      foto3: null,
    };

    for (const key of images) {
      const file = formData.get(key) as File | null;
      if (!file) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(
        process.cwd(),
        "public/uploads/paket",
        fileName,
      );

      await writeFile(filePath, buffer);
      savedImages[key] = `/uploads/paket/${fileName}`;
    }

    const paket = await prisma.pakets.create({
      data: {
        nama_paket,
        jenis: jenis as JenisPaket,
        kategori: kategori as KategoriPaket,
        deskripsi,
        jumlah_pax,
        harga_paket,
        ...savedImages,
      },
    });

    return NextResponse.json(
      { ...paket, id: paket.id.toString() },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal menambah paket" },
      { status: 500 },
    );
  }
}
