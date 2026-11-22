import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Menu, Phone, X } from 'lucide-react';
import { PREVIEW_PRESET_GROUPS, useSite } from '../context/SiteContext';
import { getEnabledNavItems, getNicheLabels } from '../utils/niche';
import { normalizeTelHref, normalizeWhatsappHref } from '../utils/seo';
import { DemoBanner } from './DemoBanner';

interface SiteLayoutProps {
  children: ReactNode;
  basePath?: string;
}

export function SiteLayout({ children, basePath = '' }: SiteLayoutProps) {
  const { site, theme, previewEnabled, activePresetId, selectPreset } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--site-bg)] text-[var(--site-ink)] pb-14 md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--site-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--site-accent-ink)]"
      >
        Skip to main content
      </a>

      <DemoBanner />

      {/* Non-sticky Template Example Switcher — ONLY rendered when showTemplatePreview is true in root site.json */}
      {previewEnabled && (
        <div
          data-testid="template-preview-bar"
          className="border-b border-[#242938] bg-[#10131C] text-[#E6E9F2]"
        >
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-5 py-1.5 sm:px-8 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <label
                htmlFor="template-preset-select"
                className="font-semibold text-white whitespace-nowrap shrink-0"
              >
                Preview example:
              </label>
              <select
                id="template-preset-select"
                data-testid="template-preview-select"
                value={activePresetId}
                onChange={(event) => {
                  const nextId = event.target.value;
                  selectPreset(nextId);
                  navigate(basePath ? `/demos/${nextId}` : '/');
                }}
                className="max-w-[250px] sm:max-w-[390px] rounded border border-[#343B50] bg-[#181D2B] px-2.5 py-1 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#6B8AFF]"
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
            <p className="hidden md:block text-[11px] text-[#A9B2C7]">
              5 London niches × 3 styles (15 examples) · powered by public/site.json
            </p>
          </div>
        </div>
      )}

      {/* Strict 3-zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-[var(--site-border)] bg-[var(--site-bg)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 md:h-16 max-w-[1200px] items-center justify-between gap-6 md:gap-8 px-5 sm:px-8">
          {/* Zone 1: Single-line brand wordmark */}
          <Link
            to={homePath}
            className={`font-display text-lg sm:text-xl font-bold text-[var(--site-ink)] whitespace-nowrap shrink-0 truncate max-w-[230px] sm:max-w-[300px] ${theme.headingTracking} ${theme.headingTransform}`}
          >
            {site.businessName}
          </Link>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--site-muted)]"
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
                  className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[var(--site-ink)]"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.key}
                  to={resolvePath(item.to)}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `whitespace-nowrap shrink-0 py-1 transition-colors duration-150 ${
                      isActive
                        ? 'text-[var(--site-ink)] underline underline-offset-8 decoration-2 decoration-[var(--site-accent)]'
                        : 'hover:text-[var(--site-ink)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {site.bookingUrl?.trim() ? (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:inline-flex items-center justify-center bg-[var(--site-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
              >
                {bookingLabel}
              </a>
            ) : (
              <a
                href={normalizeTelHref(site.phone)}
                className={`hidden sm:inline-flex items-center gap-2 bg-[var(--site-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="tabular-nums">{site.phone}</span>
              </a>
            )}

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
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-[var(--site-border)] bg-[var(--site-surface)] px-5 py-5"
          >
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
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link
                to={homePath}
                className={`font-display inline-block text-xl font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
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

            <div className="md:col-span-3">
              <h2 className="font-body text-sm font-semibold text-[var(--site-ink)]">Pages</h2>
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
                      <Link to={resolvePath(item.to)} className="transition-colors hover:text-[var(--site-ink)]">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <h2 className="font-body text-sm font-semibold text-[var(--site-ink)]">Contact</h2>
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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--site-border)] pt-6 text-xs text-[var(--site-muted)]">
            <p>
              © {new Date().getFullYear()} {site.businessName} · {site.borough}, London
            </p>
            {site.demoMode && <p>Demo site prepared by emtrc</p>}
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
