"use client";

import GalleryUpload from "@/components/gallery-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JENIS_PAKET, KATEGORI_PAKET } from "@/constants/paket-enum";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useRouter, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

export default function EditPaketPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<FileWithPreview[]>([]);
  const [form, setForm] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [jenis, setJenis] = useState("");
  const [kategori, setKategori] = useState("");

  useEffect(() => {
    fetch(`/api/paket/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setJenis(data.jenis);
        setKategori(data.kategori);
      })
      .catch(() => toast.error("Gagal mengambil data"));
  }, [params.id]);

  function mapOldImages(form: any) {
    const images = [];

    if (form.foto1)
      images.push({
        id: "old-1",
        name: "foto1",
        size: 0,
        type: "image/jpeg",
        url: form.foto1,
      });

    if (form.foto2)
      images.push({
        id: "old-2",
        name: "foto2",
        size: 0,
        type: "image/jpeg",
        url: form.foto2,
      });

    if (form.foto3)
      images.push({
        id: "old-3",
        name: "foto3",
        size: 0,
        type: "image/jpeg",
        url: form.foto3,
      });

    return images;
  }

  const handleFilesChange = useCallback((files: FileWithPreview[]) => {
    setGalleryFiles(files);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);

    formData.set("jenis", jenis);
    formData.set("kategori", kategori);

    const keptOldImages = galleryFiles
      .filter((f) => !(f.file instanceof File))
      .map((f) => (f.file as any).url);

    formData.append("keptImages", JSON.stringify(keptOldImages));

    galleryFiles.forEach((f, i) => {
      if (f.file instanceof File) {
        formData.append(`newImages`, f.file);
      }
    });

    try {
      const res = await fetch(`/api/paket/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw data;

      toast.success("Paket berhasil diupdate");
      router.push("/dashboard/paket");
    } catch (err: any) {
      if (err?.fields) {
        setErrors(err.fields);
      }
      toast.error(err?.message || "Gagal update paket");
    } finally {
      setLoading(false);
    }
  }

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex w-full text-xl font-semibold justify-between">
          <h1 className="ml-2 mt-auto">Edit Data Paket</h1>
          <div className="flex gap-2 pb-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => router.back()}
            >
              <span>Discard</span>
            </Button>
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-2 items-center">
            <Card className="w-full mb-2">
              <CardContent>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Detail Paket</FieldLegend>
                    <FieldSeparator />
                    <FieldGroup>
                      <Field>
                        <FieldLabel
                          htmlFor="nama_paket"
                          className="-mb-2 font-normal text-sm block"
                        >
                          Nama Paket
                        </FieldLabel>
                        <Input
                          name="nama_paket"
                          defaultValue={form.nama_paket}
                          placeholder="Masukkan nama paket"
                          className={errors.nama_paket ? "border-red-500" : ""}
                        />
                        {errors.nama_paket && (
                          <p className="text-xs text-red-500 -mt-2">
                            {errors.nama_paket}
                          </p>
                        )}
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel
                            htmlFor="jenis"
                            className="-mb-2 font-normal text-sm block"
                          >
                            Jenis
                          </FieldLabel>
                          <Select
                            name="jenis"
                            defaultValue={form.jenis}
                            onValueChange={setJenis}
                          >
                            <SelectTrigger
                              size="sm"
                              className={errors.jenis ? "border-red-500" : ""}
                            >
                              <SelectValue placeholder="Pilih jenis" />
                            </SelectTrigger>
                            <SelectContent>
                              {JENIS_PAKET.map((j) => (
                                <SelectItem key={j} value={j}>
                                  {j}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <FieldLabel
                            htmlFor="kategori"
                            className="-mb-2 font-normal text-sm block"
                          >
                            Kategori
                          </FieldLabel>
                          <Select
                            name="kategori"
                            defaultValue={form.kategori}
                            onValueChange={setKategori}
                          >
                            <SelectTrigger
                              size="sm"
                              className={
                                errors.kategori ? "border-red-500" : ""
                              }
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {KATEGORI_PAKET.map((k) => (
                                <SelectItem key={k} value={k}>
                                  {k.replace(/([A-Z])/g, " $1").trim()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel
                          htmlFor="deskripsi"
                          className="-mb-2 font-normal text-sm block"
                        >
                          Deskripsi
                        </FieldLabel>
                        <Textarea
                          name="deskripsi"
                          placeholder="Tambahkan deskripsi paket"
                          defaultValue={form.deskripsi}
                          className="resize-none"
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </CardContent>
            </Card>

            <GalleryUpload
              maxFiles={3}
              multiple
              initialFiles={mapOldImages(form)}
              onFilesChange={handleFilesChange}
            />
          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <Card className="w-auto mb-2">
              <CardContent>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Jumlah dan Harga</FieldLegend>
                    <FieldSeparator />
                    <FieldGroup>
                      <Field>
                        <FieldLabel
                          htmlFor="jumlah_pax"
                          className="-mb-2 font-normal text-sm block"
                        >
                          Jumlah Pax
                        </FieldLabel>
                        <Input
                          name="jumlah_pax"
                          type="number"
                          placeholder="Masukkan jumlah pax"
                          defaultValue={form.jumlah_pax}
                          className={errors.jumlah_pax ? "border-red-500" : ""}
                        />
                        {errors.jumlah_pax && (
                          <p className="text-xs text-red-500 -mt-2">
                            {errors.jumlah_pax}
                          </p>
                        )}
                      </Field>
                      <Field>
                        <FieldLabel
                          htmlFor="harga_paket"
                          className="-mb-2 font-normal text-sm block"
                        >
                          Harga Paket
                        </FieldLabel>
                        <Input
                          name="harga_paket"
                          type="number"
                          placeholder="Masukkan harga paket"
                          defaultValue={form.harga_paket}
                          className={errors.harga_paket ? "border-red-500" : ""}
                        />
                        {errors.harga_paket && (
                          <p className="text-xs text-red-500 -mt-2">
                            {errors.harga_paket}
                          </p>
                        )}
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
