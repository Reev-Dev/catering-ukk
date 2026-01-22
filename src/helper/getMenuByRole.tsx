import { LayoutDashboard, Package, Truck } from "lucide-react";

export function getMenuByRole(role?: string) {
  if (role === "Kurir") {
    return [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Pengiriman",
        url: "#",
        icon: Truck,
        items: [{ title: "Pesanan Saya", url: "/dashboard/pengiriman" }],
      },
    ];
  }

  // Admin / Owner
  return [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Master Data",
      url: "#",
      icon: Package,
      items: [
        { title: "Paket", url: "/dashboard/paket" },
        { title: "Jenis Pembayaran", url: "/dashboard/pembayaran" },
        { title: "Pelanggan", url: "/dashboard/pelanggan" },
        { title: "Kurir", url: "/dashboard/kurir" },
      ],
    },
  ];
}
