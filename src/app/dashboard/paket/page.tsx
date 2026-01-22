import PaketTable from "@/components/table-column/paket-table";
import { Button } from "@/components/ui/button";
import { Paket } from "@/types/paket";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
async function getData(): Promise<Paket[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/paket`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal fetch paket");
  }

  return res.json();
}

export default async function PaketPage() {
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Data Paket</h1>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Link href={"/dashboard/paket/add"}>
            <PlusIcon />
            <span>Add</span>
          </Link>
        </Button>
      </div>

      <PaketTable initialData={data} />
    </div>
  );
}
