"use client";

import { API_URL } from "@/lib/api";
import { Pemesanan } from "@/types/data/pemesanan";
import { useState } from "react";
import { PesananDataTable } from "./pesanan-data-table";
import { pesananColumns } from "./pesanan-column";

export default function PesananTable({
  initialData,
}: {
  initialData: any[];
}) {
  const [data, setData] = useState<any[]>(initialData);
  const [loading, setLoading] = useState(false);

  return (
    <PesananDataTable
      columns={pesananColumns}
      data={data}
      loading={loading}
    />
  );
}
