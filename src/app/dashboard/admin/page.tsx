import { getDashboardStats } from "@/app/actions/dashboard";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import DashboardPemesananTable from "@/components/dashboard/table-column/dashboard/dashboard-pemesanan-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/api";
import {
  AlarmClock,
  BadgeCheck,
  ClipboardClock,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${API_URL}/pengiriman`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function DashboardAdminPage() {
  const stats = await getDashboardStats();
  const data = await getData();

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <DashboardStatCard
          title="Total Pesanan"
          value={stats.totalPemesanan}
          icon={ShoppingCart}
          color="yellow"
        />

        <DashboardStatCard
          title="Menunggu Konfirmasi"
          value={stats.totalPemesananMenungguKonfirmasi}
          icon={AlarmClock}
          color="green"
        />
        <DashboardStatCard
          title="Sedang  Diproses"
          value={stats.totalPemesananSedangDiproses}
          icon={ClipboardClock}
          color="blue"
        />
        <DashboardStatCard
          title="Selesai"
          value={stats.totalPemesananSelesai}
          icon={BadgeCheck}
          color="green"
        />
      </div>
      <Card className="flex gap-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Pesanan Terbaru</CardTitle>
          <Link href={"/dashboard/admin/pemesanan"}>
            <Button size="sm">Details</Button>
          </Link>
        </CardHeader>
        <CardContent className="flex w-full items-center">
          <DashboardPemesananTable initialData={data} />
        </CardContent>
      </Card>
    </>
  );
}
