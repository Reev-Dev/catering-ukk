"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="text-center">
      <p className="text-base font-semibold ">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button
          onClick={() => router.back()}
          className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
