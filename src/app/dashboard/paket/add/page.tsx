"use client";

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
import { useRouter } from "next/navigation";

export default function AddPaketPage() {
  const router = useRouter();
  return (
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
          <Button type="submit" size="sm">
            Save
          </Button>
        </div>
      </div>
      <form className="w-full grid grid-cols-3 gap-4">
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
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel
                          htmlFor="jenis"
                          className="-mb-2 font-normal text-sm block"
                        >
                          Jenis
                        </FieldLabel>
                        <Select defaultValue="">
                          <SelectTrigger size="sm" id="jenis">
                            <SelectValue placeholder="Pilih jenis" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Prasmanan">Prasmanan</SelectItem>
                            <SelectItem value="Box">Box</SelectItem>
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
                        <Select defaultValue="">
                          <SelectTrigger size="sm" id="kategori">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pernikahan">
                              Pernikahan
                            </SelectItem>
                            <SelectItem value="Selamatan">Selamatan</SelectItem>
                            <SelectItem value="Ulang Tahun">
                              Ulang Tahun
                            </SelectItem>
                            <SelectItem value="Study Tour">
                              Study Tour
                            </SelectItem>
                            <SelectItem value="Rapat">Rapat</SelectItem>
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
                        id="deskripsi"
                        placeholder="Tambahkan deskripsi paket"
                        className="resize-none"
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </CardContent>
          </Card>
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
                      />
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
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card className="w-auto mb-2">
            <CardContent>
              <FieldGroup>
                <FieldSet>
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
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
