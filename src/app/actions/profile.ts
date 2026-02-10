"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { cache, use } from "react";
import { deleteFile, saveFile } from "@/lib/upload";

export const getProfileById = cache(async (userId: bigint) => {
  return prisma.pelanggans.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nama_pelanggan: true,
      email: true,
      tgl_lahir: true,
      telepon: true,
      kartu_id: true,
      foto: true,
    },
  });
});

export const getAlamatByUserId = cache(async (userId: bigint) => {
  return prisma.pelanggans.findUnique({
    where: { id: userId },
    select: {
      alamat1: true,
      alamat2: true,
      alamat3: true,
    },
  });
});

export async function updateProfile(data: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const id = BigInt(session.user.id);

  const nama = data.get("nama_pelanggan") as string;
  const tgl_lahir_raw = data.get("tgl_lahir") as string | null;
  const telepon = data.get("telepon") as string;
  const kartu_id = data.get("kartu_id") as string;
  const fotoFile = data.get("foto") as File | null;

  const existing = await prisma.pelanggans.findUnique({
    where: { id },
    select: { foto: true },
  });

  let fotoPath = existing?.foto ?? null;

  if (fotoFile && fotoFile.size > 0) {
    // hapus foto lama
    if (existing?.foto) {
      await deleteFile(existing.foto);
    }

    // simpan foto baru
    fotoPath = await saveFile(fotoFile, "uploads/profile");
  }

  await prisma.pelanggans.update({
    where: { id },
    data: {
      nama_pelanggan: nama,
      telepon,
      kartu_id,
      foto: fotoPath,
      tgl_lahir: tgl_lahir_raw ? new Date(tgl_lahir_raw) : null,
    },
  });
}

export async function updateAlamat(data: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const id = BigInt(session.user.id);

  const alamat1 = data.get("alamat1") as string;
  const alamat2 = data.get("alamat2") as string;
  const alamat3 = data.get("alamat3") as string;

  await prisma.pelanggans.update({
    where: { id },
    data: {
      alamat1,
      alamat2,
      alamat3,
    },
  });
}
