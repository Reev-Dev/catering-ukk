"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import {
  detailJenisPembayaranColumns
} from "./detail-column";
import { API_URL } from "@/lib/api";
import { DetailJenisPembayaran } from "@/types/data/pembayaran";

export default function DetailJenisPembayaranTable({
  initialData,
  jenisPembayaranId,
}: {
  initialData: DetailJenisPembayaran[];
  jenisPembayaranId: string;
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(
      `${API_URL}/jenis-pembayaran/${jenisPembayaranId}`,
      { cache: "no-store" },
    );

    const json = await res.json();
    setData(json.detail_jenis_pembayarans);
    setLoading(false);
  }

  return (
    <DataTable
      data={data}
      loading={loading}
      columns={detailJenisPembayaranColumns(fetchData)}
    />
  );
}
