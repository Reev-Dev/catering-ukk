"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  getProfileById,
  getAlamatByUserId,
  updateProfile,
  updateAlamat,
} from "@/app/actions/profile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/image-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { DatePicker } from "@/components/date-picker";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

type Alamat = {
  alamat1?: string;
  alamat2?: string;
  alamat3?: string;
};

export default function EditProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [alamat, setAlamat] = useState<Alamat | null>(null);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || hasFetched) return;

    async function fetchData() {
      try {
        setLoading(true);

        const userId = BigInt(session!.user.id);

        const alamatData = await getAlamatByUserId(userId);
        setAlamat(alamatData as Alamat);

        setHasFetched(true);
      } catch (err) {
        toast.error("Gagal mengambil data alamat");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session, hasFetched]);

  const { update } = useSession();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await updateAlamat(formData);
    await update();

    toast.success("Alamat berhasil diperbarui");
    router.push("/profile");
    router.refresh();
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Card className="gap-3">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Edit Alamat</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex gap-4">
              <div className="flex flex-col w-full space-y-3">
                <div className="grid gap-4">
                  {/* ALAMAT 1 */}
                  <div className="grid">
                    <Label htmlFor="alamat1" className="mb-2">
                      Alamat 1
                    </Label>
                    <Textarea
                      id="alamat1"
                      name="alamat1"
                      placeholder="Alamat 1"
                      defaultValue={alamat?.alamat1 ?? ""}
                      disabled={loading}
                      className="resize-none"
                    />
                  </div>

                  {/* Alamat 2 */}
                  <div className="grid">
                    <Label htmlFor="alamat2" className="mb-2">
                      Alamat 2
                    </Label>
                    <Textarea
                      id="alamat2"
                      name="alamat2"
                      placeholder="Alamat 2"
                      defaultValue={alamat?.alamat2 ?? ""}
                      disabled={loading}
                      className="resize-none"
                    />
                  </div>

                  {/* Alamat 3 */}
                  <div className="grid">
                    <Label htmlFor="alamat3" className="mb-2">
                      Alamat 3
                    </Label>
                    <Textarea
                      id="alamat3"
                      name="alamat3"
                      placeholder="Alamat 3"
                      defaultValue={alamat?.alamat3 ?? ""}
                      disabled={loading}
                      className="resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-auto gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Batal
                  </Button>
                  <Button type="submit">Simpan</Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
