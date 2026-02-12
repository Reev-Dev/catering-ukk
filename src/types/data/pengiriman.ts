export type Pengiriman = {
  id: string;
  tgl_kirim: string;
  tgl_tiba?: string;
  status_kirim: "SedangDikirim" | "TibaDiTujuan";
  bukti_foto?: string;
  id_pesan: string;
  id_user: string;
};
