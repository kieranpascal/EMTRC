import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Globe,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { SERVICE_DETAILS } from '../../content/services';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcLogo } from './EmtrcLogo';
import { NewsletterBand } from './NewsletterBand';

type MegaKey = 'services' | 'resources' | null;

interface EmtrcLayoutProps {
  children: ReactNode;
  hideNewsletter?: boolean;
}

export function EmtrcLayout({ children, hideNewsletter = false }: EmtrcLayoutProps) {
  const { pathname, hash } = useLocation();
  const prefersReduced = useReducedMotion();
  const { locale, setLocale, t, languages } = useLanguage();

  const [openMega, setOpenMega] = useState<MegaKey>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'services' | 'resources' | null>('services');
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
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

  // Rotate top utility bar ticker every 6 seconds unless reduced motion is enabled
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
    }, 150);
  };

  const currentTicker = SITE.tickerItems[tickerIdx] ?? SITE.tickerItems[0];
  const currentLangOption = languages.find((l) => l.code === locale) ?? languages[0];
  const isServicesActive = pathname === '/services' || pathname.startsWith('/services/');
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');

  const serviceHeadings = [
    t.megaHeadings.websitesFoundations,
    t.megaHeadings.aiFrontDesk,
    t.megaHeadings.getFoundLocally,
  ];
  const resourceHeadings = [t.megaHeadings.freeGuides, t.megaHeadings.journalLearn];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)] paper-texture">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--emtrc-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Slim non-sticky desktop utility bar: rotating London news ticker + contact + multilingual switcher */}
      <div className="hidden md:block relative z-50 border-b border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#DCE3F2]">
        <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-between gap-4 px-8 text-xs">
          {/* Rotating editorial news ticker */}
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            <span className="text-[11px] font-bold tracking-wider text-[var(--emtrc-brass-light)] whitespace-nowrap shrink-0">
              {currentTicker.badge}
            </span>
            <span aria-hidden="true" className="text-[#516085] shrink-0">·</span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTicker.badge}
                  initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Right utility controls: Call + Email + Language Selector */}
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
            <div ref={langContainerRef} className="relative border-l border-[#22325C] pl-4">
              <button
                type="button"
                data-testid="language-switcher"
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
                aria-label="Change language"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-semibold text-white transition-colors hover:text-[var(--emtrc-brass-light)] whitespace-nowrap"
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
                    className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-[#22325C] bg-[#0E1730] p-1.5 shadow-2xl"
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
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                            active
                              ? 'bg-[#2347FF] font-semibold text-white'
                              : 'text-[#DCE3F2] hover:bg-[#19274C] hover:text-white'
                          }`}
                        >
                          <span>
                            <span className="font-bold mr-2">{lang.shortLabel}</span>
                            {lang.nativeName}
                          </span>
                          {active && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
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

      {/* Sticky Editorial Header + Mega Menu */}
      <header
        className="sticky top-0 z-40 border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]/92 backdrop-blur-md"
        onMouseLeave={handleMegaLeave}
      >
        <div className="mx-auto flex h-14 md:h-[74px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          {/* Zone 1: Brand mark + wordmark */}
          <Link to="/" className="group focus-visible:rounded-lg shrink-0" aria-label="emtrc home">
            <EmtrcLogo />
          </Link>

          {/* Zone 2: Rich single-line navigation with Mega Menu triggers */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[var(--emtrc-muted)]"
          >
            <button
              type="button"
              data-testid="mega-trigger-services"
              aria-expanded={openMega === 'services'}
              onMouseEnter={() => handleMegaEnter('services')}
              onClick={() => handleMegaToggle('services')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                openMega === 'services' || isServicesActive
                  ? 'bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)] font-semibold'
                  : 'hover:text-[var(--emtrc-ink)]'
              }`}
            >
              <span>{t.nav.services}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  openMega === 'services' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <NavLink
              to="/work"
              onMouseEnter={() => setOpenMega(null)}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive
                    ? 'text-[var(--emtrc-ink)] font-semibold underline underline-offset-8 decoration-2 decoration-[var(--emtrc-accent)]'
                    : 'hover:text-[var(--emtrc-ink)]'
                }`
              }
            >
              {t.nav.work}
            </NavLink>

            <NavLink
              to="/pricing"
              onMouseEnter={() => setOpenMega(null)}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive
                    ? 'text-[var(--emtrc-ink)] font-semibold underline underline-offset-8 decoration-2 decoration-[var(--emtrc-accent)]'
                    : 'hover:text-[var(--emtrc-ink)]'
                }`
              }
            >
              {t.nav.pricing}
            </NavLink>

            <NavLink
              to="/ai-tools"
              onMouseEnter={() => setOpenMega(null)}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive
                    ? 'text-[var(--emtrc-ink)] font-semibold underline underline-offset-8 decoration-2 decoration-[var(--emtrc-accent)]'
                    : 'hover:text-[var(--emtrc-ink)]'
                }`
              }
            >
              {t.nav.aiTools}
            </NavLink>

            <NavLink
              to="/blog"
              onMouseEnter={() => setOpenMega(null)}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
                isBlogActive
                  ? 'text-[var(--emtrc-ink)] font-semibold underline underline-offset-8 decoration-2 decoration-[var(--emtrc-accent)]'
                  : 'hover:text-[var(--emtrc-ink)]'
              }`}
            >
              {t.nav.blog}
            </NavLink>

            <button
              type="button"
              data-testid="mega-trigger-resources"
              aria-expanded={openMega === 'resources'}
              onMouseEnter={() => handleMegaEnter('resources')}
              onClick={() => handleMegaToggle('resources')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                openMega === 'resources' || pathname === '/resources' || pathname === '/how-it-works'
                  ? 'bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)] font-semibold'
                  : 'hover:text-[var(--emtrc-ink)]'
              }`}
            >
              <span>{t.nav.resources}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  openMega === 'resources' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <NavLink
              to="/about"
              onMouseEnter={() => setOpenMega(null)}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors ${
                  isActive
                    ? 'text-[var(--emtrc-ink)] font-semibold underline underline-offset-8 decoration-2 decoration-[var(--emtrc-accent)]'
                    : 'hover:text-[var(--emtrc-ink)]'
                }`
              }
            >
              {t.nav.about}
            </NavLink>
          </nav>

          {/* Zone 3: Theme switch + Primary CTA + Mobile menu trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
            >
              {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>

            <Link
              to="/free-demo"
              className="group hidden sm:inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[var(--emtrc-accent-hover)]"
            >
              <span>{t.nav.freeDemoCta}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

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

        {/* Desktop Mega Menu Panels (Klyara-grade structured dropdown linking to all 8 individual service pages) */}
        <AnimatePresence>
          {openMega && (
            <motion.div
              key={openMega}
              data-testid={`mega-panel-${openMega}`}
              initial={prefersReduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => handleMegaEnter(openMega)}
              onMouseLeave={handleMegaLeave}
              className="hidden lg:block absolute inset-x-0 top-full border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] shadow-xl"
            >
              <div className="mx-auto max-w-[1200px] px-8 pt-7 pb-6">
                {openMega === 'services' ? (
                  <>
                    <div className="grid grid-cols-12 gap-8">
                      {SITE.megaMenu.services.map((col, idx) => (
                        <div
                          key={col.heading}
                          className={`col-span-3 ${
                            idx > 0 ? 'border-l border-[var(--emtrc-border)] pl-7' : ''
                          }`}
                        >
                          <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                            {serviceHeadings[idx] ?? col.heading}
                          </p>
                          <ul className="mt-4 space-y-3.5">
                            {col.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  onClick={() => setOpenMega(null)}
                                  className="group block rounded-lg p-1.5 -mx-1.5 transition-colors hover:bg-[var(--emtrc-sand)]"
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

                      {/* Column 4: Dark Spotlight Cards */}
                      <div className="col-span-3 border-l border-[var(--emtrc-border)] pl-7 space-y-3">
                        <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                          {t.megaHeadings.startOnUs}
                        </p>
                        {SITE.megaMenu.servicesSpotlights.map((spot) => (
                          <Link
                            key={spot.title}
                            to={spot.to}
                            onClick={() => setOpenMega(null)}
                            className="group block rounded-xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-4 text-[#F5F3EE] transition-transform duration-150 hover:-translate-y-0.5"
                          >
                            <p className="font-editorial text-sm font-bold text-white">{spot.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-[#BAC5DC]">
                              {spot.description}
                            </p>
                            <p className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[var(--emtrc-brass-light)]">
                              <span>{spot.cta}</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mega Menu Bottom Utility Strip */}
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-4 text-xs font-semibold">
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
                          className="text-[var(--emtrc-brass)] hover:underline"
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
                  <div className="grid grid-cols-12 gap-8">
                    {SITE.megaMenu.resources.map((col, idx) => (
                      <div
                        key={col.heading}
                        className={`col-span-4 ${
                          idx > 0 ? 'border-l border-[var(--emtrc-border)] pl-7' : ''
                        }`}
                      >
                        <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                          {resourceHeadings[idx] ?? col.heading}
                        </p>
                        <ul className="mt-4 space-y-3.5">
                          {col.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.to}
                                onClick={() => setOpenMega(null)}
                                className="group block rounded-lg p-1.5 -mx-1.5 transition-colors hover:bg-[var(--emtrc-sand)]"
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

                    <div className="col-span-4 border-l border-[var(--emtrc-border)] pl-7">
                      <Link
                        to="/blog"
                        onClick={() => setOpenMega(null)}
                        className="group block h-full rounded-xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-5 text-[#F5F3EE]"
                      >
                        <p className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                          {t.homeSections.blogKicker}
                        </p>
                        <p className="mt-1.5 font-editorial text-lg font-bold text-white">
                          Plain-English London guides &amp; free PDFs.
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#BAC5DC]">
                          Read our articles on Jan 2027 PSTN switch-off, Google Maps rankings, missed-call capture and domain ownership.
                        </p>
                        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-brass-light)]">
                          <span>{t.homeSections.blogAllLink}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </p>
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
            {/* Mobile Language Selector Strip */}
            <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-muted)]">
                <Globe className="h-3.5 w-3.5 text-[var(--emtrc-brass)]" aria-hidden="true" />
                <span>Language</span>
              </div>
              <div className="flex items-center gap-1" role="group" aria-label="Language selector">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    data-testid={`mobile-lang-${lang.code}`}
                    onClick={() => setLocale(lang.code)}
                    className={`rounded-md px-2 py-1 text-xs font-bold transition-colors ${
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
                  <Link to="/resources#guides" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    {t.nav.pdfLibrary}
                  </Link>
                  <Link to="/how-it-works" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    {t.nav.howItWorks}
                  </Link>
                  <Link to="/resources#faq" className="block rounded-md px-3 py-1.5 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
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

      {/* Deep Midnight Editorial Footer */}
      <footer className="overflow-hidden border-t border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#D6DEF0]">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-8 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Link to="/" aria-label="emtrc home">
                <EmtrcLogo inverted />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#A9B5CE]">
                Websites, domains, business email and AI front-office tools for London local businesses. Built, hosted and looked after for one monthly price.
              </p>
              <div className="mt-6 space-y-2.5 text-sm">
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
                <p className="text-xs text-[#8E9BB5]">{SITE.brand.serviceArea}</p>
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="font-body text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                {t.footer.services}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#BAC5DC]">
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
              <h2 className="font-body text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                {t.footer.guidesDemos}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#BAC5DC]">
                <li><Link to="/free-demo" className="hover:text-white transition-colors">{t.nav.freeDemoCta}</Link></li>
                <li><Link to="/work" className="hover:text-white transition-colors">Live London demos (15)</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">The emtrc Blog &amp; Journal</Link></li>
                <li><Link to="/resources#guide-website-checklist" className="hover:text-white transition-colors">London Website Checklist (PDF)</Link></li>
                <li><Link to="/resources#guide-pstn-2027" className="hover:text-white transition-colors">PSTN Jan 2027 Guide (PDF)</Link></li>
                <li><Link to="/resources#guide-maps-ai" className="hover:text-white transition-colors">Maps &amp; AI Search Playbook (PDF)</Link></li>
                <li><Link to="/resources#faq" className="hover:text-white transition-colors">Straight answers (FAQ)</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="font-body text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                {t.footer.company}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#BAC5DC]">
                <li><Link to="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link></li>
                <li><Link to="/ai-tools" className="hover:text-white transition-colors">{t.nav.aiTools}</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--emtrc-navy-border)] pt-6 text-xs text-[#8E9BB5] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.brand.legalLine}
            </p>
            <p>
              {SITE.flags.showExVat ? 'All prices ex VAT · ' : ''}{t.footer.noCookies}
            </p>
          </div>

          {/* Tasteful architectural footer sign-off wordmark */}
          <div aria-hidden="true" className="mt-8 select-none overflow-hidden border-t border-[#182548] pt-4 text-center">
            <p className="font-editorial text-[clamp(3.2rem,13vw,9.5rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-white/[0.045]">
              emtrc london
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
