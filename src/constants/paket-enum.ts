export const JENIS_PAKET = ["Prasmanan", "Box"] as const;

export const KATEGORI_PAKET = [
  "Pernikahan",
  "Selamatan",
  "UlangTahun",
  "StudyTour",
  "Rapat",
] as const;

export type JenisPaket = (typeof JENIS_PAKET)[number];
export type KategoriPaket = (typeof KATEGORI_PAKET)[number];
