"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { detailJenisPembayaranColumns } from "./detail-column";
import { API_URL } from "@/lib/api";
import { DetailJenisPembayaran } from "@/types/data/pembayaran";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DetailJenisPembayaranDialog from "@/components/dashboard/dialogs/detail-jenis-pembayaran-dialog";

export default function DetailJenisPembayaranTable({
  initialData,
  jenisPembayaranId,
}: {
  initialData: DetailJenisPembayaran[];
  jenisPembayaranId: string;
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DetailJenisPembayaran | null>(null);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(
      `${API_URL}/jenis-pembayaran/${jenisPembayaranId}`,
      { cache: "no-store" },
    );

    const json = await res.json();
    setData(json.detail_jenis_pembayarans);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end -mt-12">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Detail
        </Button>
      </div>

      <DataTable
        data={data}
        loading={loading}
        columns={detailJenisPembayaranColumns(fetchData, setSelected, setOpen)}
      />

      <DetailJenisPembayaranDialog
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        jenisPembayaranId={jenisPembayaranId}
        onSuccess={fetchData}
      />
    </div>
  );
}
