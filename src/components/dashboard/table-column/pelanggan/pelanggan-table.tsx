"use client";

import { DataTable } from "@/components/data-table";
import { pelangganColumns } from "./pelanggan-column";

export default function PelangganTable({
  initialData,
}: {
  initialData: any[];
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Daftar Pelanggan</h1>

      <DataTable
        data={initialData}
        loading={false}
        columns={pelangganColumns()}
      />
    </div>
  );
}
