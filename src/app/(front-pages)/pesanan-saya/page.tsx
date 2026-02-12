import { getPemesanansByUserId } from "@/app/actions/pemesanan";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PesananTable from "@/components/landing/pesanan-saya/pesanan-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";

export default async function PesananSayaPage({
  searchParams,
}: {
  searchParams: Promise<{
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}) {
  const session = await getServerSession(authOptions);
  const userId = BigInt(session!.user.id);

  const params = await searchParams;

  const sortBy = params.sortBy || "total_bayar" ? "total_bayar" : "created_at";

  const order = params.order === "asc" ? "asc" : "desc";

  const data = await getPemesanansByUserId(userId, sortBy, order);

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Saya</CardTitle>
        </CardHeader>
        <CardContent>
          <PesananTable initialData={data} />
        </CardContent>
      </Card>
    </div>
  );
}
