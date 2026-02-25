import { getPaket } from "@/app/actions/paket";
import { DashboardStatCard } from "@/components/dashboard/card/dashboard-stat";
import PaketTable from "@/components/dashboard/table-column/paket-table";
import { Button } from "@/components/ui/button";
import { Paket } from "@/types/data/paket";
import { Box, PlusIcon, Utensils, UtensilsCrossed } from "lucide-react";
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
  const dataPaket = await getPaket();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <DashboardStatCard
          title="Total Paket"
          value={dataPaket.totalPaket}
          icon={Utensils}
          color="yellow"
        />

        <DashboardStatCard
          title="Total Prasmanan"
          value={dataPaket.totalPrasmanan}
          icon={UtensilsCrossed}
          color="green"
        />

        <DashboardStatCard
          title="Total Box"
          value={dataPaket.totalBox}
          icon={Box}
          color="blue"
        />
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Data Paket</h1>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Link href={"/dashboard/admin/paket/add"}>
            <PlusIcon />
            <span>Add</span>
          </Link>
        </Button>
      </div>

      <PaketTable initialData={data} />
    </div>
  );
}
