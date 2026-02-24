import { getUser } from "@/app/actions/user";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import UserTable from "@/components/dashboard/table-column/user/user-table";
import { API_URL } from "@/lib/api";
import { Truck, UserRoundCog, UsersRound } from "lucide-react";

async function getUserData() {
  const res = await fetch(`${API_URL}/auth/super-user/register`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function UserPageForOwner() {
  const data = await getUserData();
  const statsUser = await getUser();
  console.log(data);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <DashboardStatCard
          title="Total User"
          value={statsUser.totalUser}
          icon={UsersRound}
          color="blue"
        />

        <DashboardStatCard
          title="Admin"
          value={statsUser.totalAdmin}
          icon={UserRoundCog}
          color="green"
        />

        <DashboardStatCard
          title="Kurir"
          value={statsUser.totalKurir}
          icon={Truck}
          color="yellow"
        />
      </div>
      <UserTable initialData={data} />
    </div>
  );
}
