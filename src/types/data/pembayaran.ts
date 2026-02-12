import { Pemesanan } from "./pemesanan";

export type JenisPembayaran = {
  id: string;
  metode_pembayaran: string;
  detail_jenis_pembayarans: DetailJenisPembayaran[];
  pemesanans: Pemesanan[];
};

export type DetailJenisPembayaran = {
  id: string;
  id_jenis_pembayaran: string;
  no_rek?: string;
  tempat_bayar?: string;
  logo: string | null;
};
