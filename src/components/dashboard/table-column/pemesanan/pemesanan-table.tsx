"use client";

import { DataTable } from "@/components/data-table";
import { Pemesanan } from "@/types/data/pemesanan";
import { useState } from "react";
import { pemesananColumns } from "./pemesanan-column";

export default function PemesananTable({
  initialData,
}: {
  initialData: Pemesanan[];
}) {
  const [data, setData] = useState<Pemesanan[]>(initialData);
  const [loading, setLoading] = useState(false);

  return <DataTable columns={pemesananColumns} data={data} loading={loading} />;
}
