import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  Truck,
  ClipboardCopy,
  ChartColumn,
  BookUser,
} from "lucide-react";
import { MenuGroup } from "@/types/menu";

export function getMenuByRole(role?: string): MenuGroup[] {
  if (role === "Kurir") {
    // KURIR
    return [
      {
        label: "Main Menu",
        items: [
          {
            title: "Dashboard Kurir",
            url: "/dashboard/kurir",
            icon: Truck,
          },
        ],
      },
    ];
  } else if (role === "Owner") {
    // OWNER
    return [
      {
        label: "Main Menu",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard/owner",
            icon: LayoutDashboard,
          },
          {
            title: "Laporan Penjualan",
            url: "/dashboard/owner/laporan-penjualan",
            icon: ClipboardCopy,
          },
          {
            title: "Monitoring Pesanan",
            url: "/dashboard/owner/pemesanan",
            icon: ChartColumn,
          },
        ],
      },
      {
        label: "User Management",
        items: [
          {
            title: "Manajemen User",
            url: "/dashboard/owner/user",
            icon: Users,
          },
          {
            title: "Manajemen Pelanggan",
            url: "/dashboard/owner/pelanggan",
            icon: BookUser,
          },
        ],
      },
    ];
  } else if (role === "Admin") {
    // ADMIN
    return [
      {
        label: "Main Menu",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
          },
          {
            title: "Pemesanan",
            url: "/dashboard/admin/pemesanan",
            icon: ClipboardCopy,
          },
        ],
      },
      {
        label: "Master Data",
        items: [
          {
            title: "Paket",
            url: "/dashboard/admin/paket",
            icon: Package,
          },
          {
            title: "Jenis Pembayaran",
            url: "/dashboard/admin/jenis-pembayaran",
            icon: CreditCard,
          },
        ],
      },
      {
        label: "Manajemen User",
        items: [
          {
            title: "Kurir",
            url: "/dashboard/admin/kurir",
            icon: Truck,
          },
          {
            title: "Pelanggan",
            url: "/dashboard/admin/user",
            icon: Users,
          },
        ],
      },
    ];
  }

  return [];
}
