import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PengirimanTable from "@/components/dashboard/table-column/pengiriman/pengiriman-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL } from "@/lib/api";
import { Box, PackageCheck, Van } from "lucide-react";
import { getServerSession } from "next-auth";

async function getData(userId: bigint) {
  const res = await fetch(`${API_URL}/pengiriman/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal fetch data");

  return res.json();
}

export default async function KurirPage() {
  const session = await getServerSession(authOptions);
  const userId = BigInt(session!.user.id);
  const data = await getData(userId);

  const total = data.length;
  const sedangDikirim = data.filter(
    (item: { status_kirim: string }) => item.status_kirim !== "TibaDiTujuan",
  ).length;

  const selesai = data.filter(
    (item: { status_kirim: string }) => item.status_kirim === "TibaDiTujuan",
  ).length;

  return (
    <div className="space-y-3">
      {/* <Card className="relative flex flex-col pt-0 pb-3 gap-3">
        <div
          className="relative z-10 w-full h-8 rounded-t-xs"
          style={{
            background:
              "linear-gradient(90deg, #f07a88 10%, #9b8de0 50%, #5bc0eb 90%)",
          }}
        />
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="grid">
              <CardTitle className="text-xl font-bold">
                Halo, {session!.user.name}
              </CardTitle>
              <CardDescription>
                Selamat sejahtera untuk kamu yang selalu siap memulai
                pengantaran
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card> */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <Box
              size={42}
              className="bg-yellow-100 text-yellow-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Total Pengiriman
              </span>
              <span className="text-2xl font-bold">{total}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <Van
              size={42}
              className="bg-blue-100 text-blue-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Sedang Dikirim
              </span>
              <span className="text-2xl font-bold">{sedangDikirim}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex justify-center items-center">
          <CardContent className="flex w-full justify-start gap-4">
            <PackageCheck
              size={42}
              className="bg-green-100 text-green-400 p-2 rounded-xs"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Selesai
              </span>
              <span className="text-2xl font-bold">{selesai}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <PengirimanTable initialData={data} />
    </div>
  );
}
