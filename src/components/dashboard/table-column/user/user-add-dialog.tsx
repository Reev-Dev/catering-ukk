"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEVEL_USER } from "@/constants/level-enum";
import { API_URL } from "@/lib/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserAddDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [level, setLevel] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  async function onSubmit(form: HTMLFormElement) {
    setLoading(true);
    setErrors({});

    const formData = new FormData(form);

    formData.append("level", level);

    try {
      const res = await fetch(`${API_URL}/auth/super-user/register`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      toast.success("User berhasil ditambahkan");

      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      if (err?.fields) {
        setErrors(err.fields);
      }
      toast.error(err?.message || "Gagal menambah user");
    } finally {
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setErrors({});
          setPasswordError(null);
          setPassword("");
          setConfirmPassword("");
        }
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah User</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e.currentTarget);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <Label htmlFor="name" className="mb-2 block">
                  Nama
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Masukkan nama user"
                  className={errors.name && "border-red-500"}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="level" className="mb-2 block">
                  Level
                </Label>
                <Select onValueChange={setLevel}>
                  <SelectTrigger
                    size="sm"
                    className={
                      errors.level ? "w-full border-red-500" : "w-full"
                    }
                  >
                    <SelectValue placeholder="Pilih level user" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVEL_USER.map((lvl) => (
                      <SelectItem key={lvl} value={lvl}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.level && (
                  <p className="text-xs text-red-500">{errors.level}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Masukkan email user"
                className={errors.email && "border-red-500"}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="name" className="mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Masukkan password user"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={errors.password ? "pr-9 border-red-500" : "pr-9"}
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
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="confirmation-password" className="mb-3">
                Konfirmasi Password
              </Label>
              <Input
                name="confirmation-password"
                type={isConfirmVisible ? "text" : "password"}
                placeholder="Confirmation Password"
                className={passwordError ? "pr-9 border-red-500" : "pr-9"}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
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
                <p className="text-xs text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Tambah User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
