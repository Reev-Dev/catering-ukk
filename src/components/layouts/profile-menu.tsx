"use client";

import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { toast } from "sonner";

type ProfileMenuProps = {
  name: string;
  email?: string;
  image?: string | null;
  role?: string;
};

export function ProfileMenu({ name, email, image, role }: ProfileMenuProps) {
  const initial =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-48">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image || undefined} alt={name || ""} />
            <AvatarFallback className="rounded-full bg-primary text-secondary">
              {initial}
            </AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left leading-tight">
            <span className="text-sm truncate font-medium">
              {role === "Pelanggan" ? name : `${name} (${role})`}
            </span>
            <span className="text-xs truncate text-muted-foreground">
              {email}
            </span>
          </div>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a href="/profile">Profil</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/pesanan-saya">Pesanan Saya</a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            signOut({ callbackUrl: "/" });
            toast.success("Logout berhasil", {
              description: "Silahkan login kembali.",
            });
          }}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
