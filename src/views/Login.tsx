"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email atau password salah");
      return;
    }

    const session = await getSession();

    if (session?.user.role === "Pelanggan") {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Catering-in</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
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
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <a
                  href="/register"
                  className="text-sm text-center hover:underline"
                >
                  Don't have an account? Register
                </a>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
