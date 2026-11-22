import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import type { GalleryImage } from '../../types/site';
import { getNicheLabels } from '../../utils/niche';
import { SafeImage } from '../SafeImage';

interface GallerySectionProps {
  showFullPageLink?: boolean;
  isStandalonePage?: boolean;
}

export function GallerySection({
  showFullPageLink = false,
  isStandalonePage = false,
}: GallerySectionProps) {
  const { site, theme } = useSite();
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImage]);

  if (site.gallery.length === 0) {
    return null;
  }

  const labels = getNicheLabels(site.niche);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  return (
    <section
      id="gallery"
      className={`border-b border-[var(--site-border)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <HeadingTag
            className={`font-display font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
              isStandalonePage
                ? 'text-[clamp(2.15rem,4vw,3.35rem)] leading-[1.1]'
                : 'text-2xl sm:text-3xl'
            }`}
          >
            {labels.galleryHeading}
          </HeadingTag>

          {showFullPageLink && site.pages.gallery && (
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-accent-text)] whitespace-nowrap hover:opacity-80"
            >
              <span>View gallery</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div
          className={`mt-8 grid grid-cols-1 gap-6 ${
            site.gallery.length === 1 ? 'max-w-3xl' : 'md:grid-cols-2'
          }`}
        >
          {site.gallery.map((img, index) => (
            <figure
              key={`${img.url}-${index}`}
              className={`overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
            >
              <button
                type="button"
                onClick={() => setLightboxImage(img)}
                aria-label={`View larger photo: ${img.alt}`}
                className="block w-full text-left"
              >
                <SafeImage
                  src={img.url}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-200 hover:scale-[1.015]"
                />
              </button>
              {img.caption && (
                <figcaption className="border-t border-[var(--site-border)] px-5 py-3.5 text-xs leading-relaxed text-[var(--site-muted)]">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-[#0F1117]">
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close photo"
              className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black/70 text-white hover:bg-black"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <SafeImage
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              width={lightboxImage.width}
              height={lightboxImage.height}
              priority
              className="max-h-[80vh] w-full object-contain bg-black"
            />
            {lightboxImage.caption && (
              <p className="px-5 py-3.5 text-sm text-[#D4DAE8]">{lightboxImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
