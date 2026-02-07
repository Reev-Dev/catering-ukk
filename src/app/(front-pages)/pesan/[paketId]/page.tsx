"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { PesanForm } from "@/components/landing/pesan/pesan-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function PesanPage() {
  const router = useRouter();
  const params = useParams<{ paketId: string }>();

  const [pelanggan, setPelanggan] = useState<any>(null);
  const [alamatList, setAlamatList] = useState<any[]>([]);
  const [metodePembayaran, setMetodePembayaran] = useState<any[]>([]);

  const [paket, setPaket] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/paket/${params.paketId}`).then((r) => r.json()),
      fetch(`/api/pelanggan/me`).then((r) => r.json()),
      fetch(`/api/jenis-pembayaran`).then((r) => r.json()),
    ])
      .then(([paket, pelanggan, pembayaran]) => {
        setPaket(paket);
        setPelanggan(pelanggan);
        setMetodePembayaran(pembayaran);
      })
      .catch(() => toast.error("Gagal memuat data"))
      .finally(() => setLoading(false));
  }, [params.paketId]);

  if (!paket) return notFound();

  if (loading)
    return (
      <div className="max-w-3xl mx-auto py-6">
        <Card>
          <div className="animate-pulse p-4 space-y-4">
            <div className="h-40 w-full rounded-md bg-muted" />
          </div>
        </Card>
      </div>
    );

  return (
    <PesanForm
      paket={paket}
      pelanggan={pelanggan}
      alamatList={pelanggan.alamat}
      metodePembayaran={metodePembayaran}
    />
  );
}
