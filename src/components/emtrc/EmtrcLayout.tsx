import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Globe,
  Lock,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { SERVICE_DETAILS } from '../../content/services';
import { useLanguage } from '../../context/LanguageContext';
import { SafeImage } from '../SafeImage';
import { EmtrcLogo } from './EmtrcLogo';
import { MagneticLink } from './MagneticLink';
import { NewsletterBand } from './NewsletterBand';
import { ScrollProgressBar } from './ScrollProgressBar';

type MegaKey = 'services' | 'resources' | null;

interface EmtrcLayoutProps {
  children: ReactNode;
  hideNewsletter?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function EmtrcLayout({ children, hideNewsletter = false }: EmtrcLayoutProps) {
  const { pathname, hash } = useLocation();
  const prefersReduced = useReducedMotion();
  const { locale, setLocale, t, languages } = useLanguage();

  const [openMega, setOpenMega] = useState<MegaKey>(null);
  const [hoveredServiceSlug, setHoveredServiceSlug] = useState<string>(SERVICE_DETAILS[0].slug);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'services' | 'resources' | null>('services');
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return document.documentElement.classList.contains('dark');
  });

  const closeTimerRef = useRef<number | null>(null);
  const hoverOpenedAtRef = useRef<{ key: MegaKey; time: number }>({ key: null, time: 0 });
  const langContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpenMega(null);
    setLangMenuOpen(false);
    setMobileOpen(false);
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % SITE.tickerItems.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMega(null);
        setLangMenuOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (langContainerRef.current && !langContainerRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('emtrc-theme', next ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  };

  const handleMegaEnter = (key: MegaKey) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setLangMenuOpen(false);
    if (openMega !== key) {
      hoverOpenedAtRef.current = { key, time: Date.now() };
      setOpenMega(key);
    }
  };

  const handleMegaToggle = (key: Exclude<MegaKey, null>) => {
    setLangMenuOpen(false);
    if (openMega === key) {
      const justHoveredOpen =
        hoverOpenedAtRef.current.key === key && Date.now() - hoverOpenedAtRef.current.time < 400;
      if (justHoveredOpen) {
        return;
      }
      setOpenMega(null);
    } else {
      hoverOpenedAtRef.current = { key: null, time: 0 };
      setOpenMega(key);
    }
  };

  const handleMegaLeave = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMega(null);
    }, 160);
  };

  const currentTicker = SITE.tickerItems[tickerIdx] ?? SITE.tickerItems[0];
  const currentLangOption = languages.find((l) => l.code === locale) ?? languages[0];
  const isServicesActive = pathname === '/services' || pathname.startsWith('/services/');
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');
  const activeServicePreview =
    SERVICE_DETAILS.find((s) => s.slug === hoveredServiceSlug) ?? SERVICE_DETAILS[0];

  const serviceHeadings = [
    t.megaHeadings.websitesFoundations,
    t.megaHeadings.aiFrontDesk,
    t.megaHeadings.getFoundLocally,
  ];
  const resourceHeadings = [t.megaHeadings.freeGuides, t.megaHeadings.journalLearn];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)] paper-texture">
      <ScrollProgressBar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--emtrc-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Slim non-sticky desktop utility bar: rotating London news ticker + contact + multilingual switcher */}
      <div className="hidden md:block relative z-50 border-b border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#DCE3F2]">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between gap-4 px-8 text-xs">
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            <span className="font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[var(--emtrc-brass-light)] whitespace-nowrap shrink-0">
              {currentTicker.badge}
            </span>
            <span aria-hidden="true" className="text-[#4B566E] shrink-0">·</span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTicker.badge}
                  initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: EASE }}
                  className="flex items-center gap-2.5 min-w-0"
                >
                  <p className="truncate text-[#C7D0E4]">{currentTicker.text}</p>
                  <Link
                    to={currentTicker.to}
                    className="whitespace-nowrap shrink-0 font-semibold text-white underline underline-offset-4 hover:text-[var(--emtrc-brass-light)]"
                  >
                    {currentTicker.linkLabel} →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={SITE.brand.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#D6DEF0] hover:text-white transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <span>{t.bookCallShort}</span>
            </a>

            <a
              href={`mailto:${SITE.brand.email}`}
              className="hidden xl:inline-flex items-center gap-1.5 whitespace-nowrap text-[#D6DEF0] hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <span>{SITE.brand.email}</span>
            </a>

            {/* Multilingual Selector Dropdown */}
            <div ref={langContainerRef} className="relative border-l border-[#262A36] pl-4">
              <button
                type="button"
                data-testid="language-switcher"
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                aria-label="Change language"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 font-mono-data text-xs font-semibold text-white transition-colors hover:text-[var(--emtrc-brass-light)] whitespace-nowrap"
              >
                <Globe className="h-3.5 w-3.5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
                <span>{currentLangOption.shortLabel}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-150 ${langMenuOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    data-testid="language-menu"
                    role="listbox"
                    aria-label="Select site language"
                    initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: 4 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-full mt-2 grid w-[348px] grid-cols-2 gap-1 overflow-hidden rounded-xl border border-[#262D3B] bg-[#0D1014] p-2 shadow-2xl"
                  >
                    {languages.map((lang) => {
                      const active = lang.code === locale;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          role="option"
                          aria-selected={active}
                          data-testid={`lang-option-${lang.code}`}
                          onClick={() => {
                            setLocale(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                            active
                              ? 'bg-[var(--emtrc-accent)] font-semibold text-white'
                              : 'text-[#DCE3F2] hover:bg-[#19202B] hover:text-white'
                          }`}
                        >
                          <span className="truncate">
                            <span className="font-mono-data font-bold mr-1.5">{lang.shortLabel}</span>
                            <span>{lang.nativeName}</span>
                          </span>
                          <span className="flex items-center gap-1 shrink-0">
                            {lang.dir === 'rtl' && (
                              <span className="font-mono-data text-[9px] uppercase opacity-75">RTL</span>
                            )}
                            {active && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Editorial Glass Header + Photographic Studio Mega Menu */}
      <header
        className="sticky top-0 z-40 border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]/90 backdrop-blur-xl transition-colors"
        onMouseLeave={handleMegaLeave}
      >
        <div className="mx-auto flex h-14 md:h-[70px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          {/* Zone 1: Brand mark + wordmark */}
          <Link to="/" className="group focus-visible:rounded-lg shrink-0" aria-label="emtrc home">
            <EmtrcLogo />
          </Link>

          {/* Zone 2: Clean single-line navigation with springy MagneticLink & live Mega Menu triggers */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[var(--emtrc-muted)]"
          >
            <MagneticLink strength={0.18} maxOffset={6}>
              <button
                type="button"
                data-testid="mega-trigger-services"
                aria-expanded={openMega === 'services'}
                onMouseEnter={() => handleMegaEnter('services')}
                onClick={() => handleMegaToggle('services')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap shrink-0 transition-colors ${
                  openMega === 'services' || isServicesActive
                    ? 'bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)] font-semibold'
                    : 'hover:bg-[var(--emtrc-sand)]/60 hover:text-[var(--emtrc-ink)]'
                }`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openMega === 'services' ? 'rotate-180 text-[var(--emtrc-accent)]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </MagneticLink>

            {[
              { to: '/work', label: t.nav.work },
              { to: '/app', label: t.nav.theApp },
              { to: '/pricing', label: t.nav.pricing },
              { to: '/blog', label: t.nav.blog, matchPrefix: isBlogActive },
            ].map((item) => (
              <MagneticLink
                key={item.to}
                navLink
                strength={0.18}
                maxOffset={6}
                to={item.to}
                onMouseEnter={() => setOpenMega(null)}
                className={({ isActive }) => {
                  const active = isActive || Boolean(item.matchPrefix);
                  return `relative rounded-lg px-3 py-2 whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-[var(--emtrc-ink)] font-semibold'
                      : 'hover:bg-[var(--emtrc-sand)]/60 hover:text-[var(--emtrc-ink)]'
                  }`;
                }}
              >
                {({ isActive }) => {
                  const active = isActive || Boolean(item.matchPrefix);
                  return (
                    <>
                      <span>{item.label}</span>
                      {active && (
                        <motion.span
                          layoutId="header-active-indicator"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute right-3 bottom-0.5 left-3 h-[2px] rounded-full bg-[var(--emtrc-accent)]"
                        />
                      )}
                    </>
                  );
                }}
              </MagneticLink>
            ))}

            <MagneticLink strength={0.18} maxOffset={6}>
              <button
                type="button"
                data-testid="mega-trigger-resources"
                aria-expanded={openMega === 'resources'}
                onMouseEnter={() => handleMegaEnter('resources')}
                onClick={() => handleMegaToggle('resources')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap shrink-0 transition-colors ${
                  openMega === 'resources' ||
                  pathname === '/resources' ||
                  pathname === '/how-it-works' ||
                  pathname === '/training' ||
                  pathname === '/faq' ||
                  pathname.startsWith('/case-studies')
                    ? 'bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)] font-semibold'
                    : 'hover:bg-[var(--emtrc-sand)]/60 hover:text-[var(--emtrc-ink)]'
                }`}
              >
                <span>{t.nav.resources}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openMega === 'resources' ? 'rotate-180 text-[var(--emtrc-accent)]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </MagneticLink>
          </nav>

          {/* Zone 3: Client Portal + Tactile Theme Toggle + Primary CTA + Mobile trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <MagneticLink
              to="/portal"
              strength={0.18}
              maxOffset={5}
              data-testid="header-portal-link"
              wrapperClassName="hidden md:inline-flex"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--emtrc-muted)] whitespace-nowrap shrink-0 transition-colors hover:bg-[var(--emtrc-sand)] hover:text-[var(--emtrc-ink)]"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.nav.clientPortal}</span>
            </MagneticLink>

            <button
              type="button"
              data-testid="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={dark ? t.theme.switchToLight : t.theme.switchToDark}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-2.5 font-mono-data text-[11px] font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-accent)]"
            >
              {dark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-[#FF8C73]" aria-hidden="true" />
                  <span className="hidden xl:inline">{t.theme.light}</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                  <span className="hidden xl:inline">{t.theme.dark}</span>
                </>
              )}
            </button>

            <MagneticLink
              to="/free-demo"
              strength={0.26}
              maxOffset={9}
              wrapperClassName="hidden sm:inline-flex"
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 shadow-[0_6px_20px_-6px_rgba(226,59,45,0.55)] transition-colors hover:bg-[var(--emtrc-accent-hover)]"
            >
              <span>{t.nav.freeDemoCta}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </MagneticLink>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="emtrc-mobile-nav"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]"
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Panels with Live Interactive Photographic Preview */}
        <AnimatePresence>
          {openMega && (
            <motion.div
              key={openMega}
              data-testid={`mega-panel-${openMega}`}
              initial={prefersReduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
              onMouseEnter={() => handleMegaEnter(openMega)}
              onMouseLeave={handleMegaLeave}
              className="hidden lg:block absolute inset-x-0 top-full border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]/98 backdrop-blur-2xl shadow-2xl"
            >
              <div className="mx-auto max-w-[1200px] px-8 pt-6 pb-6">
                {openMega === 'services' ? (
                  <>
                    <div className="grid grid-cols-12 gap-7">
                      {SITE.megaMenu.services.map((col, idx) => (
                        <div
                          key={col.heading}
                          className={`col-span-3 ${
                            idx > 0 ? 'border-l border-[var(--emtrc-border)] pl-6' : ''
                          }`}
                        >
                          <p className="font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                            {serviceHeadings[idx] ?? col.heading}
                          </p>
                          <ul className="mt-3.5 space-y-2">
                            {col.items.map((item) => {
                              const slug = item.to.replace('/services/', '');
                              const isPreviewed = hoveredServiceSlug === slug;
                              return (
                                <li key={item.label}>
                                  <Link
                                    to={item.to}
                                    onMouseEnter={() => {
                                      if (SERVICE_DETAILS.some((s) => s.slug === slug)) {
                                        setHoveredServiceSlug(slug);
                                      }
                                    }}
                                    onClick={() => setOpenMega(null)}
                                    className={`group block rounded-xl p-2.5 -mx-2.5 transition-colors ${
                                      isPreviewed
                                        ? 'bg-[var(--emtrc-sand)]'
                                        : 'hover:bg-[var(--emtrc-sand)]/70'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="text-sm font-semibold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                                        {item.label}
                                      </p>
                                      <ArrowUpRight
                                        className="h-3.5 w-3.5 text-[var(--emtrc-muted)] opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-[var(--emtrc-accent)]"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <p className="mt-0.5 text-xs leading-snug text-[var(--emtrc-muted)]">
                                      {item.description}
                                    </p>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}

                      {/* Column 4: Dynamic Live Photographic Service Preview */}
                      <div className="col-span-3 border-l border-[var(--emtrc-border)] pl-6">
                        <p className="font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[var(--emtrc-muted)]">
                          {t.megaHeadings.livePreview}
                        </p>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeServicePreview.slug}
                            initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: EASE }}
                            className="mt-3 overflow-hidden rounded-xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-white"
                          >
                            <div className="relative h-36 w-full overflow-hidden">
                              <SafeImage
                                src={activeServicePreview.heroImage}
                                alt={activeServicePreview.heroAlt}
                                width={640}
                                height={420}
                                priority
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/35 to-transparent" />
                              <span className="absolute bottom-2.5 left-3 font-mono-data text-[11px] font-semibold text-[#FF8C73]">
                                {activeServicePreview.priceTag}
                              </span>
                            </div>
                            <div className="p-4">
                              <p className="font-editorial text-base font-bold text-white">
                                {activeServicePreview.shortTitle}
                              </p>
                              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#B4BCCB]">
                                {activeServicePreview.subheadline}
                              </p>
                              <Link
                                to={`/services/${activeServicePreview.slug}`}
                                onClick={() => setOpenMega(null)}
                                className="mt-3 inline-flex items-center gap-1.5 font-mono-data text-[11px] font-semibold text-[#FF8C73] hover:text-white"
                              >
                                <span>{t.megaHeadings.exploreService}</span>
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </Link>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Mega Menu Bottom Utility Strip */}
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-4 text-xs font-semibold">
                      <div className="flex items-center gap-6">
                        <Link
                          to="/services"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-ink)] hover:text-[var(--emtrc-accent)]"
                        >
                          {t.nav.allServices} →
                        </Link>
                        <Link
                          to="/pricing"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          {t.nav.pricing}
                        </Link>
                        <Link
                          to="/ai-tools"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          {t.nav.aiTools}
                        </Link>
                        <Link
                          to="/work"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-accent)] hover:underline"
                        >
                          {t.nav.allDemos}
                        </Link>
                      </div>
                      <a
                        href={SITE.brand.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--emtrc-accent)] hover:underline"
                      >
                        {t.hero.footnoteLink} →
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-12 gap-7">
                    {SITE.megaMenu.resources.map((col, idx) => (
                      <div
                        key={col.heading}
                        className={`col-span-4 ${
                          idx > 0 ? 'border-l border-[var(--emtrc-border)] pl-6' : ''
                        }`}
                      >
                        <p className="font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          {resourceHeadings[idx] ?? col.heading}
                        </p>
                        <ul className="mt-3.5 space-y-2">
                          {col.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.to}
                                onClick={() => setOpenMega(null)}
                                className="group block rounded-xl p-2.5 -mx-2.5 transition-colors hover:bg-[var(--emtrc-sand)]"
                              >
                                <p className="text-sm font-semibold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 text-xs leading-snug text-[var(--emtrc-muted)]">
                                  {item.description}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="col-span-4 border-l border-[var(--emtrc-border)] pl-6">
                      <Link
                        to="/case-studies"
                        onClick={() => setOpenMega(null)}
                        className="group block overflow-hidden rounded-xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-white"
                      >
                        <div className="relative h-32 w-full overflow-hidden">
                          <SafeImage
                            src="/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg"
                            alt="East London independent barber craft studio"
                            width={640}
                            height={380}
                            priority
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent" />
                          <span className="absolute bottom-2 left-3 font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[#FF8C73]">
                            {t.nav.caseStudies}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="font-editorial text-lg font-bold text-white">
                            {t.homeSections.beforeAfterHeadline}
                          </p>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#B4BCCB]">
                            Hackney · Greenwich · South Kensington · Battersea · Peckham
                          </p>
                          <p className="mt-3 inline-flex items-center gap-1.5 font-mono-data text-[11px] font-semibold text-[#FF8C73]">
                            <span>{t.homeSections.caseStudiesAllLink}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Drawer Navigation with all 8 services + Blog + Multilingual selector */}
        {mobileOpen && (
          <nav
            id="emtrc-mobile-nav"
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-5 max-h-[82vh] overflow-y-auto"
          >
            <div className="mb-4 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-muted)]">
                <Globe className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                <span>{t.nav.languageLabel} (10)</span>
              </div>
              <div className="mt-2.5 grid grid-cols-5 gap-1.5" role="group" aria-label="Language selector">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    data-testid={`mobile-lang-${lang.code}`}
                    onClick={() => setLocale(lang.code)}
                    className={`rounded-md px-1.5 py-1.5 text-center font-mono-data text-xs font-bold transition-colors ${
                      locale === lang.code
                        ? 'bg-[var(--emtrc-accent)] text-white'
                        : 'text-[var(--emtrc-muted)] hover:bg-[var(--emtrc-sand)] hover:text-[var(--emtrc-ink)]'
                    }`}
                  >
                    {lang.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-[var(--emtrc-ink)]"
              >
                <span>{t.nav.services}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileSection === 'services' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileSection === 'services' && (
                <div className="space-y-1 pl-3 pb-2">
                  <Link
                    to="/services"
                    className="block rounded-md px-3 py-1.5 text-sm font-semibold text-[var(--emtrc-accent)]"
                  >
                    {t.nav.allServices} →
                  </Link>
                  {SERVICE_DETAILS.map((srv) => (
                    <Link
                      key={srv.slug}
                      to={`/services/${srv.slug}`}
                      className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                    >
                      {srv.shortTitle}
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/app" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.theApp}
              </Link>
              <Link to="/work" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.work} (15)
              </Link>
              <Link to="/pricing" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.pricing}
              </Link>
              <Link to="/ai-tools" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.aiTools}
              </Link>
              <Link to="/blog" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.blog}
              </Link>

              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'resources' ? null : 'resources')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-[var(--emtrc-ink)]"
              >
                <span>{t.nav.resources}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileSection === 'resources' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileSection === 'resources' && (
                <div className="space-y-1 pl-3 pb-2">
                  <Link to="/case-studies" className="block rounded-md px-3 py-1.5 text-sm font-semibold text-[var(--emtrc-accent)]">
                    {t.nav.caseStudies}
                  </Link>
                  <Link to="/training" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    {t.nav.training}
                  </Link>
                  <Link to="/resources#guides" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    {t.nav.pdfLibrary}
                  </Link>
                  <Link to="/how-it-works" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    {t.nav.howItWorks}
                  </Link>
                  <Link to="/faq" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    {t.nav.faq}
                  </Link>
                </div>
              )}

              <Link to="/about" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.about}
              </Link>
              <Link to="/contact" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                {t.nav.contact}
              </Link>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 border-t border-[var(--emtrc-border)] pt-5">
              <Link
                to="/free-demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white"
              >
                <span>{t.nav.freeDemoCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/portal"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)]"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                <span>{t.nav.clientPortal}</span>
              </Link>
              <a
                href={SITE.brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{t.bookCallShort}</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {!hideNewsletter && <NewsletterBand />}

      {/* Deep Obsidian Editorial Footer (Zero giant watermark) */}
      <footer className="overflow-hidden border-t border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#D6DEF0]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-8 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Link to="/" aria-label="emtrc home">
                <EmtrcLogo variant="light" showSublabel />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#A9B5CE]">
                {t.footer.tagline}
              </p>
              <div className="mt-5 space-y-2 text-sm">
                <p>
                  <a
                    href={`mailto:${SITE.brand.email}`}
                    className="font-semibold text-white underline underline-offset-4 hover:text-[var(--emtrc-brass-light)]"
                  >
                    {SITE.brand.email}
                  </a>
                </p>
                <p>
                  <a
                    href={SITE.brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C7D0E4] hover:text-white transition-colors"
                  >
                    {t.hero.footnoteLink} →
                  </a>
                </p>
                <p className="font-mono-data text-xs text-[#8E9BB5]">{SITE.brand.serviceArea}</p>
              </div>

              {/* Crisp Studio Social Links */}
              <div
                data-testid="footer-social-links"
                className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4"
              >
                {SITE.brand.socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`emtrc on ${soc.label}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1.5 font-mono-data text-[11px] font-medium text-[#CBD5E1] transition-colors hover:border-[#FF8C73] hover:text-white"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-brass-light)]">
                {t.footer.services}
              </h2>
              <ul className="mt-3.5 space-y-2 text-sm text-[#BAC5DC]">
                {SERVICE_DETAILS.map((srv) => (
                  <li key={srv.slug}>
                    <Link to={`/services/${srv.slug}`} className="hover:text-white transition-colors">
                      {srv.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h2 className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-brass-light)]">
                {t.footer.guidesDemos}
              </h2>
              <ul className="mt-3.5 space-y-2 text-sm text-[#BAC5DC]">
                <li><Link to="/free-demo" className="hover:text-white transition-colors">{t.nav.freeDemoCta}</Link></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">{t.nav.caseStudies}</Link></li>
                <li><Link to="/training" className="hover:text-white transition-colors">{t.nav.training}</Link></li>
                <li><Link to="/work" className="hover:text-white transition-colors">{t.nav.allDemos}</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">{t.nav.blog}</Link></li>
                <li><Link to="/resources#guides" className="hover:text-white transition-colors">{t.nav.pdfLibrary}</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">{t.nav.faq}</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-brass-light)]">
                {t.footer.company}
              </h2>
              <ul className="mt-3.5 space-y-2 text-sm text-[#BAC5DC]">
                <li><Link to="/app" className="hover:text-white transition-colors">{t.nav.theApp}</Link></li>
                <li><Link to="/portal" className="hover:text-white transition-colors">{t.nav.clientPortal}</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link></li>
                <li><Link to="/ai-tools" className="hover:text-white transition-colors">{t.nav.aiTools}</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[var(--emtrc-navy-border)] pt-5 text-xs text-[#8E9BB5] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.brand.legalLine}
            </p>
            <p className="font-mono-data">
              {SITE.flags.showExVat ? 'All prices ex VAT · ' : ''}{t.footer.noCookies}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
