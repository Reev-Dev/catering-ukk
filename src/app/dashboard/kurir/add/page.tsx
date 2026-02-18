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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddKurirPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  function handleConfirmPasswordChange(value: string) {
    setConfirmPassword(value);

    if (password && value !== password) {
      setPasswordError("Confirmation password must match with password");
    } else {
      setPasswordError(null);
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/kurir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw data;
      }

      toast.success("Kurir berhasil ditambahkan");
      router.push("/dashboard/kurir");
    } catch (err: any) {
      if (err?.fields) {
        setErrors(err.fields);
      }
      toast.error(err?.message || "Gagal menambah kurir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <div className="flex w-full text-xl font-semibold justify-between">
        <h1 className="ml-2 mt-auto">Tambah Kurir</h1>
        <div className="flex gap-2 pb-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
          >
            <span>Discard</span>
          </Button>
          <Button type="submit" size="sm" disabled={loading || !!passwordError}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex max-w-2xl w-full items-center justify-center">
          <Card className="w-full mb-2">
            <CardContent>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Detail Kurir</FieldLegend>
                  <FieldSeparator />
                  <FieldGroup>
                    <Field>
                      <FieldLabel
                        htmlFor="name"
                        className="-mb-2 font-normal text-sm block"
                      >
                        Nama Kurir
                      </FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Masukkan nama kurir"
                      />
                      <FieldLabel
                        htmlFor="email"
                        className="-mb-2 font-normal text-sm block"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Masukkan email kurir"
                        type="email"
                      />
                      <div className="relative">
                        <FieldLabel
                          htmlFor="password"
                          className="mb-1 font-normal text-sm block"
                        >
                          Password
                        </FieldLabel>
                        <Input
                          id="password"
                          name="password"
                          placeholder="Masukkan password"
                          type={isVisible ? "text" : "password"}
                          value={password}
                          className="pr-9"
                          onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsVisible(!isVisible)}
                          className="text-muted-foreground focus-visible:ring-ring/50 absolute right-0 rounded-l-none hover:bg-transparent"
                        >
                          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </Button>
                      </div>
                      <div className="relative">
                        <FieldLabel
                          htmlFor="confirmation-password"
                          className="mb-3"
                        >
                          Confirmation Password
                        </FieldLabel>
                        <Input
                          name="confirmation-password"
                          type={isConfirmVisible ? "text" : "password"}
                          placeholder="Confirmation Password"
                          className={
                            passwordError ? "pr-9 border-red-500" : "pr-9"
                          }
                          value={confirmPassword}
                          onChange={(e) =>
                            handleConfirmPasswordChange(e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                          className="text-muted-foreground focus-visible:ring-ring/50 absolute right-0 rounded-l-none hover:bg-transparent"
                        >
                          {isConfirmVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </Button>
                        {passwordError && (
                          <p className="text-sm text-red-500 mt-1">
                            {passwordError}
                          </p>
                        )}
                      </div>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
