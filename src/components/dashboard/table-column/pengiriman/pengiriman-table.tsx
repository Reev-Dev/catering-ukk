"use client";

import { DataTable } from "@/components/data-table";
import { Pengiriman } from "@/types/data/pengiriman";
import { pengirimanColumns } from "./pengiriman-column";

export default function PengirimanTable({
  initialData,
}: {
  initialData: Pengiriman[];
}) {
  return (
    <DataTable
      columns={pengirimanColumns()}
      data={initialData}
      loading={false}
    />
  );
}
