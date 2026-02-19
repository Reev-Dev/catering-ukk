"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { approvePemesanan } from "@/app/actions/pemesanan";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ApproveSection({
  pemesananId,
  status,
  setOpen,
}: {
  pemesananId: bigint;
  status: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (status !== "MenungguKonfirmasi") return null;

  const handleApprove = () => {
    startTransition(async () => {
      try {
        await approvePemesanan(pemesananId);

        toast.success("Pemesanan berhasil diapprove!");
        router.refresh();
        setOpen(false);
      } catch (error) {
        toast.error("Gagal approve pemesanan!");
      }
    });
  };

  return (
    <div className="border-t pt-4 mt-4">
      <Button disabled={pending} onClick={handleApprove}>
        {pending ? "Memproses..." : "Approve (Menunggu Kurir)"}
      </Button>
    </div>
  );
}
