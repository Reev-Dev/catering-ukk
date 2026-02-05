"use client";

import { useEffect, useMemo, useState } from "react";
import { PaketCard } from "./paket-card";
import { PaketFilters } from "./paket-filters";
import { toast } from "sonner";
import { KATEGORI_PAKET } from "@/constants/paket-enum";

export function PaketList() {
  const [pakets, setPakets] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [jenis, setJenis] = useState("all");
  const [kategori, setKategori] = useState("all");

  useEffect(() => {
    fetch("/api/paket")
      .then((res) => res.json())
      .then(setPakets)
      .catch(() => toast.error("Gagal memuat data paket"));
  }, []);

  const filtered = useMemo(() => {
    return pakets.filter((p) => {
      const matchSearch = p.nama_paket
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchJenis = jenis === "all" || p.jenis === jenis;
      const matchKategori = kategori === "all" || p.kategori === kategori;

      return matchSearch && matchJenis && matchKategori;
    });
  }, [pakets, search, jenis, kategori]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Paket</h2>

        <PaketFilters
          search={search}
          setSearch={setSearch}
          jenis={jenis}
          setJenis={setJenis}
          kategori={kategori}
          setKategori={setKategori}
          kategoriList={KATEGORI_PAKET}
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filtered.map((paket) => (
          <PaketCard key={paket.id} paket={paket} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          Paket tidak ditemukan
        </p>
      )}
    </>
  );
}
