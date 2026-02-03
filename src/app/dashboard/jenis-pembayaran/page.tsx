import JenisPembayaranTable from "@/components/dashboard/table-column/jenis-pembayaran/jenis-pembayaran-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/jenis-pembayaran`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function JenisPembayaranPage() {
  const data = await getData();

  return <JenisPembayaranTable initialData={data} />;
}
