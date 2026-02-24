export interface MenuTerlaris {
  id: bigint;
  nama_paket: string;
  hargaPaket: number;
  totalDipesan: number;
  totalOmzet: number;
}

import { DataTable } from "@/components/data-table";
import { menuColumns } from "./menu-column";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MenuTerlarisTable({
  initialData,
}: {
  initialData: MenuTerlaris[];
}) {
  return (
    <Card className="flex gap-2">
      <CardHeader>
        <CardTitle>Top Menu</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center gap-4">
        <DataTable
          columns={menuColumns}
          data={initialData}
          initialPageSize={5}
          loading={false}
        />
      </CardContent>
    </Card>
  );
}
