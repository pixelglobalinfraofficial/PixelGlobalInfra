"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CEO_NAME = "Er. O. P. Sharma";
const CEO_TITLE = "Founder & Chairman";

/** Other ventures he founded and continues to lead alongside Pixel Globalinfra. */
const VENTURES = [
  "Pixel Globalinfra Pvt. Ltd.",
  "Pixel Films Production",
  "Mohini Foundation",
  "Vishwadev Vaidik Peeth Namishisharayan",
];

const JOURNEY = [
  "Er. O. P. Sharma is a seasoned entrepreneur, visionary business leader and real estate professional with a strong foundation in engineering and more than three decades of diverse professional and entrepreneurial experience.",
  "An engineering graduate from MNIT Allahabad, Er. Sharma began his professional journey with leading organisations including Siemens, TATA and Eureka Forbes Ltd., where he handled various key positions and gained extensive experience in corporate management, business operations, leadership and strategic decision-making.",
  "Driven by a strong entrepreneurial vision and a passion for creating meaningful opportunities in the real estate sector, he embarked on his entrepreneurial journey in April 2013 with the establishment of Pixel Globalinfra Pvt. Ltd., a Lucknow-based real estate company.",
  "Under his leadership, Pixel Globalinfra has evolved with a clear focus on quality, trust, transparency and customer-centric development. His professional approach combines corporate discipline with entrepreneurial vision, enabling the organisation to identify emerging opportunities and create value for customers and investors.",
  "With his experience across engineering, corporate leadership and real estate entrepreneurship, Er. O. P. Sharma continues to lead Pixel Globalinfra with a vision of building a strong, credible and future-ready real estate brand, contributing to the growth and development of Lucknow and the wider Uttar Pradesh region.",
];

const PHILOSOPHY =
  "Experience creates insight, vision creates direction, and integrity creates lasting success.";

export function CeoSection({ photos }: { photos: string[] }) {
  return (
    <section className="bg-cream px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div className="border-gold/40 border p-3">
          <div className="border-emerald-deep/10 relative aspect-[4/5] overflow-hidden border">
            {photos.length > 1 ? (
              <Carousel className="h-full w-full">
                <CarouselContent className="h-full">
                  {photos.map((src, i) => (
                    <CarouselItem key={src} className="relative h-full">
                      <Image
                        src={src}
                        alt={`Founder & CEO — photo ${i + 1}`}
                        fill
                        sizes="(min-width: 768px) 40vw, 90vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>
            ) : photos[0] ? (
              <Image
                src={photos[0]}
                alt="Founder & CEO"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="bg-muted text-emerald-deep/40 flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="font-heading text-emerald-deep/25 text-5xl">
                  CEO
                </span>
                <p className="text-xs leading-relaxed">
                  Add the founder&apos;s photo at{" "}
                  <code className="text-emerald-deep/60">
                    public/images/ceo-1.jpg
                  </code>{" "}
                  (or ceo-2.jpg, ceo-3.jpg… for a slideshow) to replace this
                  placeholder.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-gold mb-4 text-[10px] font-bold tracking-[0.3em] uppercase">
            Leadership
          </p>
          <h2 className="font-heading text-emerald-deep text-4xl md:text-5xl">
            The founder&apos;s <span className="italic">journey</span>
          </h2>
          <p className="text-emerald-deep mt-6 text-lg font-semibold">
            {CEO_NAME}
          </p>
          <p className="text-emerald-deep/60 text-[11px] tracking-[0.2em] uppercase">
            {CEO_TITLE}
          </p>

          <ul className="text-emerald-deep/50 mt-4 flex flex-wrap gap-x-2 gap-y-1 text-[11px] tracking-[0.05em]">
            {VENTURES.map((venture, i) => (
              <li key={venture}>
                {venture}
                {i < VENTURES.length - 1 && (
                  <span className="text-gold/60 ml-2">·</span>
                )}
              </li>
            ))}
          </ul>

          <div className="text-emerald-deep/75 mt-8 space-y-5 leading-relaxed">
            {JOURNEY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="border-emerald-deep/15 mt-10 border-t pt-8">
            <p className="text-gold mb-3 text-[10px] font-bold tracking-[0.3em] uppercase">
              Leadership Philosophy
            </p>
            <blockquote className="text-emerald-deep/85 leading-relaxed italic">
              <span aria-hidden="true" className="font-heading text-gold mr-1 text-3xl">
                &ldquo;
              </span>
              {PHILOSOPHY}
            </blockquote>
          </div>

          <div className="mt-10">
            <p className="text-emerald-deep text-sm font-semibold">
              {CEO_NAME} (CMD)
            </p>
            <p className="text-emerald-deep/60 text-sm">
              Pixel Globalinfra Pvt. Ltd.
            </p>
            <p className="text-emerald-deep/60 text-sm">
              Lucknow, Uttar Pradesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
