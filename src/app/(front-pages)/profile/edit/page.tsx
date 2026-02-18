"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  getProfileById,
  getAlamatByUserId,
  updateProfile,
} from "@/app/actions/profile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/image-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { DatePicker } from "@/components/date-picker";
import { Spinner } from "@/components/ui/spinner";
import { Alamat, Profile } from "@/types/data/profile";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [alamat, setAlamat] = useState<Alamat | null>(null);

  const [tglLahir, setTglLahir] = useState<Date | undefined>(undefined);
  const [foto, setFoto] = useState<FileWithPreview | null>(null);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || hasFetched) return;

    async function fetchData() {
      try {
        setLoading(true);

        const userId = BigInt(session!.user.id);

        const profileData = await getProfileById(userId);
        const alamatData = await getAlamatByUserId(userId);

        const parsedProfile = profileData as unknown as Profile;

        setProfile(parsedProfile);
        setAlamat(alamatData as Alamat);

        if (parsedProfile?.tgl_lahir) {
          setTglLahir(new Date(parsedProfile.tgl_lahir));
        }

        setHasFetched(true);
      } catch (err) {
        toast.error("Gagal mengambil data profil");
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

    if (foto?.file instanceof File) {
      formData.append("foto", foto.file);
    }

    await updateProfile(formData);
    await update();

    toast.success("Profil berhasil diperbarui");
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
          <CardTitle>Edit Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex gap-4">
              <ImageUpload
                label=""
                shape="square"
                size={160}
                value={profile?.foto ?? null}
                description="Klik untuk mengganti profil"
                onChange={setFoto}
              />

              <div className="flex flex-col w-full space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {/* NAMA PELANGGAN */}
                  <div className="flex flex-col">
                    <Label htmlFor="nama_pelanggan" className="mb-2">
                      Nama
                    </Label>
                    <Input
                      id="nama_pelanggan"
                      name="nama_pelanggan"
                      placeholder="Nama"
                      defaultValue={profile?.nama_pelanggan ?? ""}
                      disabled={loading}
                      className={errors.nama_pelanggan && "border-red-500"}
                    />
                    {errors.nama_pelanggan && (
                      <p className="text-xs text-red-500">
                        {errors.nama_pelanggan}
                      </p>
                    )}
                  </div>

                  {/* NIK */}
                  <div className="flex flex-col">
                    <Label htmlFor="kartu_id" className="mb-2">
                      No. Kartu (NIK)
                    </Label>
                    <Input
                      id="kartu_id"
                      name="kartu_id"
                      
                      placeholder="No. Kartu (NIK)"
                      defaultValue={profile?.kartu_id ?? ""}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    {/* TGL LAHIR */}
                    <DatePicker
                      name="tgl_lahir"
                      label="Tanggal Lahir"
                      value={tglLahir}
                      onChange={setTglLahir}
                    />
                  </div>

                  <div className="flex flex-col">
                    {/* TELEPON */}
                    <Label htmlFor="telepon" className="mb-2">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="telepon"
                      name="telepon"
                      placeholder="Telepon"
                      defaultValue={profile?.telepon ?? ""}
                      disabled={loading}
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
