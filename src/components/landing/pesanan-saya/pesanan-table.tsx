"use client";

import { PesananDataTable } from "./pesanan-data-table";
import { pesananColumns } from "./pesanan-column";

export default function PesananTable({ initialData }: { initialData: any[] }) {
  return (
    <PesananDataTable
      columns={pesananColumns}
      data={initialData}
      loading={false}
    />
  );
}
