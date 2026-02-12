import { notFound } from "next/navigation";
import { PesanForm } from "@/components/landing/pesan/pesan-form";
import {
  getAlamatPelanggan,
  getJenisPembayaran,
  getPaketById,
  getPelangganById,
} from "@/app/actions/pemesanan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PesanPage({
  params,
}: {
  params: Promise<{ paketId?: string }>;
}) {
  const { paketId } = await params;

  if (!paketId) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) notFound();

  const userId = BigInt(session.user.id);

  const paketIdBigInt = BigInt(paketId!);

  const [paket, pelanggan, alamat, metodePembayaran] = await Promise.all([
    getPaketById(paketIdBigInt),
    getPelangganById(userId),
    getAlamatPelanggan(userId),
    getJenisPembayaran(),
  ]);

  if (!paket || !pelanggan) notFound();

  return (
    <PesanForm
      paket={paket}
      pelanggan={pelanggan}
      alamatList={alamat}
      metodePembayaran={metodePembayaran}
    />
  );
}
