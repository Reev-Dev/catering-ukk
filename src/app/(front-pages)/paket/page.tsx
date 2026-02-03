import Image from "next/image";

const paket = [
  { id: 1, nama: "Paket Hemat", harga: 25000 },
  { id: 2, nama: "Paket Keluarga", harga: 40000 },
  { id: 3, nama: "Paket Premium", harga: 60000 },
];

export default function PaketPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="mb-10 text-3xl font-bold">Paket Catering</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {paket.map((p) => (
          <div key={p.id} className="rounded-xl border p-6 hover:shadow-md">
            <div className="mb-4 h-40 rounded bg-zinc-100" />
            <h2 className="text-xl font-semibold">{p.nama}</h2>
            <p className="mb-4 text-zinc-600">Rp {p.harga.toLocaleString()}</p>

            <button className="w-full rounded bg-zinc-900 py-2 text-white">
              Login untuk Pesan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
