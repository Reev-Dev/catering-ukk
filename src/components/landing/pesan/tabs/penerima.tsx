import { Button } from "@/components/ui/button";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export function TabPenerima({ alamatList, selected, onSelect, onNext }: any) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Pilih Alamat</h2>

      {alamatList.map((alamat: { id: Key | null | undefined; alamat: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <label key={alamat.id} className="flex items-center gap-2">
          <input
            type="radio"
            checked={selected === alamat.id}
            onChange={() => onSelect(alamat.id)}
          />
          {alamat.alamat}
        </label>
      ))}

      <Button className="w-full" onClick={onNext} disabled={!selected}>
        Selanjutnya
      </Button>
    </div>
  );
}
