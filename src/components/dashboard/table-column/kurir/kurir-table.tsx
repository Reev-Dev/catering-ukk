"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { User } from "@/types/data/user";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import kurirColumns from "./kurir-column";
import { API_URL } from "@/lib/api";

export default function KurirTable({ initialData }: { initialData: User[] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(`${API_URL}/kurir`, {
      cache: "no-store",
    });

    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return <DataTable data={data} loading={loading} columns={kurirColumns()} />;
}
