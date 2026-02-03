"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { jenisPembayaranColumns } from "./jenis-pembayaran-column";
import { API_URL } from "@/lib/api";
import { JenisPembayaran } from "@/types/data/pembayaran";
import { Button } from "@/components/ui/button";
import JenisPembayaranDialog from "../../dialogs/jenis-pembayaran-dialog";
import { PlusIcon } from "lucide-react";

export default function JenisPembayaranTable({
  initialData,
}: {
  initialData: JenisPembayaran[];
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<JenisPembayaran | null>(null);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(`${API_URL}/jenis-pembayaran`, {
      cache: "no-store",
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Jenis Pembayaran</h1>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          <PlusIcon />
          Add
        </Button>
      </div>
      <DataTable
        data={data}
        loading={loading}
        columns={jenisPembayaranColumns(fetchData, setSelected, setOpen)}
      />

      <JenisPembayaranDialog
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSuccess={fetchData}
      />
    </div>
  );
}
