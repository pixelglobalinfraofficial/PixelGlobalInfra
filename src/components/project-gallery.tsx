"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { ProjectImage } from "@/lib/supabase/types";

const HERO_IMAGE_CLASS = "h-[70vh] min-h-[500px] w-full object-cover";

/**
 * The hero on a project's page. A single photo renders statically; more than
 * one becomes a swipeable/arrow-navigable slideshow, cover photo first.
 */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    const only = images[0];
    return (
      <Image
        src={only.image_url}
        alt={only.alt_text}
        width={1920}
        height={1280}
        priority
        sizes="100vw"
        className={HERO_IMAGE_CLASS}
      />
    );
  }

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent className="ml-0">
        {images.map((image, index) => (
          <CarouselItem key={image.id} className="pl-0">
            <Image
              src={image.image_url}
              alt={image.alt_text}
              width={1920}
              height={1280}
              priority={index === 0}
              sizes="100vw"
              className={HERO_IMAGE_CLASS}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="border-none bg-black/30 text-white hover:bg-black/50 left-4" />
      <CarouselNext className="border-none bg-black/30 text-white hover:bg-black/50 right-4" />

      <div className="absolute top-4 right-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white">
        {current + 1} / {images.length}
      </div>
    </Carousel>
  );
}
