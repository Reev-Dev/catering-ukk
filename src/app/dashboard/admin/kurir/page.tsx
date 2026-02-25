import { getUser } from "@/app/actions/user";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import KurirTable from "@/components/dashboard/table-column/kurir/kurir-table";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import {
  PlusIcon,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${API_URL}/kurir`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function KurirPage() {
  const initialDataTable = await getData();
  const data = await getUser();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <DashboardStatCard
          title="Total Kurir"
          value={data.totalKurir}
          icon={UserRound}
          color="yellow"
        />

        <DashboardStatCard
          title="Kurir Aktif"
          value={data.totalKurirAktif}
          icon={UserRoundCog}
          color="green"
        />

        <DashboardStatCard
          title="Kurir Tersedia"
          value={data.totalKurirTersedia}
          icon={UserRoundCheck}
          color="blue"
        />
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Kurir</h1>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Link href="/dashboard/admin/kurir/add">
            <PlusIcon />
            <span>Add</span>
          </Link>
        </Button>
      </div>

      <KurirTable initialData={initialDataTable} />
    </div>
  );
}
