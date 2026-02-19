import JenisPembayaranTable from "@/components/dashboard/table-column/jenis-pembayaran/jenis-pembayaran-table";
import { API_URL } from "@/lib/api";

async function getData() {
  const res = await fetch(`${API_URL}/jenis-pembayaran`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function JenisPembayaranPage() {
  const data = await getData();

  return <JenisPembayaranTable initialData={data} />;
}
