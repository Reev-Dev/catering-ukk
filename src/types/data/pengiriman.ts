import { Pemesanan } from "./pemesanan";
import { User } from "./user";

export type Pengiriman = {
  id: string;
  tgl_kirim: string;
  tgl_tiba?: string | null;
  status_kirim: "SedangDikirim" | "TibaDiTujuan";
  bukti_foto?: string;
  id_pesan: string;
  id_user: string;
  user: User;
  pemesanan: Pemesanan;
};
