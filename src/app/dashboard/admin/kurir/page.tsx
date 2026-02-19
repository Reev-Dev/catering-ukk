import KurirTable from "@/components/dashboard/table-column/kurir/kurir-table";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${API_URL}/kurir`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function KurirPage() {
  const data = await getData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Kurir</h1>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Link href="/dashboard/admin/kurir/add">
            <PlusIcon />
            <span>Add</span>
          </Link>
        </Button>
      </div>

      <KurirTable initialData={data} />
    </div>
  );
}
