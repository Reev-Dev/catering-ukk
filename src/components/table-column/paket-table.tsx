"use client";

import { useState } from "react";
import { Paket } from "@/types/paket";
import { DataTable } from "@/components/data-table";
import { paketColumns } from "./paket-column";
import { API_URL } from "@/lib/api";

export default function PaketTable({ initialData }: { initialData: Paket[] }) {
  const [data, setData] = useState<Paket[]>(initialData);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(`${API_URL}/paket`, { cache: "no-store" });
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <DataTable
      columns={paketColumns(() => fetchData())}
      data={data}
      loading={loading}
    />
  );
}
