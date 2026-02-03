import DetailJenisPembayaranTable from "@/components/dashboard/table-column/jenis-pembayaran/detail/detail-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/jenis-pembayaran/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch detail");

  return res.json();
}

export default async function DetailJenisPembayaranPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Detail – {data.metode_pembayaran}
        </h1>

        <Button asChild size="sm">
          <Link href={`/dashboard/jenis-pembayaran/${id}/detail/add`}>
            Tambah Detail
          </Link>
        </Button>
      </div>

      <DetailJenisPembayaranTable
        initialData={data.detail_jenis_pembayarans}
        jenisPembayaranId={id}
      />
    </div>
  );
}
