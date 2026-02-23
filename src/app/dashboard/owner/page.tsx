import {
  getDashboardStats,
  getPemesanan,
  getPendapatan,
  getStatusSummary,
} from "@/app/actions/dashboard";
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
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <ShoppingCart
              size={42}
              className="bg-yellow-100 text-yellow-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Total Pemesanan
              </span>
              <span className="text-2xl font-bold">{stats.totalPemesanan}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <CircleDollarSign
              size={42}
              className="bg-green-100 text-green-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Total Pendapatan
              </span>
              <span className="text-2xl font-bold">
                {formatRupiah(stats.totalPendapatan)}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <Box
              size={42}
              className="bg-yellow-100 text-yellow-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Jumlah Paket Aktif
              </span>
              <span className="text-2xl font-bold">
                {stats.totalPaketAktif}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <UserRound
              size={42}
              className="bg-blue-100 text-blue-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Pelanggan
              </span>
              <span className="text-2xl font-bold">{stats.totalPelanggan}</span>
            </div>
          </CardContent>
        </Card>
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
