import { Pemesanan } from "./pemesanan";

export type Pelanggan = {
  id: string;
  nama_pelanggan: string;
  email: string;
  tgl_lahir?: string;
  telepon?: string;
  kartu_id?: string;
  foto?: string;
  alamat1?: string;
  alamat2?: string;
  alamat3?: string;
  pemesanans: Pemesanan[];
};
