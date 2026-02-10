"use client";

import { TimelineItem } from "@/components/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon } from "lucide-react";
import Link from "next/link";
type ProfileFormuProps = {
  user: any;
};

export function ProfileForm({ user }: ProfileFormuProps) {
  const initial =
    user?.nama_pelanggan
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word: string[]) => word[0].toUpperCase())
      .join("") || "?";

  return (
    <>
      <div className="flex flex-col gap-4">
        <Card className="relative pt-0 pb-3 gap-3">
          <div
            className="relative z-10 w-full h-16 rounded-t-xs"
            style={{
              background:
                "linear-gradient(90deg, #f07a88 10%, #9b8de0 50%, #5bc0eb 90%)",
            }}
          />
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-26 w-26 rounded-xs -mt-12 z-20 border-6 border-white dark:border-zinc-900">
                <AvatarImage
                  src={user.foto || undefined}
                  alt={user.nama_pelanggan || ""}
                />
                <AvatarFallback className="rounded-xs bg-primary text-secondary text-3xl">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="grid">
                <CardTitle className="text-xl font-semibold">
                  {user.nama_pelanggan}
                </CardTitle>
                <CardDescription>Pelanggan</CardDescription>
              </div>
            </div>
            <CardAction className="mt-auto pb-2">
              <Link href="/profile/edit">
                <Button variant="default" className="rounded-xs" size="sm">
                  <EditIcon className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle className="text-xs font-normal opacity-60">
                  ABOUT
                </CardTitle>
                <CardDescription className="flex flex-col gap-1">
                  <h5>
                    <span className="font-medium">Nama: </span>
                    {user.nama_pelanggan}
                  </h5>
                  <h5>
                    <span className="font-medium">Tanggal Lahir: </span>
                    {user.tgl_lahir
                      ? new Date(user.tgl_lahir).toLocaleDateString("id-ID")
                      : "-"}
                  </h5>
                  <h5>
                    <span className="font-medium">No. Telepon: </span>
                    {user.telepon || "-"}
                  </h5>
                  <h5>
                    <span className="font-medium">No. Kartu (NIK): </span>
                    {user.kartu_id || "-"}
                  </h5>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="gap-3">
              <CardFooter className="grid items-center">
                <Button>Reset Password</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-2">
            <Card className="gap-1 rounded-xs">
              <CardHeader>
                <CardTitle className="text-xs font-normal opacity-60">
                  ALAMAT (Maks. 3 Alamat)
                </CardTitle>
                <CardAction className="mt-auto">
                  <Link href="/profile/alamat/edit">
                    <Button variant="default" className="rounded-xs" size="sm">
                      Edit Alamat
                    </Button>
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="relative ml-3">
                  <div className="absolute top-3 bottom-0 left-0 border-l-[1.5px]" />
                  <TimelineItem
                    title="Alamat 1"
                    description={
                      user.alamat1 || (
                        <span className="italic ">Belum ada alamat</span>
                      )
                    }
                  />
                  <TimelineItem
                    title="Alamat 2"
                    description={
                      user.alamat2 || (
                        <span className="italic ">Belum ada alamat</span>
                      )
                    }
                  />
                  <TimelineItem
                    title="Alamat 3"
                    description={
                      user.alamat3 || (
                        <span className="italic ">Belum ada alamat</span>
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
