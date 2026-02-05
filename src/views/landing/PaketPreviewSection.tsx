import { Star } from "lucide-react";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Paket } from "@/types/data/paket";
import Image from "next/image";

export default function PaketPreviewSection() {
  const [data, setData] = useState<Paket[]>([]);

  useEffect(() => {
    fetch(`/api/paket`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => toast.error("Gagal memuat data paket"));
  }, []);

  return (
    <section className="flex flex-col mx-auto h-full max-w-5xl py-20 ">
      <div className="flex mx-auto items-center px-4 py-16">
        <h2 className="text-4xl font-bold">Lihat Paket Kami</h2>
        <h5 className="text-xl font-bold"></h5>
      </div>
      <div className="grid grid-cols-3 gap-8 px-4">
        {data.slice(0, 3).map((data: any) => (
          <Card
            key={data.id}
            className="group relative flex flex-col gap-2 overflow-hidden pt-0"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={
                  data.foto1 ||
                  "https://dummyimage.com/600/placeholder-image.png"
                }
                alt={`${data.nama_paket}`}
                className="size-full object-cover transition-all duration-500 group-hover:scale-105"
                width={600}
                height={600}
              />
            </div>
            <CardHeader className="flex-1 pt-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{data.kategori}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="fill-foreground size-4" />
                  <span className="text-sm font-medium">{data.jumlah_pax}</span>
                </div>
              </div>
              <CardTitle className="text-xl font-semibold">
                {data.nama_paket}
              </CardTitle>
            </CardHeader>

            <CardFooter className="flex-col items-start space-y-4 pt-4">
              <div className="flex w-full items-baseline justify-between">
                <div>
                  <span className="text-foreground text-2xl font-bold">
                    Rp{data.harga_paket}
                  </span>
                  <span className="text-muted-foreground text-sm"> / pax</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  {data.jenis}
                </span>
              </div>
              <Button className="group-hover:bg-primary group-hover:text-primary-foreground w-full cursor-pointer">
                Details
                <svg
                  className="ms-2 size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
