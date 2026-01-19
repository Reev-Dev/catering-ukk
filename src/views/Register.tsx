"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_pelanggan: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/home",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Catering-in</CardTitle>
          <CardDescription>Register your account here</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name">Fullname</Label>
                  <Input id="name" name="name" placeholder="Fullname" />
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" type="email" placeholder="Email" />
                  <div className="relative">
                    <Label htmlFor="password" className="mb-3">
                      Password
                    </Label>
                    <Input
                      name="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="Password"
                      className="pr-9"
                      value={password}
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
                    <Label htmlFor="confirmation-password" className="mb-3">
                      Confirmation Password
                    </Label>
                    <Input
                      name="confirmation-password"
                      type={isConfirmVisible ? "text" : "password"}
                      placeholder="Confirmation Password"
                      className={passwordError ? "pr-9 border-red-500" : "pr-9"}
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
                <Field>
                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading || !!passwordError}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
