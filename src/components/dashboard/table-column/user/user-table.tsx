"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { User } from "@/types/data/user";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { userColumns } from "./user-column";
import UserAddDialog from "./user-add-dialog";
import { useRouter } from "next/navigation";

export default function UserTable({ initialData }: { initialData: User[] }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/super-user/register`, {
      cache: "no-store",
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Manajemen User</h1>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusIcon />
          Add
        </Button>
      </div>
      <DataTable
        data={data}
        loading={loading}
        columns={userColumns(fetchData)}
      />

      <UserAddDialog open={open} onOpenChange={setOpen} onSuccess={fetchData} />
    </div>
  );
}
