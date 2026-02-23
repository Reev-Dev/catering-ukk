"use client";

import { DataTable } from "@/components/data-table";
import { dashboardPemesananColumns } from "./dashboard-pemesanan-column";

export default function DashboardPemesananTable({
  initialData,
}: {
  initialData: any[];
}) {
  return (
    <DataTable
      columns={dashboardPemesananColumns}
      data={initialData}
      initialPageSize={5}
      loading={false}
    />
  );
}
