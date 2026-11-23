import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import type { GalleryImage } from '../../types/site';
import { getNicheLabels } from '../../utils/niche';
import { SafeImage } from '../SafeImage';
import { Reveal } from '../emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../emtrc/ScrollReveal';

interface GallerySectionProps {
  showFullPageLink?: boolean;
  isStandalonePage?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function GallerySection({
  showFullPageLink = false,
  isStandalonePage = false,
}: GallerySectionProps) {
  const { site, theme, blueprint, activePresetId } = useSite();
  const prefersReduced = useReducedMotion();

  const images: GalleryImage[] =
    blueprint.gallery.length > 0 ? blueprint.gallery : site.gallery;

  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveSlide(0);
    setLightboxIndex(null);
  }, [activePresetId]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + images.length) % images.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

  const labels = getNicheLabels(site.niche);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';
  const useCarousel =
    blueprint.archetype === 'editorial-cinema' || blueprint.archetype === 'atelier-magazine';

  const safeSlide = activeSlide % images.length;
  const currentImg = images[safeSlide];
  const lightboxImage = lightboxIndex !== null ? images[lightboxIndex % images.length] : null;

  const stepSlide = (delta: number) => {
    setDirection(delta);
    setActiveSlide((prev) => (prev + delta + images.length) % images.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) {
      stepSlide(1);
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      stepSlide(-1);
    }
  };

  return (
    <section
      id="gallery"
      className={`border-b border-[var(--site-border)] bg-[var(--site-bg)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                {useCarousel ? 'Interactive Lookbook' : 'Recent Work & Space'}
              </p>
              <HeadingTag
                className={`font-display mt-2 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                  isStandalonePage
                    ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                    : 'text-2xl sm:text-4xl leading-[1.08]'
                }`}
              >
                {labels.galleryHeading}
              </HeadingTag>
            </div>

            <div className="flex items-center gap-4">
              {useCarousel && images.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="font-mono-data mr-1 text-xs tabular-nums text-[var(--site-muted)]">
                    {String(safeSlide + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => stepSlide(-1)}
                    aria-label="Previous photo"
                    className={`inline-flex h-9 w-9 items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepSlide(1)}
                    aria-label="Next photo"
                    className={`inline-flex h-9 w-9 items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}

              {showFullPageLink && site.pages.gallery && (
                <Link
                  to="gallery"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-accent-text)] whitespace-nowrap hover:opacity-80"
                >
                  <span>View gallery</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>
        </Reveal>

        {/* MODE A: SWIPEABLE FRAMER-MOTION LOOKBOOK CAROUSEL (editorial-cinema & atelier-magazine) */}
        {useCarousel ? (
          <div className="mt-8 space-y-4">
            <div
              className={`relative overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={`${activePresetId}-${currentImg.url}-${safeSlide}`}
                    custom={direction}
                    initial={
                      prefersReduced
                        ? false
                        : { opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.99 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={
                      prefersReduced
                        ? undefined
                        : { opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.99 }
                    }
                    transition={{ duration: 0.36, ease: EASE }}
                    drag={prefersReduced ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <SafeImage
                      src={currentImg.url}
                      alt={currentImg.alt}
                      width={currentImg.width}
                      height={currentImg.height}
                      className="h-full w-full object-cover select-none"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setLightboxIndex(safeSlide)}
                  aria-label={`Open full screen view of ${currentImg.alt}`}
                  className={`absolute right-4 bottom-4 z-10 inline-flex items-center gap-1.5 border border-white/25 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black ${theme.buttonRadius}`}
                >
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Inspect</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--site-border)] px-5 py-3.5">
                <p className="text-sm text-[var(--site-ink)]">
                  {currentImg.caption || currentImg.alt}
                </p>
                <span className="font-mono-data text-xs text-[var(--site-muted)]">
                  Drag or use arrows to browse
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.map((img, idx) => {
                  const isActive = idx === safeSlide;
                  return (
                    <button
                      key={`${img.url}-${idx}`}
                      type="button"
                      onClick={() => {
                        setDirection(idx > safeSlide ? 1 : -1);
                        setActiveSlide(idx);
                      }}
                      aria-label={`Show photo ${idx + 1}: ${img.alt}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group overflow-hidden border text-left transition-all ${theme.imageRadius} ${
                        isActive
                          ? 'border-[var(--site-accent)] ring-1 ring-[var(--site-accent)]'
                          : 'border-[var(--site-border)] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <SafeImage
                        src={img.url}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* MODE B: EDITORIAL ASYMMETRIC PHOTO GRID (swiss-grid, gallery-minimal, engineering-command) */
          <ScrollReveal
            autoWrapChildren={false}
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-12"
          >
            {images.map((img, index) => {
              // Balanced editorial 7/5 then 5/7 rhythm for 4 images so every row aligns cleanly
              const spanClass =
                images.length === 4
                  ? index === 0 || index === 3
                    ? 'md:col-span-7'
                    : 'md:col-span-5'
                  : images.length === 3
                    ? index === 0
                      ? 'md:col-span-12'
                      : 'md:col-span-6'
                    : 'md:col-span-6';

              const aspectClass =
                images.length === 4 && (index === 0 || index === 3)
                  ? 'aspect-[16/10]'
                  : 'aspect-[4/3] md:aspect-[16/11]';

              return (
                <ScrollRevealItem key={`${img.url}-${index}`} className={spanClass}>
                  <figure
                    className={`group flex h-full flex-col overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`View larger photo: ${img.alt}`}
                      className="relative block w-full flex-1 overflow-hidden text-left"
                    >
                      <SafeImage
                        src={img.url}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className={`${aspectClass} h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]`}
                      />
                    </button>
                    <figcaption className="flex items-center justify-between gap-3 border-t border-[var(--site-border)] px-4 py-3 text-xs text-[var(--site-muted)]">
                      <span className="truncate">{img.caption || img.alt}</span>
                      <span className="font-mono-data shrink-0 tabular-nums text-[var(--site-accent-text)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </figcaption>
                  </figure>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX WITH KEYBOARD & ARROW NAVIGATION */}
      <AnimatePresence>
        {lightboxImage && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImage.alt}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxIndex(null);
            }}
          >
            <motion.div
              initial={prefersReduced ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReduced ? undefined : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="relative w-full max-w-4xl overflow-hidden border border-white/15 bg-[#0F1117]"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo"
                className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center bg-black/75 text-white hover:bg-black"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
                    }
                    aria-label="Previous photo"
                    className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center bg-black/70 text-white hover:bg-black"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
                    aria-label="Next photo"
                    className="absolute top-1/2 right-3 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center bg-black/70 text-white hover:bg-black"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}

              <SafeImage
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                width={lightboxImage.width}
                height={lightboxImage.height}
                priority
                className="max-h-[78vh] w-full object-contain bg-black"
              />
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3.5 text-sm text-[#D4DAE8]">
                <p>{lightboxImage.caption || lightboxImage.alt}</p>
                <span className="font-mono-data text-xs text-white/60 tabular-nums">
                  {String((lightboxIndex % images.length) + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
