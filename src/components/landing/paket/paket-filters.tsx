import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PaketFilters({
  search,
  setSearch,
  jenis,
  setJenis,
  kategori,
  setKategori,
  kategoriList,
}: {
  search: string;
  setSearch: (v: string) => void;
  jenis: string;
  setJenis: (v: string) => void;
  kategori: string;
  setKategori: (v: string) => void;
  kategoriList: readonly string[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Input
        placeholder="Cari paket..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-56 rounded-md border px-3 py-2 text-sm"
      />

      {/* JENIS */}
      <Select value={jenis} onValueChange={setJenis}>
        <SelectTrigger size="sm" className="w-32">
          <SelectValue placeholder="Filter Jenis" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Jenis</SelectItem>
          <SelectItem value="Prasmanan">Prasmanan</SelectItem>
          <SelectItem value="Box">Box</SelectItem>
        </SelectContent>
      </Select>

      {/* KATEGORI */}
      <Select
        value={kategori}
        onValueChange={setKategori}
      >
        <SelectTrigger size="sm" className="w-38">
          <SelectValue placeholder="Filter Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Kategori</SelectItem>
          {kategoriList.map((k) => (
            <SelectItem key={k} value={k}>
              {k}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
