import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PengirimanTable from "@/components/dashboard/table-column/pengiriman/pengiriman-table";
import { API_URL } from "@/lib/api";
import { getServerSession } from "next-auth";

async function getData(userId: bigint) {
  const res = await fetch(`${API_URL}/pengiriman/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function KurirPage() {
  const session = await getServerSession(authOptions);
  const userId = BigInt(session!.user.id);
  const data = await getData(userId);

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold">Data Pengiriman</h1>
      </div>

      <PengirimanTable initialData={data} />
    </div>
  );
}
