import {
  getDashboardStats,
  getPemesanan,
  getPendapatan,
  getStatusSummary,
} from "@/app/actions/dashboard";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import { ChartPendapatan } from "@/components/dashboard/chart/chart-pendapatan";
import { ChartPesananStatus } from "@/components/dashboard/chart/chart-status-pesanan";
import DashboardPemesananTable from "@/components/dashboard/table-column/dashboard/dashboard-pemesanan-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRupiah } from "@/lib/formatter";
import { Box, CircleDollarSign, ShoppingCart, UserRound } from "lucide-react";
import { Suspense } from "react";

export default async function DashboardOwnerPage() {
  const stats = await getDashboardStats();
  const status_pesanan = await getStatusSummary();
  const [data7, data30, data90] = await Promise.all([
    getPendapatan(7),
    getPendapatan(30),
    getPendapatan(90),
  ]);

  const initialData = await getPemesanan();

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <DashboardStatCard
          title="Total Pemesanan"
          value={stats.totalPemesanan}
          icon={ShoppingCart}
          color="yellow"
        />

        <DashboardStatCard
          title="Total Pendapatan"
          value={formatRupiah(stats.totalPendapatan)}
          icon={CircleDollarSign}
          color="green"
        />

        <DashboardStatCard
          title="Jumlah Paket Aktif"
          value={stats.totalPaketAktif}
          icon={Box}
          color="yellow"
        />

        <DashboardStatCard
          title="Pelanggan"
          value={stats.totalPelanggan}
          icon={UserRound}
          color="blue"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <ChartPesananStatus data={status_pesanan} />
        </div>
        <div className="col-span-3">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ChartPendapatan data7={data7} data30={data30} data90={data90} />
          </Suspense>
        </div>
      </div>
      <div className="flex">
        <Card className="flex flex-col">
          <CardHeader className="flex items-center">
            <CardTitle>Pesanan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardPemesananTable initialData={initialData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
