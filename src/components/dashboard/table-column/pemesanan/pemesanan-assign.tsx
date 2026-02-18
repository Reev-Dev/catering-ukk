"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { assignKurir } from "@/app/actions/pemesanan";

export function AssignKurir({
  pemesananId,
  status,
}: {
  pemesananId: bigint;
  status: string;
}) {
  const [kurirList, setKurirList] = useState<any[]>([]);
  const [selectedKurir, setSelectedKurir] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/kurir")
      .then((res) => res.json())
      .then((data) => setKurirList(data));
  }, []);

  if (status !== "MenungguKurir") return null;

  return (
    <div className="border-t pt-4 mt-4 space-y-2">
      <select
        className="w-full border rounded p-2 text-sm"
        onChange={(e) => setSelectedKurir(e.target.value)}
      >
        <option value="">Pilih Kurir</option>
        {kurirList.map((k) => (
          <option key={k.id} value={k.id}>
            {k.name}
          </option>
        ))}
      </select>

      <Button
        disabled={!selectedKurir || pending}
        onClick={() =>
          startTransition(() =>
            assignKurir(pemesananId, BigInt(selectedKurir!)),
          )
        }
      >
        Assign Kurir & Proses
      </Button>
    </div>
  );
}
