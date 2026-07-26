"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { featuredProjects } from "@/data/projects";
import { GridField } from "@/components/grid-field";
import { Reveal } from "@/components/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ProjectCover({ project }) {
  const [errored, setErrored] = useState(false);

  if (project.cover && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- animated GIF, must bypass Next's image optimizer
      <img
        src={project.cover}
        alt={project.title}
        onError={() => setErrored(true)}
        className="aspect-video h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[var(--background)]">
      <GridField />
      <span className="font-serif-display relative text-5xl italic text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--primary)]">
        {project.title.slice(0, 1)}
      </span>
    </div>
  );
}

export function FeaturedProjects() {
  const cardRefs = useRef([]);
  const [carouselApi, setCarouselApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugins = useMemo(() => [WheelGesturesPlugin()], []);

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
      <Reveal>
        <span className="font-mono-label text-xs text-[var(--primary)]">Projects</span>
        <h2 className="font-serif-display mt-3 text-3xl italic text-[var(--foreground)] text-balance sm:text-4xl">
          Systems built to ship.
        </h2>
        <p className="mt-2 max-w-[50ch] text-sm text-[var(--muted-foreground)]">
          A few of the products I&apos;ve built end to end — from ML pipelines to
          production APIs. Here are some of my favorites:
        </p>
      </Reveal>

      <div className="mt-10">
        <Carousel
          setApi={setCarouselApi}
          opts={{ loop: true }}
          plugins={plugins}
          className="w-full"
        >
          <CarouselContent>
            {featuredProjects.map((project, i) => (
              <CarouselItem key={project.slug} className="md:basis-1/2">
                <a
                  ref={(el) => (cardRefs.current[i] = el)}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded border border-[var(--border)] bg-[var(--card)]"
                >
                  <ProjectCover project={project} />
                  <div className="relative w-full border-t border-[var(--border)] bg-[var(--background)] p-4">
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      {project.description}
                    </p>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--card)] hover:text-[var(--primary)]" />
          <CarouselNext className="border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--card)] hover:text-[var(--primary)]" />
        </Carousel>
        <div className="py-2 text-center font-mono-label text-[11px] text-[var(--muted-foreground)]">
          <span className="text-[var(--foreground)]">{current} / {count}</span> projects
        </div>
      </div>
    </div>
  );
}
