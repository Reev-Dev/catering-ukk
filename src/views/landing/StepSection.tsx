export default function StepSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-center text-4xl font-bold mb-12">Cara Pemesanan</h2>

      <div className="grid grid-cols-4 gap-8 text-center">
        <Step number="1" title="Pilih Paket" />
        <Step number="2" title="Isi Data" />
        <Step number="3" title="Pilih Pembayaran" />
        <Step number="4" title="Pesanan Diproses" />
      </div>
    </section>
  );
}

function Step({ number, title }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">
        {number}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
