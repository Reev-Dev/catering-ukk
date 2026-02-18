"use client";

import { useState } from "react";
import { Paket } from "@/types/data/paket";
import { DataTable } from "@/components/data-table";
import { paketColumns } from "./paket-column";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

export default function PaketTable({ initialData }: { initialData: Paket[] }) {
  const [data, setData] = useState<Paket[]>(initialData);
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/paket/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Paket berhasil dihapus");

      setData((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error("Gagal menghapus paket");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DataTable
      columns={paketColumns(handleDelete)}
      data={data}
      loading={loading}
    />
  );
}
