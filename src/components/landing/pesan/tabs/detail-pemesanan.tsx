import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function TabDetailPesanan({ paket, jumlah, setJumlah, onNext }: any) {
  return (
    <div className="space-y-4">
      <Image
        src={paket.foto1 || "https://placehold.co/400x400/jpg"}
        alt={paket.nama_paket ?? "Foto Paket"}
        width={120}
        height={120}
        className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <h2 className="text-lg font-semibold">{paket.nama_paket}</h2>

      <div className="flex gap-2 items-center">
        <h2>Jumlah </h2>
        <Input
          type="number"
          min={1}
          max={paket.jumlah_pax}
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="w-fit"
        />
      </div>

      <Button className="w-full" onClick={onNext}>
        Selanjutnya
      </Button>
    </div>
  );
}
