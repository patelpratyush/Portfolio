"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { featuredProjects } from "@/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function FeaturedProjects() {
  const cardRefs = useRef([]);
  const [carouselApi, setCarouselApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const nodes = cardRefs.current.filter(Boolean);
    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (cancelled) return;
      VanillaTilt.init(nodes, {
        speed: 300,
        glare: true,
        "max-glare": 0.08,
        max: 6,
        perspective: 900,
        scale: 1.01,
      });
    });
    return () => {
      cancelled = true;
      nodes.forEach((n) => n?.vanillaTilt?.destroy());
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <div>
      <span className="font-mono-label text-xs text-[var(--accent)]">Projects</span>
      <h2 className="font-serif-display mt-3 text-3xl italic text-[var(--ink)] text-balance sm:text-4xl">
        Systems built to ship.
      </h2>
      <p className="mt-2 max-w-[50ch] text-sm text-[var(--ink-dim)]">
        A few of the products I&apos;ve built end to end — from ML pipelines to
        production APIs. Here are some of my favorites:
      </p>

      <div className="mt-10">
        <Carousel setApi={setCarouselApi} className="w-full">
          <CarouselContent>
            {featuredProjects.map((project, i) => (
              <CarouselItem key={project.slug} className="md:basis-1/2">
                <a
                  ref={(el) => (cardRefs.current[i] = el)}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block overflow-hidden rounded border border-[var(--line)] bg-[var(--bg-raised)]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="aspect-video h-full w-full object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-0 w-full border-t border-[var(--line)] bg-[var(--bg)]/70 p-4 backdrop-blur">
                    <h3 className="text-sm font-semibold text-[var(--ink)]">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--ink-dim)]">
                      {project.description}
                    </p>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center font-mono-label text-[11px] text-[var(--ink-dim)]">
          <span className="text-[var(--ink)]">{current} / {count}</span> projects
        </div>
      </div>
    </div>
  );
}
