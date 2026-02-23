import {
  getDashboardStats,
  getMenuTerlaris,
  getPendapatan,
} from "@/app/actions/dashboard";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import { ChartPendapatan } from "@/components/dashboard/chart/chart-pendapatan";
import MenuTerlarisTable from "@/components/dashboard/table-column/menu-terlaris/menu-table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRupiah } from "@/lib/formatter";
import { HandCoins, ShoppingCart, UserRoundCheck } from "lucide-react";
import { Suspense } from "react";

export default async function LaporanPenjualanOwnerPage() {
  const stats = await getDashboardStats();
  const [data7, data30, data90] = await Promise.all([
    getPendapatan(7),
    getPendapatan(30),
    getPendapatan(90),
  ]);
  const menuTerlaris = await getMenuTerlaris();

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold">Laporan Penjualan</h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <DashboardStatCard
          title="Total Omzet"
          value={formatRupiah(stats.totalPendapatan)}
          icon={HandCoins}
          color="green"
        />
        <DashboardStatCard
          title="Total Pesanan"
          value={stats.totalPemesanan}
          icon={ShoppingCart}
        />
        <DashboardStatCard
          title="Rata-rata Omzet"
          value={formatRupiah(stats.rataRataOmzet)}
          icon={HandCoins}
          color="green"
        />
        <DashboardStatCard
          title="Pelanggan Aktif"
          value={stats.totalPelangganAktif}
          icon={UserRoundCheck}
          color="blue"
        />
      </div>
      <div className="grid">
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <ChartPendapatan data7={data7} data30={data30} data90={data90} />
        </Suspense>
      </div>

      <MenuTerlarisTable initialData={menuTerlaris} />
    </div>
  );
}
