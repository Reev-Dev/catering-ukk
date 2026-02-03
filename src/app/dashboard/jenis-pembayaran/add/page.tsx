"use client";

import GalleryUpload from "@/components/gallery-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JENIS_PAKET, KATEGORI_PAKET } from "@/constants/paket-enum";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function AddPaketPage() {
  const router = useRouter();
  const [jenis, setJenis] = useState("");
  const [kategori, setKategori] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFilesChange = useCallback((files: FileWithPreview[]) => {
    setImages(
      files
        .map((f) => f.file)
        .filter((file): file is File => file instanceof File),
    );
  }, []);

  async function handleSubmit(form: HTMLFormElement) {
    setLoading(true);
    setErrors({});

    const formData = new FormData(form);

    formData.append("jenis", jenis);
    formData.append("kategori", kategori);

    images.forEach((file, index) => {
      formData.append(`foto${index + 1}`, file);
    });

    try {
      const res = await fetch("/api/paket", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw data;
      }

      toast.success("Paket berhasil ditambahkan");
      router.push("/dashboard/paket");
    } catch (err: any) {
      if (err?.fields) {
        setErrors(err.fields);
      }
      toast.error(err?.message || "Terjadi kesalahan saat menambah paket");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e.currentTarget);
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="flex w-full text-xl font-semibold justify-between">
          <h1 className="ml-2 mt-auto">Tambah Data Paket</h1>
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
              {loading ? "Saving..." : "Save"}
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
                          id="nama_paket"
                          name="nama_paket"
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
                          <Select onValueChange={setJenis}>
                            <SelectTrigger
                              size="sm"
                              className={errors.jenis ? "border-red-500" : ""}
                            >
                              <SelectValue placeholder="Pilih jenis" />
                            </SelectTrigger>
                            <SelectContent>
                              {JENIS_PAKET.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.jenis && (
                            <p className="text-xs text-red-500 -mt-2">
                              {errors.jenis}
                            </p>
                          )}
                        </Field>
                        <Field>
                          <FieldLabel
                            htmlFor="kategori"
                            className="-mb-2 font-normal text-sm block"
                          >
                            Kategori
                          </FieldLabel>
                          <Select onValueChange={setKategori}>
                            <SelectTrigger
                              size="sm"
                              className={
                                errors.kategori ? "border-red-500" : ""
                              }
                            >
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              {KATEGORI_PAKET.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item.replace(/([A-Z])/g, " $1").trim()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.kategori && (
                            <p className="text-xs text-red-500 -mt-2">
                              {errors.kategori}
                            </p>
                          )}
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
                          id="deskripsi"
                          name="deskripsi"
                          placeholder="Tambahkan deskripsi paket"
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
                          id="jumlah_pax"
                          name="jumlah_pax"
                          type="number"
                          placeholder="Masukkan jumlah pax"
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
                          id="harga_paket"
                          name="harga_paket"
                          type="number"
                          placeholder="Masukkan harga paket"
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
