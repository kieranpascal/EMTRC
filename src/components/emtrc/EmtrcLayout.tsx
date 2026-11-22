import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { SITE } from '../../content/site';
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
  const [openMega, setOpenMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'services' | 'resources' | null>('services');
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setOpenMega(null);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
    setOpenMega(key);
  };

  const handleMegaLeave = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMega(null);
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)] paper-texture">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--emtrc-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Slim non-sticky desktop utility bar (Klyara rhythm; hidden on mobile to keep chrome compact) */}
      <div className="hidden md:block border-b border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#DCE3F2]">
        <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-between gap-6 px-8 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-semibold text-[var(--emtrc-brass-light)] whitespace-nowrap shrink-0">
              {SITE.announcement.label}
            </span>
            <span aria-hidden="true" className="text-[#516085]">·</span>
            <p className="truncate text-[#C7D0E4]">{SITE.announcement.text}</p>
            <Link
              to={SITE.announcement.to}
              className="whitespace-nowrap shrink-0 font-semibold text-white underline underline-offset-4 hover:text-[var(--emtrc-brass-light)]"
            >
              {SITE.announcement.linkLabel} →
            </Link>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <a
              href={SITE.brand.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#D6DEF0] hover:text-white transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <span>Book a free call</span>
            </a>
            <a
              href={`mailto:${SITE.brand.email}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#D6DEF0] hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <span>{SITE.brand.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Editorial Header + Mega Menu */}
      <header
        className="sticky top-0 z-40 border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]/92 backdrop-blur-md"
        onMouseLeave={handleMegaLeave}
      >
        <div className="mx-auto flex h-14 md:h-[74px] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
          {/* Zone 1: Brand mark + wordmark */}
          <Link to="/" className="group focus-visible:rounded-lg" aria-label="emtrc home">
            <EmtrcLogo />
          </Link>

          {/* Zone 2: Clean single-line navigation with Mega Menu triggers */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--emtrc-muted)]"
          >
            <button
              type="button"
              data-testid="mega-trigger-services"
              aria-expanded={openMega === 'services'}
              onMouseEnter={() => handleMegaEnter('services')}
              onClick={() => setOpenMega(openMega === 'services' ? null : 'services')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                openMega === 'services' || pathname === '/services' || pathname === '/ai-tools'
                  ? 'bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)] font-semibold'
                  : 'hover:text-[var(--emtrc-ink)]'
              }`}
            >
              <span>Services</span>
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
              Work
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
              Pricing
            </NavLink>

            <button
              type="button"
              data-testid="mega-trigger-resources"
              aria-expanded={openMega === 'resources'}
              onMouseEnter={() => handleMegaEnter('resources')}
              onClick={() => setOpenMega(openMega === 'resources' ? null : 'resources')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                openMega === 'resources' || pathname === '/resources' || pathname === '/how-it-works'
                  ? 'bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)] font-semibold'
                  : 'hover:text-[var(--emtrc-ink)]'
              }`}
            >
              <span>Resources</span>
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
              About
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
              <span>Get a free demo</span>
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

        {/* Desktop Mega Menu Panels (Klyara-grade structured dropdown) */}
        <AnimatePresence>
          {openMega && (
            <motion.div
              key={openMega}
              data-testid={`mega-panel-${openMega}`}
              initial={prefersReduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
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
                            {col.heading}
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

                      {/* Column 4: Dark Spotlight Cards (Klyara style) */}
                      <div className="col-span-3 border-l border-[var(--emtrc-border)] pl-7 space-y-3">
                        <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                          Start on us
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
                          All services →
                        </Link>
                        <Link
                          to="/pricing"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          Pricing & plans
                        </Link>
                        <Link
                          to="/ai-tools"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          AI tools
                        </Link>
                        <Link
                          to="/work"
                          onClick={() => setOpenMega(null)}
                          className="text-[var(--emtrc-brass)] hover:underline"
                        >
                          Browse 15 live London demos
                        </Link>
                      </div>
                      <a
                        href={SITE.brand.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--emtrc-accent)] hover:underline"
                      >
                        Book a free 15-minute call →
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
                          {col.heading}
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
                        to="/resources#guides"
                        onClick={() => setOpenMega(null)}
                        className="group block h-full rounded-xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-5 text-[#F5F3EE]"
                      >
                        <p className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                          Free PDF library
                        </p>
                        <p className="mt-1.5 font-editorial text-lg font-bold text-white">
                          Practical London playbooks — zero waffle.
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#BAC5DC]">
                          Download our Website Checklist, Jan 2027 PSTN Switch-Off Guide and Google Maps &amp; AI Search Playbook.
                        </p>
                        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-brass-light)]">
                          <span>Open free PDF library</span>
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

        {/* Mobile Drawer Navigation */}
        {mobileOpen && (
          <nav
            id="emtrc-mobile-nav"
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-5 max-h-[80vh] overflow-y-auto"
          >
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-[var(--emtrc-ink)]"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileSection === 'services' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileSection === 'services' && (
                <div className="space-y-1 pl-3 pb-2">
                  <Link to="/services" className="block rounded-md px-3 py-2 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    All services
                  </Link>
                  <Link to="/ai-tools" className="block rounded-md px-3 py-2 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    AI tools &amp; Business Phone
                  </Link>
                  <Link to="/how-it-works" className="block rounded-md px-3 py-2 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    How it works
                  </Link>
                </div>
              )}

              <Link to="/work" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                Work &amp; live demos
              </Link>
              <Link to="/pricing" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                Pricing
              </Link>

              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'resources' ? null : 'resources')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-[var(--emtrc-ink)]"
              >
                <span>Resources &amp; Free PDFs</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileSection === 'resources' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileSection === 'resources' && (
                <div className="space-y-1 pl-3 pb-2">
                  <Link to="/resources#guides" className="block rounded-md px-3 py-2 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    Free PDF guides
                  </Link>
                  <Link to="/resources#newsletter" className="block rounded-md px-3 py-2 text-sm text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]">
                    Fortnightly newsletter
                  </Link>
                </div>
              )}

              <Link to="/about" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                About
              </Link>
              <Link to="/contact" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--emtrc-ink)]">
                Contact
              </Link>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 border-t border-[var(--emtrc-border)] pt-5">
              <Link
                to="/free-demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white"
              >
                <span>Get my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE.brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Book a 15-minute call</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {!hideNewsletter && <NewsletterBand />}

      {/* Deep Midnight Editorial Footer (Klyara-grade density & clarity) */}
      <footer className="border-t border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#D6DEF0]">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-10 sm:px-8">
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
                    Book a 15-minute intro call →
                  </a>
                </p>
                <p className="text-xs text-[#8E9BB5]">{SITE.brand.serviceArea}</p>
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="font-body text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                Services
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#BAC5DC]">
                <li><Link to="/services#websites" className="hover:text-white transition-colors">Managed websites</Link></li>
                <li><Link to="/services#foundations" className="hover:text-white transition-colors">Domains &amp; business email</Link></li>
                <li><Link to="/ai-tools#review-engine" className="hover:text-white transition-colors">Review Engine</Link></li>
                <li><Link to="/ai-tools#lead-catcher" className="hover:text-white transition-colors">Lead Catcher (Chat + SMS)</Link></li>
                <li><Link to="/ai-tools#ai-receptionist" className="hover:text-white transition-colors">AI Receptionist</Link></li>
                <li><Link to="/ai-tools#business-phone" className="hover:text-white transition-colors">Business Phone (PSTN 2027)</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h2 className="font-body text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                Free guides &amp; demos
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#BAC5DC]">
                <li><Link to="/free-demo" className="hover:text-white transition-colors">Get a free demo</Link></li>
                <li><Link to="/work" className="hover:text-white transition-colors">Live London demos (15)</Link></li>
                <li><Link to="/resources#guide-website-checklist" className="hover:text-white transition-colors">London Website Checklist (PDF)</Link></li>
                <li><Link to="/resources#guide-pstn-2027" className="hover:text-white transition-colors">PSTN Jan 2027 Guide (PDF)</Link></li>
                <li><Link to="/resources#guide-maps-ai" className="hover:text-white transition-colors">Maps &amp; AI Search Playbook (PDF)</Link></li>
                <li><Link to="/resources#faq" className="hover:text-white transition-colors">Straight answers (FAQ)</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="font-body text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                Company
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#BAC5DC]">
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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
              {SITE.flags.showExVat ? 'All prices ex VAT · ' : ''}No cookies · No third-party trackers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
