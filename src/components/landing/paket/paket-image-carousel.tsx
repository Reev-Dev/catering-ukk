"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function PaketImageCarousel({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex gap-4">
      {/* BIG IMAGE */}
      <div className="relative w-100">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  src={src}
                  alt={`paket-${index}`}
                  width={400}
                  height={400}
                  className="aspect-square w-full rounded-xs object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* ARROWS */}
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* THUMBNAILS */}
      <div className="flex flex-col gap-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "overflow-hidden rounded-xs border transition",
              current === index
                ? "border-primary"
                : "border-muted opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={src}
              alt={`thumb-${index}`}
              width={80}
              height={80}
              className="aspect-square object-cover "
            />
          </button>
        ))}
      </div>
    </div>
  );
}
