import { PaketDetail } from "@/components/landing/paket/paket-detail";
import NotFound from "@/views/NotFound";

async function getPaket(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/paket/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function DetailPaketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paket = await getPaket(slug);

  if (!paket) {
    return <NotFound />;
  }

  return (
    <section className="mx-auto max-w-5xl py-10">
      <PaketDetail paket={paket} />
    </section>
  );
}
