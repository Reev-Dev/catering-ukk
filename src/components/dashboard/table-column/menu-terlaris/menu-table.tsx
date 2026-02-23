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

// export function DashboardMenuTerlarisTable({ data }: { data: MenuTerlaris[] }) {
//   return (
//     <table className="w-full text-sm">
//       <thead>
//         <tr className="text-left border-b">
//           <th className="py-2">Paket</th>
//           <th>Total Dipesan</th>
//           <th>Total Omzet</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={String(item.id)} className="border-b">
//             <td className="py-2 font-medium">
//               {index === 0 && "🔥 "}
//               {item.nama_paket}
//             </td>
//             <td>{item.totalDipesan}x</td>
//             <td className="font-semibold text-green-600">
//               {formatRupiah(item.totalOmzet)}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

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
