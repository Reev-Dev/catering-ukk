import PemesananTable from "@/components/dashboard/table-column/pemesanan/pemesanan-table";
import { API_URL } from "@/lib/api";

async function getData() {
  const res = await fetch(`${API_URL}/pemesanan`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function PemesananPage() {
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold">Data Pemesanan</h1>
      </div>
      <PemesananTable initialData={data} />
    </div>
  );
}
