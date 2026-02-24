import { serializeBigInt } from "@/helper/serializeBigInt";
import { prisma } from "@/lib/prisma";
import { LevelUser } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      level: true,
    },
    where: {
      level: {
        not: "Owner",
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(serializeBigInt(data));
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const level = formData.get("level") as string;
    const password = formData.get("password") as string;
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Name wajib diisi";
    if (!email) errors.email = "Email wajib diisi";
    if (!password) errors.password = "Password wajib diisi";

    const allowedLevels: LevelUser[] = [LevelUser.Admin, LevelUser.Kurir];
    if (!level) {
      errors.level = "Level wajib dipilih";
    } else if (!allowedLevels.includes(level as LevelUser)) {
      errors.level = "Level tidak valid";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: "Gagal menambah user, data wajib diisi",
          fields: errors,
        },
        { status: 400 },
      );
    }

    const existingUser =
      (await prisma.pelanggans.findUnique({ where: { email } })) ||
      (await prisma.users.findUnique({ where: { email } }));

    if (existingUser) {
      errors.email = "Email sudah terdaftar";
      return NextResponse.json(
        { message: "Pendaftaran user gagal" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        level: level as LevelUser,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
