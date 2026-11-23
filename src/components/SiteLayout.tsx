import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Menu, Phone, X } from 'lucide-react';
import { PREVIEW_PRESET_GROUPS, useSite } from '../context/SiteContext';
import { getEnabledNavItems, getNicheLabels } from '../utils/niche';
import { normalizeTelHref, normalizeWhatsappHref } from '../utils/seo';
import { DemoBanner } from './DemoBanner';
import { EmtrcMark } from './emtrc/EmtrcLogo';
import { MagneticLink } from './emtrc/MagneticLink';

interface SiteLayoutProps {
  children: ReactNode;
  basePath?: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SiteLayout({ children, basePath = '' }: SiteLayoutProps) {
  const { site, theme, blueprint, previewEnabled, activePresetId, selectPreset } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  const homePath = basePath || '/';
  const resolvePath = (to: string) => {
    if (!basePath) return to;
    if (to === '/') return basePath;
    if (to.startsWith('/#')) return `${basePath}${to.slice(1)}`;
    return `${basePath}${to}`;
  };

  const navItems = getEnabledNavItems(site);
  const labels = getNicheLabels(site.niche);
  const bookingLabel = site.bookingLabel?.trim() || labels.defaultBookingLabel;

  useEffect(() => {
    setMobileMenuOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (to: string) => {
    setMobileMenuOpen(false);
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      if (pathname !== homePath) {
        navigate(resolvePath(to));
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderPrimaryCta = () => {
    if (site.bookingUrl?.trim()) {
      return (
        <MagneticLink
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          strength={0.22}
          maxOffset={7}
          wrapperClassName="hidden sm:inline-flex"
          className={`inline-flex items-center justify-center bg-[var(--site-accent)] px-4 py-2 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
        >
          {bookingLabel}
        </MagneticLink>
      );
    }
    return (
      <MagneticLink
        href={normalizeTelHref(site.phone)}
        strength={0.22}
        maxOffset={7}
        wrapperClassName="hidden sm:inline-flex"
        className={`inline-flex items-center gap-2 bg-[var(--site-accent)] px-4 py-2 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
      >
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="tabular-nums">{site.phone}</span>
      </MagneticLink>
    );
  };

  const renderNavLinks = (alignClass = '') => (
    <nav
      aria-label="Primary navigation"
      className={`hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[var(--site-muted)] ${alignClass}`}
    >
      {navItems.map((item) =>
        item.to.startsWith('/#') ? (
          <a
            key={item.key}
            href={item.to}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.to);
            }}
            className="relative whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[var(--site-ink)]"
          >
            {item.label}
          </a>
        ) : (
          <NavLink
            key={item.key}
            to={resolvePath(item.to)}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative whitespace-nowrap shrink-0 py-1 transition-colors duration-150 ${
                isActive ? 'text-[var(--site-ink)] font-semibold' : 'hover:text-[var(--site-ink)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId={`demo-nav-active-${activePresetId}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute right-0 -bottom-0.5 left-0 h-[2px] bg-[var(--site-accent)]"
                  />
                )}
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  );

  const isCenteredHeader = blueprint.headerStyle === 'centered-masthead';
  const isMinimalHeader = blueprint.headerStyle === 'minimal-underline';

  return (
    <div
      data-demo-site="true"
      data-archetype={blueprint.archetype}
      data-font-pair={blueprint.fontPairId}
      style={theme.cssVars as CSSProperties}
      className="min-h-screen flex flex-col overflow-x-clip bg-[var(--site-bg)] text-[var(--site-ink)] pb-14 md:pb-0 transition-colors duration-300"
    >
      {/* Demo-Tinted Scroll Progress Bar */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2.5px] bg-[var(--site-accent)]"
        />
      )}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--site-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--site-accent-ink)]"
      >
        Skip to main content
      </a>

      {/* Unified Single Showcase Bar when viewed inside /demos/:presetId */}
      {basePath ? (
        <div
          data-testid="template-preview-bar"
          className="border-b border-[#1E2638] bg-[#0B1120] text-[#E6E9F2]"
        >
          <div
            data-testid="emtrc-demo-return-bar"
            className="mx-auto flex max-w-[1200px] items-center justify-between gap-2.5 px-4 py-2 sm:px-8 text-xs"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Link
                to="/work"
                aria-label="Back to emtrc showcase · All 15 demos"
                className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#D99B43] transition-colors shrink-0"
              >
                <EmtrcMark inverted className="h-4 w-4 shrink-0" />
                <ArrowLeft className="h-3.5 w-3.5 hidden sm:inline shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">All 15 demos</span>
              </Link>
              <span className="hidden sm:inline text-[#394563]" aria-hidden="true">
                |
              </span>
              <label htmlFor="template-preset-select" className="sr-only">
                Switch demo example
              </label>
              <select
                id="template-preset-select"
                data-testid="template-preview-select"
                value={activePresetId}
                onChange={(event) => {
                  const nextId = event.target.value;
                  selectPreset(nextId);
                  navigate(`/demos/${nextId}`);
                }}
                className="min-w-0 flex-1 sm:flex-none sm:w-[320px] max-w-full rounded border border-[#2C3752] bg-[#141B2D] px-2.5 py-1 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#D99B43]"
              >
                {PREVIEW_PRESET_GROUPS.map((group) => (
                  <optgroup key={group.group} label={group.group}>
                    {group.options.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="hidden xl:inline font-mono-data text-[11px] text-[#9AA6C1]">
                {blueprint.fontLabel} · {blueprint.archetype.replace('-', ' ')}
              </span>
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-1 font-semibold text-[#F1BA63] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span className="hidden sm:inline">Want a free demo?</span>
                <span className="sm:hidden">Free demo</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <DemoBanner />
          {previewEnabled && (
            <div
              data-testid="template-preview-bar"
              className="border-b border-[#242938] bg-[#10131C] text-[#E6E9F2]"
            >
              <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-5 py-1.5 sm:px-8 text-xs">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <Link
                    to="/work"
                    aria-label="Back to emtrc showcase"
                    className="inline-flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity"
                  >
                    <EmtrcMark inverted className="h-5 w-5" />
                  </Link>
                  <label
                    htmlFor="template-preset-select"
                    className="font-semibold text-white whitespace-nowrap shrink-0"
                  >
                    Preview:
                  </label>
                  <select
                    id="template-preset-select"
                    data-testid="template-preview-select"
                    value={activePresetId}
                    onChange={(event) => {
                      const nextId = event.target.value;
                      selectPreset(nextId);
                      navigate('/');
                    }}
                    className="min-w-0 flex-1 sm:flex-none sm:w-[340px] max-w-full rounded border border-[#343B50] bg-[#181D2B] px-2.5 py-1 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#6B8AFF]"
                  >
                    {PREVIEW_PRESET_GROUPS.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.options.map((preset) => (
                          <option key={preset.id} value={preset.id}>
                            {preset.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <p className="hidden lg:block font-mono-data text-[11px] text-[#A9B2C7]">
                  {blueprint.fontLabel} · {blueprint.archetype.replace('-', ' ')}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Strict 3-zone Top Bar Contract — Visually Differentiated by Header Style */}
      <header
        data-header-style={blueprint.headerStyle}
        className={`sticky top-0 z-40 transition-colors ${
          isMinimalHeader
            ? 'border-b border-[var(--site-ink)]/15 bg-[var(--site-bg)]/95 backdrop-blur-md'
            : 'border-b border-[var(--site-border)] bg-[var(--site-bg)]/92 backdrop-blur-xl'
        }`}
      >
        <div
          className={`mx-auto flex h-14 md:h-[68px] max-w-[1200px] items-center justify-between gap-4 md:gap-6 px-5 sm:px-8 ${
            isCenteredHeader ? 'md:grid md:grid-cols-12' : ''
          }`}
        >
          {isCenteredHeader ? (
            <>
              {/* Centered Masthead: Left Nav · Center Brand · Right Primary Action */}
              <div className="hidden md:flex md:col-span-4 items-center">
                {renderNavLinks('gap-4 lg:gap-5')}
              </div>
              <div className="flex items-center md:col-span-5 md:justify-center min-w-0">
                <Link
                  to={homePath}
                  className={`font-display text-lg sm:text-[1.28rem] font-bold text-[var(--site-ink)] whitespace-nowrap shrink-0 ${theme.headingTracking} ${theme.headingTransform}`}
                >
                  {site.businessName}
                </Link>
              </div>
              <div className="flex items-center justify-end gap-3 md:col-span-3 shrink-0">
                {renderPrimaryCta()}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className={`inline-flex md:hidden h-10 w-10 items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] ${theme.buttonRadius}`}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Classic Split & Minimal Underline: Left Brand · Center Nav · Right Primary Action */}
              <Link
                to={homePath}
                className={`font-display text-lg sm:text-xl font-bold text-[var(--site-ink)] whitespace-nowrap shrink-0 truncate max-w-[220px] sm:max-w-[300px] ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {site.businessName}
              </Link>

              {renderNavLinks()}

              <div className="flex items-center gap-3 shrink-0">
                {renderPrimaryCta()}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className={`inline-flex md:hidden h-10 w-10 items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] ${theme.buttonRadius}`}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Animated Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={prefersReduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="md:hidden overflow-hidden border-t border-[var(--site-border)] bg-[var(--site-surface)]"
            >
              <div className="px-5 py-5">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      {item.to.startsWith('/#') ? (
                        <a
                          href={item.to}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.to);
                          }}
                          className="block rounded-md px-3 py-3 text-base font-medium text-[var(--site-ink)] hover:bg-[var(--site-surface-alt)]"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <NavLink
                          to={resolvePath(item.to)}
                          end={item.to === '/'}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block rounded-md px-3 py-3 text-base font-medium ${
                              isActive
                                ? 'bg-[var(--site-surface-alt)] text-[var(--site-accent-text)] font-semibold'
                                : 'text-[var(--site-ink)] hover:bg-[var(--site-surface-alt)]'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-col gap-2.5 border-t border-[var(--site-border)] pt-4">
                  {site.bookingUrl?.trim() && (
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center gap-2 bg-[var(--site-accent)] px-5 py-3 text-sm font-semibold text-[var(--site-accent-ink)] ${theme.buttonRadius}`}
                    >
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{bookingLabel}</span>
                    </a>
                  )}
                  <a
                    href={normalizeTelHref(site.phone)}
                    className={`flex w-full items-center justify-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-5 py-3 text-sm font-semibold text-[var(--site-ink)] tabular-nums ${theme.buttonRadius}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Call {site.phone}</span>
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Archetype-Differentiated Editorial Demo Footer */}
      <footer className="border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          {blueprint.archetype === 'atelier-magazine' ? (
            <div className="text-center">
              <Link
                to={homePath}
                className={`font-display inline-block text-3xl sm:text-4xl font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {site.businessName}
              </Link>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--site-muted)]">
                {site.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--site-muted)]">
                {navItems.map((item) =>
                  item.to.startsWith('/#') ? (
                    <a
                      key={item.key}
                      href={item.to}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.to);
                      }}
                      className="transition-colors hover:text-[var(--site-ink)]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.key}
                      to={resolvePath(item.to)}
                      className="transition-colors hover:text-[var(--site-ink)]"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--site-muted)]">
                <a
                  href={normalizeTelHref(site.phone)}
                  className="font-semibold tabular-nums text-[var(--site-ink)] underline underline-offset-4"
                >
                  {site.phone}
                </a>
                {site.address?.trim() && <span>{site.address}</span>}
                {site.email?.trim() && (
                  <a href={`mailto:${site.email}`} className="hover:text-[var(--site-ink)]">
                    {site.email}
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div
              className={
                blueprint.archetype === 'swiss-grid'
                  ? 'grid grid-cols-1 border border-[var(--site-border)] bg-[var(--site-bg)] md:grid-cols-12 md:divide-x md:divide-[var(--site-border)]'
                  : 'grid grid-cols-1 gap-10 md:grid-cols-12'
              }
            >
              <div className={blueprint.archetype === 'swiss-grid' ? 'p-6 md:col-span-5' : 'md:col-span-5'}>
                <Link
                  to={homePath}
                  className={`font-display inline-block font-bold text-[var(--site-ink)] ${
                    blueprint.archetype === 'editorial-cinema' ? 'text-3xl' : 'text-2xl'
                  } ${theme.headingTracking} ${theme.headingTransform}`}
                >
                  {site.businessName}
                </Link>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--site-muted)]">
                  {site.tagline}
                </p>
                {site.address?.trim() && (
                  <p className="mt-4 text-sm text-[var(--site-ink)]">{site.address}</p>
                )}
              </div>

              <div
                className={
                  blueprint.archetype === 'swiss-grid'
                    ? 'border-t border-[var(--site-border)] p-6 md:col-span-3 md:border-t-0'
                    : 'md:col-span-3'
                }
              >
                <h2 className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-muted)]">
                  Navigation
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-[var(--site-muted)]">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      {item.to.startsWith('/#') ? (
                        <a
                          href={item.to}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.to);
                          }}
                          className="transition-colors hover:text-[var(--site-ink)]"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={resolvePath(item.to)}
                          className="transition-colors hover:text-[var(--site-ink)]"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={
                  blueprint.archetype === 'swiss-grid'
                    ? 'border-t border-[var(--site-border)] p-6 md:col-span-4 md:border-t-0'
                    : 'md:col-span-4'
                }
              >
                <h2 className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-muted)]">
                  Direct Contact
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-[var(--site-muted)]">
                  <li>
                    <a
                      href={normalizeTelHref(site.phone)}
                      className="font-semibold tabular-nums text-[var(--site-ink)] underline underline-offset-4 hover:opacity-80"
                    >
                      {site.phone}
                    </a>
                  </li>
                  {site.whatsapp?.trim() && (
                    <li>
                      <a
                        href={normalizeWhatsappHref(site.whatsapp, site.businessName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[var(--site-ink)]"
                      >
                        WhatsApp us
                      </a>
                    </li>
                  )}
                  {site.email?.trim() && (
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="transition-colors hover:text-[var(--site-ink)]"
                      >
                        {site.email}
                      </a>
                    </li>
                  )}
                  {site.instagramUrl?.trim() && (
                    <li>
                      <a
                        href={site.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[var(--site-ink)]"
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--site-border)] pt-6 text-xs text-[var(--site-muted)]">
            <p>
              © {new Date().getFullYear()} {site.businessName} · {site.borough}, London
            </p>
            {site.demoMode && <p>Bespoke London demo crafted by emtrc</p>}
          </div>
        </div>
      </footer>

      {/* Compact Sticky Mobile Call Bar (<= 15% mobile viewport height) */}
      <div
        data-testid="sticky-mobile-cta"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--site-border)] bg-[var(--site-surface)]/95 px-3 py-2 backdrop-blur-sm md:hidden"
      >
        <div className="mx-auto flex max-w-md items-center gap-2">
          <a
            href={normalizeTelHref(site.phone)}
            className={`flex flex-1 items-center justify-center gap-1.5 bg-[var(--site-accent)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap ${theme.buttonRadius}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">Call {site.phone}</span>
          </a>
          {site.bookingUrl?.trim() && (
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center border border-[var(--site-border)] bg-[var(--site-bg)] px-3.5 py-2 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap ${theme.buttonRadius}`}
            >
              {bookingLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
