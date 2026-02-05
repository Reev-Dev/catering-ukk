import { PaketList } from "@/components/landing/paket/paket-list";

export default function PaketPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 md:px-0 py-20">
      <h1 className="text-4xl font-bold mb-4">Pilih Paket Catering</h1>
      <p className="text-muted-foreground mb-10">
        Berbagai pilihan paket catering sesuai kebutuhan acara dan harian.
      </p>

      <PaketList />
    </section>
  );
}
