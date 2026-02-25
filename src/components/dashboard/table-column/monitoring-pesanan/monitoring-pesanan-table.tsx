import { DataTable } from "@/components/data-table";
import { Pemesanan } from "@/types/data/pemesanan";
import { monitoringPesananColumns } from "./monitoring-pesanan-column";


export default function MonitoringPesananTable({
  initialData,
}: {
  initialData: Pemesanan[];
}) {
  return (
    <DataTable
      columns={monitoringPesananColumns}
      data={initialData}
      initialPageSize={5}
      loading={false}
    />
  );
}
