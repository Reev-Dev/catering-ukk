"use client";

import { DataTable } from "@/components/data-table";
import { User } from "@/types/data/user";
import kurirColumns from "./kurir-column";

export default function KurirTable({ initialData }: { initialData: User[] }) {
  return (
    <DataTable data={initialData} loading={false} columns={kurirColumns()} />
  );
}
