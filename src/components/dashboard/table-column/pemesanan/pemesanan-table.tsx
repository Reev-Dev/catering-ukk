"use client";

import { DataTable } from "@/components/data-table";
import { Pemesanan } from "@/types/data/pemesanan";
import { pemesananColumns } from "./pemesanan-column";

export default function PemesananTable({
  initialData,
}: {
  initialData: Pemesanan[];
}) {
  return (
    <DataTable columns={pemesananColumns} data={initialData} loading={false} />
  );
}
