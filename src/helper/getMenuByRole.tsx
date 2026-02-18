import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  Truck,
  UserCog,
  ClipboardCopy,
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
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Pesanan Saya",
            url: "/dashboard/pengiriman",
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
            url: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Laporan Penjualan",
            url: "/dashboard/laporan-penjualan",
            icon: CreditCard,
          },
        ],
      },
    ];
  }

  // ADMIN
  return [
    {
      label: "Main Menu",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Manajemen Pemesanan",
      items: [
        {
          title: "Pemesanan",
          url: "/dashboard/pemesanan",
          icon: ClipboardCopy,
        },
      ],
    },
    {
      label: "Master Data",
      items: [
        {
          title: "Paket",
          url: "/dashboard/paket",
          icon: Package,
        },
        {
          title: "Jenis Pembayaran",
          url: "/dashboard/jenis-pembayaran",
          icon: CreditCard,
        },
      ],
    },
    {
      label: "Manajemen User",
      items: [
        {
          title: "User",
          url: "/dashboard/user",
          icon: Users,
        },
        {
          title: "Kurir",
          url: "/dashboard/kurir",
          icon: Truck,
        },
        {
          title: "Admin",
          url: "/dashboard/admin",
          icon: UserCog,
        },
      ],
    },
  ];
}
