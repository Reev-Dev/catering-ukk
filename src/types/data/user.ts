import { Pengiriman } from "./pengiriman";

export type User = {
  id: string;
  name: string;
  email: string;
  level: "Admin" | "Owner" | "Kurir";
  pengirimans?: Pengiriman[];
};
