import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BarChart3, Download, Image as ImageIcon } from 'lucide-react';
import { BLOG_ARTICLES, getBlogArticleBySlug } from '../../content/blog';
import { SITE, type PdfGuideItem } from '../../content/site';
import { getServiceBySlug } from '../../content/services';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { GalleryCarousel, type GallerySlide } from '../../components/emtrc/GalleryCarousel';
import { MarkdownRenderer } from '../../components/emtrc/MarkdownRenderer';
import { PdfDownloadModal } from '../../components/emtrc/PdfDownloadModal';
import { PostVisualizer } from '../../components/emtrc/PostVisualizer';
import { OrnamentalDivider } from '../../components/emtrc/OrnamentalDivider';
import { KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { AnimatedSectionHeader, SectionSeparator } from '../../components/emtrc/SectionSeparator';
import { SafeImage } from '../../components/SafeImage';

const EXTRA_BLOG_SLIDES: Record<string, GallerySlide> = {
  'uk-pstn-switch-off-31-january-2027-london-guide': {
    src: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
    alt: 'Independent East London neighbourhood shopfront upgrading its 020 landline to Cloud VoIP',
    caption: 'High-street shops across East and South London are completing SoGEA + VoIP switches months ahead of Q4 2026 engineer queues.',
    tag: 'LONDON HIGH STREET · 020 MIGRATION',
  },
  'how-to-rank-top-3-google-maps-london-borough': {
    src: '/src/assets/images/london_salon_balayage_studio_1795428787038.jpg',
    alt: 'South Kensington independent hair studio photographed in natural window light for Google Maps',
    caption: 'Authentic daylight interior photography uploaded fortnightly drives higher Google Maps tap-to-call rates than stock imagery.',
    tag: 'GOOGLE MAPS · VISUAL SIGNALS',
  },
  'missed-call-text-back-maths-london-trades': {
    src: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
    alt: 'London Gas Safe heating engineer inspecting combi boiler pipework while Lead Catcher handles incoming calls',
    caption: 'While hands are on copper pipework or diagnostic meters, 8-second automated SMS keeps emergency London jobs from calling a competitor.',
    tag: 'LONDON TRADES · CALL RECOVERY',
  },
  'why-1-in-3-london-shops-lose-google-maps-calls': {
    src: '/src/assets/images/barber_fade_editorial_1795426201374.jpg',
    alt: 'Master London barber finishing a skin fade inside an independent Hackney shop',
    caption: 'When local walk-in shoppers see clear prices and live open hours in under 1 second, phone and booking taps jump immediately.',
    tag: 'MOBILE CONVERSION · HACKNEY E8',
  },
  'chatgpt-apple-maps-ai-search-local-businesses': {
    src: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
    alt: 'Certified London domestic electrician installing brushed brass architectural lighting',
    caption: 'Structured HTML pricing and LocalBusiness Schema.org markup allow ChatGPT, Apple Intelligence and Perplexity to cite your trade accurately.',
    tag: 'AI SEARCH · STRUCTURED DATA',
  },
  'domain-ownership-trap-uk-small-business': {
    src: '/src/assets/images/london_studio_dusk_header_1795426202168.jpg',
    alt: 'Independent London workshop and digital studio architecture at dusk',
    caption: 'Every .co.uk and .com domain we manage is registered directly in the business owner’s name with transparent DNS control.',
    tag: 'DOMAIN INDEPENDENCE · LONDON',
  },
};

export function EmtrcBlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getBlogArticleBySlug(slug);
  const { t } = useLanguage();
  const [selectedGuide, setSelectedGuide] = useState<PdfGuideItem | null>(null);

  const carouselSlides = useMemo<GallerySlide[]>(() => {
    if (!article) return [];
    const slides: GallerySlide[] = [
      {
        src: article.image,
        alt: article.imageAlt,
        caption: article.imageAlt,
        tag: `${article.category} · FEATURED`,
      },
    ];

    for (const block of article.blocks) {
      if (block.type === 'image') {
        slides.push({
          src: block.src,
          alt: block.alt,
          caption: block.caption ?? block.alt,
          tag: 'FIELD EVIDENCE',
        });
      }
    }

    const extra = EXTRA_BLOG_SLIDES[article.slug];
    if (extra && !slides.some((s) => s.src === extra.src)) {
      slides.push(extra);
    }

    return slides;
  }, [article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedGuide =
    SITE.pdfGuides.find((g) => g.id === article.relatedGuideId) ?? SITE.pdfGuides[0];
  const relatedService = getServiceBySlug(article.relatedServiceSlug);
  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);
  const chartCount = article.blocks.filter((b) => b.type === 'chart').length;

  return (
    <EmtrcLayout>
      <EmtrcHead
        title={`${article.title} | emtrc Signals`}
        description={article.excerpt}
      />

      <article className="bg-[var(--emtrc-canvas)]">
        {/* Cinematic Dark Architectural Article Header */}
        <header className="relative overflow-hidden bg-[#090B10] pt-9 pb-12 text-[#F5F4F0] sm:pt-12 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={article.image}
              alt=""
              className="h-full w-full object-cover opacity-20 blur-[2px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/85 to-[#08090C]/75" />
          </div>

          <div className="relative mx-auto max-w-[920px] px-5 sm:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 font-mono-data text-xs font-medium text-[#9BA3B5] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.blogPage.backToBlog}</span>
            </Link>

            <Reveal immediate>
              <div className="mt-5">
                <KickerRule light>
                  {article.category} · {article.readTime} · {article.publishedDate}
                </KickerRule>
              </div>

              <h1 className="mt-3 font-editorial text-[clamp(2rem,4.6vw,3.45rem)] font-bold leading-[1.06] tracking-[-0.02em] text-white">
                {article.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-[#C2C9D9] sm:text-lg">
                {article.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-4 font-mono-data text-xs text-[#9BA3B5]">
                <span>By {article.author}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 text-[#FF8C73]">
                  <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {carouselSlides.length} swipeable gallery photos
                </span>
                {chartCount > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-300">
                      <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
                      {chartCount} interactive data chart
                    </span>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </header>

        <SectionSeparator variant="angle" from="obsidian" to="sand" accentColor="coral" />

        {/* Interactive Swipeable Photo Gallery Carousel (4 Curated London Photos) */}
        <section className="bg-[var(--emtrc-sand)] py-8 sm:py-11">
          <div className="mx-auto max-w-[960px] px-5 sm:px-8">
            <Reveal>
              <GalleryCarousel
                slides={carouselSlides}
                title={`Visual Dossier · ${article.category}`}
                aspect="16/9"
              />
            </Reveal>
          </div>
        </section>

        <OrnamentalDivider
          pattern="georgian-fret"
          from="sand"
          to="canvas"
          label="SIGNALS BRIEFING & LIVE DATA VISUALISER"
          accentColor="coral"
        />

        {/* Main Editorial Body with automatic PostVisualizer + Parsed Markdown */}
        <div className="mx-auto max-w-[820px] px-5 pt-6 pb-12 sm:px-8">
          {/* Automatic Interactive Data Chart + Key Takeaway Infographic Visualizer */}
          <Reveal>
            <PostVisualizer article={article} />
          </Reveal>

          {/* Parsed Markdown Article Content */}
          <div className="mt-9">
            <MarkdownRenderer blocks={article.blocks} />
          </div>

          {/* Contextual Companion PDF + Related Service */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-[var(--emtrc-border)] pt-10 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-6 text-[#F5F6F8]">
              <div>
                <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-brass-light)]">
                  Free companion PDF · {relatedGuide.pages}
                </p>
                <h3 className="mt-2 font-editorial text-xl font-bold text-white">
                  {relatedGuide.shortTitle}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#B4BCCB]">
                  {relatedGuide.summary}
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedGuide(relatedGuide)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.homeSections.downloadPdfCta}</span>
                </button>
              </div>
            </div>

            {relatedService && (
              <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                <div>
                  <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-accent)]">
                    Want emtrc to handle this for you?
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                    {relatedService.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                    {relatedService.menuDescription} — {relatedService.priceTag}.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to={`/services/${relatedService.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
                  >
                    <span>Explore {relatedService.shortTitle}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <SectionSeparator variant="wave" from="canvas" to="sand" accentColor="amber" />

        {/* Keep Reading Strip */}
        <section className="bg-[var(--emtrc-sand)] py-11 sm:py-14">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <AnimatedSectionHeader
              kicker={t.blogPage.relatedArticles}
              headline="More London field briefings"
              accentWord="worth reading."
              tone="amber"
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {otherArticles.map((other) => (
                <Link
                  key={other.slug}
                  to={`/blog/${other.slug}`}
                  className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-colors hover:border-[var(--emtrc-accent)] sm:grid-cols-12"
                >
                  <div className="sm:col-span-5 overflow-hidden bg-[var(--emtrc-navy)]">
                    <SafeImage
                      src={other.image}
                      alt={other.imageAlt}
                      width={640}
                      height={480}
                      className="h-44 w-full object-cover sm:h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-5 sm:col-span-7">
                    <div>
                      <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-accent)]">
                        {other.category} · {other.readTime}
                      </p>
                      <h3 className="mt-1.5 font-editorial text-lg font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                        {other.title}
                      </h3>
                    </div>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)]">
                      <span>{t.blogPage.readArticle}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <PdfDownloadModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </EmtrcLayout>
  );
}
