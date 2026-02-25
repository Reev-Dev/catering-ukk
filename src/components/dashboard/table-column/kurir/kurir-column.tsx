"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@/types/data/user";
import { ColumnDef } from "@tanstack/react-table";

export default function kurirColumns(): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: () => <span className="pl-3">Kurir</span>,
      cell: ({ row }) => (
        <span className="font-medium pl-3">{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "email",
      header: () => <span className="pl-3">Email</span>,
      cell: ({ row }) => (
        <span className="font-medium pl-3">{row.getValue("email")}</span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const pengirimans = row.original.pengirimans || [];

        const sedangDikirim = pengirimans.some(
          (p) => p.status_kirim === "SedangDikirim",
        );

        if (sedangDikirim) {
          return (
            <Badge variant="blue" className="font-medium">
              Sedang melakukan pengiriman
            </Badge>
          );
        }

        return (
          <span className="font-medium text-xs text-muted-foreground">
            Tidak sedang melakukan pengiriman
          </span>
        );
      },
    },
  ];
}
