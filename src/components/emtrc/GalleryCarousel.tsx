import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { SafeImage } from '../SafeImage';

export interface GallerySlide {
  src: string;
  alt: string;
  caption?: string;
  tag?: string;
}

interface GalleryCarouselProps {
  slides: readonly GallerySlide[];
  title?: string;
  aspect?: '16/9' | '16/10' | '4/3';
  darkSurface?: boolean;
  className?: string;
}

const SLIDE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SWIPE_CONFIDENCE_THRESHOLD = 4500;

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

/**
 * Editorial swipeable media gallery built with Framer Motion drag gestures,
 * directional slide transitions, keyboard navigation, and interactive filmstrip thumbnails.
 */
export function GalleryCarousel({
  slides,
  title,
  aspect = '16/10',
  darkSurface = false,
  className = '',
}: GalleryCarouselProps) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const prefersReduced = useReducedMotion();

  const total = slides.length;

  const paginate = useCallback(
    (delta: number) => {
      if (total <= 1) return;
      setPage(([prev]) => [(prev + delta + total) % total, delta]);
    },
    [total]
  );

  const jumpTo = useCallback(
    (targetIdx: number) => {
      if (targetIdx === index || targetIdx < 0 || targetIdx >= total) return;
      setPage([targetIdx, targetIdx > index ? 1 : -1]);
    },
    [index, total]
  );

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const power = swipePower(info.offset.x, info.velocity.x);
    if (power < -SWIPE_CONFIDENCE_THRESHOLD || info.offset.x < -60) {
      paginate(1);
    } else if (power > SWIPE_CONFIDENCE_THRESHOLD || info.offset.x > 60) {
      paginate(-1);
    }
  };

  if (total === 0) return null;

  const current = slides[index] ?? slides[0];
  const aspectClass =
    aspect === '16/9'
      ? 'aspect-[16/9]'
      : aspect === '4/3'
        ? 'aspect-[4/3]'
        : 'aspect-[16/10]';

  const containerTone = darkSurface
    ? 'border-white/12 bg-[#0F1219] text-white'
    : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]';

  const captionBorder = darkSurface ? 'border-white/10' : 'border-[var(--emtrc-border)]';
  const mutedText = darkSurface ? 'text-[#9BA3B5]' : 'text-[var(--emtrc-muted)]';

  return (
    <div
      data-testid="gallery-carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') paginate(1);
        if (e.key === 'ArrowLeft') paginate(-1);
      }}
      aria-roledescription="carousel"
      aria-label={title ?? 'Photo gallery'}
      className={`group/carousel overflow-hidden rounded-2xl border shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--emtrc-accent)] ${containerTone} ${className}`}
    >
      {/* Top editorial bar */}
      <div className={`flex items-center justify-between gap-3 border-b px-4 py-2.5 ${captionBorder}`}>
        <div className="flex items-center gap-2 min-w-0">
          <Images className="h-3.5 w-3.5 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
          <span className="truncate font-mono-data text-[11px] font-semibold uppercase tracking-[0.12em]">
            {title ?? current.tag ?? 'London Field Photography'}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`font-mono-data text-[11px] tabular-nums ${mutedText}`}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {total > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous gallery photo"
                data-testid="carousel-prev-btn"
                onClick={() => paginate(-1)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-current/15 transition-colors hover:border-[var(--emtrc-accent)] hover:text-[var(--emtrc-accent)]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next gallery photo"
                data-testid="carousel-next-btn"
                onClick={() => paginate(1)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-current/15 transition-colors hover:border-[var(--emtrc-accent)] hover:text-[var(--emtrc-accent)]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Swipeable Viewport */}
      <div className={`relative w-full overflow-hidden bg-[#08090C] ${aspectClass} select-none`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`${current.src}-${index}`}
            custom={direction}
            variants={
              prefersReduced
                ? {
                    enter: { opacity: 0 },
                    center: { opacity: 1 },
                    exit: { opacity: 0 },
                  }
                : {
                    enter: (dir: number) => ({
                      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
                      opacity: 0.4,
                      scale: 1.03,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir < 0 ? '100%' : '-100%',
                      opacity: 0.3,
                      scale: 0.98,
                    }),
                  }
            }
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: SLIDE_EASE }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <SafeImage
              src={current.src}
              alt={current.alt}
              width={1280}
              height={800}
              priority={index === 0}
              className="pointer-events-none h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090C]/75 via-transparent to-[#08090C]/15"
            />
            {current.tag && (
              <span className="pointer-events-none absolute bottom-3 left-4 font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[#FF9D85]">
                {current.tag}
              </span>
            )}
            <span className="pointer-events-none absolute right-4 bottom-3 hidden font-mono-data text-[10px] text-white/75 sm:inline">
              Drag or swipe
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Side Floating Controls on Hover */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => paginate(-1)}
              className="absolute top-1/2 left-3 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[var(--emtrc-accent)]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => paginate(1)}
              className="absolute top-1/2 right-3 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[var(--emtrc-accent)]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Caption + Interactive Filmstrip Thumbnails */}
      <div className={`border-t px-4 py-3.5 ${captionBorder}`}>
        <p data-testid="carousel-active-caption" className={`text-xs leading-relaxed sm:text-sm ${mutedText}`}>
          {current.caption ?? current.alt}
        </p>

        {total > 1 && (
          <div
            role="tablist"
            aria-label="Choose gallery photograph"
            className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-4"
          >
            {slides.map((slide, idx) => {
              const active = idx === index;
              return (
                <button
                  key={`${slide.src}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`View photo ${idx + 1}: ${slide.alt}`}
                  data-testid={`carousel-thumb-${idx}`}
                  onClick={() => jumpTo(idx)}
                  className={`relative overflow-hidden rounded-lg border transition-all ${
                    active
                      ? 'border-[var(--emtrc-accent)] ring-2 ring-[var(--emtrc-accent)]/35 opacity-100'
                      : 'border-current/15 opacity-60 hover:opacity-95'
                  }`}
                >
                  <SafeImage
                    src={slide.src}
                    alt={slide.alt}
                    width={320}
                    height={200}
                    className="h-12 w-full object-cover sm:h-14"
                  />
                  {active && (
                    <motion.span
                      layoutId="carousel-thumb-active-bar"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute right-0 bottom-0 left-0 h-[3px] bg-[var(--emtrc-accent)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
