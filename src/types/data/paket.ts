export type Paket = {
  id: string;
  nama_paket: string;
  deskripsi?: string;
  jenis: "Prasmanan" | "Box";
  kategori: string;
  jumlah_pax: number;
  harga_paket: number;
  foto1?: string;
  foto2?: string;
  foto3?: string;
};
