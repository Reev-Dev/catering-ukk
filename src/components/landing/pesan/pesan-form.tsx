"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/formatter";
import { Button } from "@/components/ui/button";

import { TabDetailPesanan } from "./tabs/detail-pemesanan";
import { TabPenerima } from "./tabs/penerima";
import { TabPembayaran } from "./tabs/metode-pembayaran";

import { pesanAction } from "@/app/actions/pemesanan";

export function PesanForm({
  paket,
  pelanggan,
  alamatList,
  metodePembayaran,
}: {
  paket: any;
  pelanggan: any;
  alamatList: any[];
  metodePembayaran: any[];
}) {
  const [activeTab, setActiveTab] = useState("detail");
  const [jumlah, setJumlah] = useState(1);
  const [alamatId, setAlamatId] = useState<string | null>(null);
  const [pembayaranId, setPembayaranId] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const subtotal = jumlah * paket.harga_paket;

  const handleCheckout = () => {
    if (!alamatId || !pembayaranId) return alert("Data belum lengkap");

    startTransition(async () => {
      await pesanAction({
        paketId: paket.id,
        jumlah,
        alamatId: BigInt(alamatId),
        jenisPembayaranId: BigInt(pembayaranId),
        total: subtotal,
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Card className="p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full border-b rounded-none">
            <TabsTrigger value="detail">Detail Pesanan</TabsTrigger>
            <TabsTrigger value="penerima">Penerima</TabsTrigger>
            <TabsTrigger value="pembayaran">Pembayaran</TabsTrigger>
          </TabsList>

          <TabsContent value="detail">
            <TabDetailPesanan
              paket={paket}
              jumlah={jumlah}
              setJumlah={setJumlah}
              onNext={() => setActiveTab("penerima")}
            />
          </TabsContent>

          <TabsContent value="penerima">
            <TabPenerima
              alamatList={alamatList}
              selected={alamatId}
              onSelect={setAlamatId}
              onNext={() => setActiveTab("pembayaran")}
            />
          </TabsContent>

          <TabsContent value="pembayaran">
            <TabPembayaran
              total={subtotal}
              metodePembayaran={metodePembayaran}
              selected={pembayaranId}
              onSelect={setPembayaranId}
            />
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Bayar</p>
            <p className="text-xl font-bold">{formatRupiah(subtotal)}</p>
          </div>

          {activeTab === "pembayaran" && (
            <Button size="lg" onClick={handleCheckout} disabled={isPending}>
              {isPending ? "Memproses..." : "Pesan Sekarang"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
