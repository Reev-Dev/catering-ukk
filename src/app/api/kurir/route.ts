import { serializeBigInt } from "@/helper/serializeBigInt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sortBy = searchParams.get("sortBy") || "created_at";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const data = await prisma.users.findMany({
    where: {
      level: "Kurir",
    },
    include: {
      pengirimans: {
        include: {
          pemesanan: true,
        },
      },
    },
    orderBy: {
      [sortBy]: order,
    },
  });

  return NextResponse.json(serializeBigInt(data));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Data wajib diisi" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const kurir = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        level: "Kurir",
      },
    });

    return NextResponse.json(
      {
        ...kurir,
        id: kurir.id.toString(),
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
