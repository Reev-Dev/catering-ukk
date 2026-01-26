import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  Truck,
  UserCog,
} from "lucide-react";
import { MenuGroup } from "@/types/menu";

export function getMenuByRole(role?: string): MenuGroup[] {
  if (role === "Kurir") {
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
  }

  // ADMIN / OWNER
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
      label: "Master Data",
      items: [
        {
          title: "Paket",
          url: "/dashboard/paket",
          icon: Package,
        },
        {
          title: "Jenis Pembayaran",
          url: "/dashboard/pembayaran",
          icon: CreditCard,
        },
      ],
    },
    {
      label: "Human Resource",
      items: [
        {
          title: "Admin & Owner",
          url: "/dashboard/admin",
          icon: UserCog,
        },
        {
          title: "Kurir",
          url: "/dashboard/kurir",
          icon: Truck,
        },
        {
          title: "User",
          url: "/dashboard/user",
          icon: Users,
        },
      ],
    },
  ];
}
