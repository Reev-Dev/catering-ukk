import { getPelanggan, getTablePelanggan } from "@/app/actions/pelanggan";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import PelangganTable from "@/components/dashboard/table-column/pelanggan/pelanggan-table";
import { UserRound, UserRoundCheck } from "lucide-react";

export default async function PelangganPage() {
  const initialDataTable = await getTablePelanggan();
  const data = await getPelanggan();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <DashboardStatCard
          title="Total Pelanggan"
          value={data.totalPelanggan}
          icon={UserRound}
          color="yellow"
        />

        <DashboardStatCard
          title="Pelanggan Aktif"
          value={data.totalPelangganAktif}
          icon={UserRoundCheck}
          color="green"
        />
      </div>
      <PelangganTable initialData={initialDataTable} />
    </div>
  );
}
