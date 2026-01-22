import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

async function main() {
  // ADMIN
  const admin = await prisma.users.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash(
        "admin123",
        (process.env.NEXTAUTH_SECRET as string).length,
      ),
      level: "Admin",
    },
  });

  const pelanggan = await prisma.pelanggans.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      nama_pelanggan: "Customer Ripay",
      email: "customer@example.com",
      password: await bcrypt.hash(
        "customer123",
        (process.env.NEXTAUTH_SECRET as string).length,
      ),
      tgl_lahir: new Date("1990-01-01"),
      telepon: "081234567890",
      alamat1: "Jl. Example No. 123",
      kartu_id: "1234567890",
      foto: null,
    },
  });

  // JENIS PEMBAYARAN
  const jenisPembayaran = await prisma.jenis_pembayarans.createMany({
    data: [{ metode_pembayaran: "Transfer" }, { metode_pembayaran: "Cash" }],
  });

  // PAKET SAMPLE
  if (process.env.NODE_ENV === "production") return;

  const paket = Array.from({ length: 50 }).map(() => ({
    nama_paket: faker.commerce.productName(),
    jenis: faker.helpers.arrayElement(["Box", "Prasmanan"]),
    kategori: faker.helpers.arrayElement(["Pernikahan", "Rapat"]),
    jumlah_pax: faker.number.int({ min: 10, max: 200 }),
    harga_paket: faker.number.int({ min: 25000, max: 500000 }),
    deskripsi: faker.commerce.productDescription(),
  }));

  await prisma.pakets.createMany({ data: paket });

  console.log({ admin, pelanggan, jenisPembayaran, paket });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
