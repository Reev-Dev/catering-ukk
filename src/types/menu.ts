import { LucideIcon } from "lucide-react";

export type MenuItem = {
  title: string;
  url?: string; // optional → kalau ada children, url boleh kosong
  icon?: LucideIcon;
  children?: MenuItem[];
};

export type MenuGroup = {
  label: string;
  items: MenuItem[];
};
