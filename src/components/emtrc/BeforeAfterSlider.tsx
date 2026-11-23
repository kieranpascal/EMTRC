import { useRef, useState } from 'react';
import { ArrowLeftRight, CheckCircle2, Clock, PhoneCall, ShieldAlert, Star } from 'lucide-react';
import { SafeImage } from '../SafeImage';

interface BeforeAfterSliderProps {
  businessName?: string;
  borough?: string;
  afterImage?: string;
  afterImageAlt?: string;
}

/**
 * Interactive draggable & keyboard-accessible Before / After London website comparison.
 * Lets prospects feel the concrete gap between an outdated/missing local site and an emtrc launch.
 */
export function BeforeAfterSlider({
  businessName = 'Kingsland Blade & Fade',
  borough = 'Hackney E8',
  afterImage = '/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg',
  afterImageAlt = 'East London barber finishing a precision skin fade inside a modern studio',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(44);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(12, Math.min(88, Math.round(pct))));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono-data text-[var(--emtrc-muted)]">
          <span>BEFORE: UNMANAGED / SOCIAL-ONLY</span>
        </div>
        <div className="flex items-center gap-2 font-mono-data font-semibold text-[var(--emtrc-accent)]">
          <span>AFTER: EMTRC STUDIO BUILD ({100 - position}% VISIBLE)</span>
        </div>
      </div>

      <div
        ref={containerRef}
        data-testid="before-after-slider"
        onPointerDown={(e) => {
          draggingRef.current = true;
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return;
          updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
        className="relative h-[440px] sm:h-[470px] w-full select-none overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] shadow-xl cursor-ew-resize touch-none"
      >
        {/* UNDERLAY: AFTER — Modern emtrc Studio Site (photo left, studio UI right so initial 44% split frames clean copy) */}
        <div className="absolute inset-0 bg-[#0A0B0E] text-white">
          <div className="grid h-full grid-cols-1 md:grid-cols-12">
            <div className="relative hidden md:block md:col-span-5">
              <SafeImage
                src={afterImage}
                alt={afterImageAlt}
                width={700}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0A0B0E] via-[#0A0B0E]/25 to-transparent" />
            </div>

            <div className="relative flex flex-col justify-between p-6 sm:p-8 md:col-span-7 md:pl-10">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-[#262A36] pb-3.5 text-[11px] font-mono-data text-[#98A0B2]">
                  <span className="font-semibold text-white truncate">{businessName}</span>
                  <span className="shrink-0 text-[#FF6B5B]">OPEN NOW · {borough.toUpperCase()}</span>
                </div>

                <p className="mt-5 font-mono-data text-[11px] text-[#FF6B5B]">
                  0.9s LOAD · 99/100 LIGHTHOUSE · LOCALBUSINESS SCHEMA
                </p>
                <h3 className="mt-2 font-editorial text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Precision cuts &amp; skin fades in {borough}.
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-[#B4BCCB] sm:text-sm">
                  Transparent prices, live walk-in wait status and one-tap Fresha booking — built for commuters on 4G.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-lg border border-[#262A36] bg-[#141720] p-3">
                    <p className="text-[#98A0B2]">Skin Fade + Beard</p>
                    <p className="mt-1 font-mono-data text-base font-semibold text-white">£36 · 45m</p>
                  </div>
                  <div className="rounded-lg border border-[#262A36] bg-[#141720] p-3">
                    <p className="text-[#98A0B2]">Classic Scissor Cut</p>
                    <p className="mt-1 font-mono-data text-base font-semibold text-white">£28 · 35m</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#C82419] px-4 py-2 text-xs font-semibold text-white">
                  <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
                  Tap to call · 020 7946 0412
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Star className="h-3.5 w-3.5 fill-[#FF6B5B] text-[#FF6B5B]" aria-hidden="true" />
                  4.9 ★ (142 Google reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OVERLAY: BEFORE — Broken / Outdated High-Street Experience (clipped from left) */}
        <div
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          className="absolute inset-0 bg-[#ECEAE4] text-[#2A2C30]"
          aria-hidden="true"
        >
          <div className="grid h-full grid-cols-1 md:grid-cols-12">
            <div className="flex h-full flex-col justify-between p-6 sm:p-8 md:col-span-5 md:pr-8">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[#CFCBC0] pb-3 text-[11px] font-mono-data text-[#7A3B2E]">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                    NO SSL · HTTP ONLY
                  </span>
                  <span className="shrink-0">6.4s LOAD</span>
                </div>

                <div className="mt-5 space-y-3.5">
                  <p className="font-mono-data text-[11px] text-[#6B7078]">
                    LEGACY DIRECTORY / INSTAGRAM-ONLY
                  </p>
                  <div className="rounded-lg border border-dashed border-[#B7B2A6] bg-[#E3E0D8] p-4">
                    <p className="text-base font-bold leading-snug text-[#3D4046]">
                      Welcome to our shop — DM us on Instagram for prices!!
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#62666E]">
                      Last updated 2021 · Price_List_FINAL_v3.pdf (4.8 MB) · Hours differ on Google Maps.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 md:grid-cols-1">
                    <div className="rounded border border-[#CCC8BE] bg-[#F5F4F0] p-2.5 text-[#62666E]">
                      <p className="flex items-center gap-1.5 font-semibold text-[#7A3B2E]">
                        <Clock className="h-3.5 w-3.5 shrink-0" /> Missed calls go to voicemail
                      </p>
                      <p className="mt-0.5 text-[11px]">78% of callers ring the next shop in {borough}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-[#CFCBC0] pt-3 text-[11px] text-[#62666E]">
                <span className="truncate">barber_e8@gmail.com</span>
                <span className="shrink-0 font-mono-data font-semibold text-[#7A3B2E]">CONVERSION LEAK</span>
              </div>
            </div>

            <div className="hidden md:flex md:col-span-7 flex-col items-center justify-center border-l border-dashed border-[#CFCBC0] bg-[#E5E2DA] p-8 text-center">
              <p className="font-mono-data text-xs uppercase tracking-[0.14em] text-[#7A3B2E]">
                No Mobile Site Detected
              </p>
              <p className="mt-2 max-w-sm text-sm text-[#555961]">
                Customers on 4G hit a pinch-to-zoom PDF menu, broken booking link, or dead Facebook page — and bounce back to Google Maps in under 4 seconds.
              </p>
              <p className="mt-4 font-mono-data text-[11px] text-[#6B7078]">
                MISSING: LOCALBUSINESS SCHEMA · SSL · CLICK-TO-CALL · REVIEWS
              </p>
            </div>
          </div>
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute inset-y-0 z-20 -ml-[1.5px] w-[3px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.45)]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[var(--emtrc-accent)] text-white shadow-xl">
            <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Accessible range control + summary row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-xs text-[var(--emtrc-muted)]">
          <span className="whitespace-nowrap font-medium">Drag comparison</span>
          <input
            type="range"
            min={12}
            max={88}
            value={position}
            aria-label="Compare before and after London website redesign"
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-40 accent-[var(--emtrc-accent)] cursor-pointer"
          />
        </label>
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--emtrc-ink)]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
          Same local London shop — radically clearer mobile conversion in 48 hours.
        </p>
      </div>
    </div>
  );
}
