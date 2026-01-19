import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nama_pelanggan,
      email,
      password
    } = body;

    // 1️⃣ Validasi basic
    if (!nama_pelanggan || !email || !password) {
      return NextResponse.json(
        { message: "Data wajib diisi" },
        { status: 400 }
      );
    }

    // 2️⃣ Cek email sudah dipakai atau belum
    const existingUser =
      (await prisma.users.findUnique({ where: { email } })) ||
      (await prisma.pelanggans.findUnique({ where: { email } }));

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Simpan ke table pelanggans
    await prisma.pelanggans.create({
      data: {
        nama_pelanggan,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
