import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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
  const body = await req.json();

  const paket = await prisma.pakets.update({
    where: { id: BigInt(id) },
    data: body,
  });

  return NextResponse.json({
    ...paket,
    id: paket.id.toString(),
  });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await prisma.pakets.delete({
    where: { id: BigInt(id) },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}
