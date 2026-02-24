import { getDashboardStats } from "@/app/actions/dashboard";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import PesananTable from "@/components/dashboard/table-column/monitoring-pesanan/monitoring-pesanan-table";
import { API_URL } from "@/lib/api";
import {
  AlarmClock,
  BadgeCheck,
  ClipboardClock,
  HandCoins,
} from "lucide-react";

async function getData() {
  const res = await fetch(`${API_URL}/pengiriman`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function MonitoringPesananOwner() {
  const stats = await getDashboardStats();
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold">Monitoring Pesanan</h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <DashboardStatCard
          title="Total Pesanan"
          value={stats.totalPemesanan}
          icon={HandCoins}
          color="green"
        />
        <DashboardStatCard
          title="Menunggu"
          value={stats.totalPemesananMenunggu}
          icon={AlarmClock}
          color="yellow"
        />
        <DashboardStatCard
          title="Sedang Diproses"
          value={stats.totalPemesananSedangDiproses}
          icon={ClipboardClock}
          color="yellow"
        />
        <DashboardStatCard
          title="Selesai"
          value={stats.totalPemesananSelesai}
          icon={BadgeCheck}
          color="blue"
        />
      </div>
      <PesananTable initialData={data} />
    </div>
  );
}
