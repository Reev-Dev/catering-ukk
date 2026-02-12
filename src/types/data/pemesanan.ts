import { Paket } from "./paket";
import { Pengiriman } from "./pengiriman";

export type Pemesanan = {
  id: string;
  id_pelanggan: string;
  id_jenis_bayar: string;
  no_resi: string;
  tgl_pesan: string;
  status_pesan:
    | "MenungguKonfirmasi"
    | "SedangDiproses"
    | "MenungguKurir"
    | "PesananSelesai";
  total_bayar: string;
  pengirimans: Pengiriman[];
  detail_pemesanans: DetailPemesanan[];
};

export type DetailPemesanan = {
  id: string;
  id_paket: string;
  id_pemesanan: string;
  subtotal: number;
  paket: Paket;
};
