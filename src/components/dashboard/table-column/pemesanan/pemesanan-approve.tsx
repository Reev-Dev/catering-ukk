"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { approvePemesanan } from "@/app/actions/pemesanan";

export function ApproveSection({
  pemesananId,
  status,
}: {
  pemesananId: bigint;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  if (status !== "MenungguKonfirmasi") return null;

  return (
    <div className="border-t pt-4 mt-4">
      <Button
        disabled={pending}
        onClick={() => startTransition(() => approvePemesanan(pemesananId))}
      >
        {pending ? "Memproses..." : "Approve (Menunggu Kurir)"}
      </Button>
    </div>
  );
}
