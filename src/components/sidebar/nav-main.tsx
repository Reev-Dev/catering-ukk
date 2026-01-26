"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { MenuGroup } from "@/types/menu";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function NavMain({ groups }: { groups: MenuGroup[] }) {
  const pathname = usePathname();

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => {
              const isActive =
                item.url === "/dashboard"
                  ? pathname === item.url
                  : pathname.startsWith(item.url ?? "");

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={clsx(
                      "transition-colors",
                      isActive && "font-semibold"
                    )}
                  >
                    <Link
                      href={item.url ?? "#"}
                      className={clsx(
                        "flex items-center gap-2",
                        isActive &&
                          "text-primary bg-primary/10 rounded-md"
                      )}
                    >
                      {item.icon && (
                        <item.icon
                          className={clsx(
                            "h-4 w-4",
                            isActive && "stroke-[2.5]"
                          )}
                        />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
