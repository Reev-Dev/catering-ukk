"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { assignKurir } from "@/app/actions/pemesanan";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AssignKurir({
  pemesananId,
  status,
  setOpen,
}: {
  pemesananId: bigint;
  status: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [kurirList, setKurirList] = useState<any[]>([]);
  const [selectedKurir, setSelectedKurir] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/kurir")
      .then((res) => res.json())
      .then((data) => setKurirList(data));
  }, []);

  const handleAssign = () => {
    startTransition(async () => {
      try {
        await assignKurir(pemesananId, BigInt(selectedKurir!));

        toast.success("Pemesanan berhasil diassign kurir!");
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error("Gagal assign kurir!");
      }
    });
  };

  if (status !== "MenungguKurir") return null;

  return (
    <div className="border-t pt-4 mt-4 space-y-2">
      <Select
        name="kurir"
        defaultValue={selectedKurir || ""}
        onValueChange={(e) => setSelectedKurir(e)}
      >
        <SelectTrigger size="sm" className="w-full">
          <SelectValue placeholder="Pilih Kurir" />
        </SelectTrigger>
        <SelectContent>
          {kurirList.map((k) => (
            <SelectItem key={k.id} value={k.id}>
              {k.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button disabled={!selectedKurir || pending} onClick={handleAssign}>
        Assign Kurir & Proses
      </Button>
    </div>
  );
}
