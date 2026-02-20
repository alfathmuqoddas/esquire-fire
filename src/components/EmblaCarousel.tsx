// EmblaCarousel.tsx

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./EmblaCarousel.css";

type PropType = {
  slides: string[] | number[];
  options?: any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onInit = useCallback((api: any) => {
    setScrollSnaps(api?.scrollSnapList() || []);
  }, []);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="embla relative">
      <div
        className="embla__viewport overflow-hidden rounded-lg"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {slides.map((src, index) => (
            <div className="embla__slide shrink-0 min-w-0" key={index}>
              <img
                src={`https://picsum.photos/seed/${src}/480/270`}
                alt={`Slide ${index + 1}`}
                className="embla__slide__img block w-full h-full object-cover"
                loading={`${index === 0 ? "eager" : "lazy"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Arrows - left & right */}
      <button
        className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        className="embla__next absolute right-4 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Overlay Dots - bottom center */}
      <div className="embla__dots hidden absolute bottom-6 left-0 right-0 md:flex justify-center gap-2 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`embla__dot w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "embla__dot--selected bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
