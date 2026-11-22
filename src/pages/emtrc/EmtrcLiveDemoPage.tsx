import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteProvider, useSite } from '../../context/SiteContext';
import { SiteLayout } from '../../components/SiteLayout';
import { HomePage } from '../HomePage';
import { ServicesPage } from '../ServicesPage';
import { GalleryPage } from '../GalleryPage';
import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';

function DemoInnerRoutes({ basePath }: { basePath: string }) {
  const { site } = useSite();

  return (
    <SiteLayout basePath={basePath}>
      <Routes>
        <Route index element={<HomePage />} />
        {site.pages.services && <Route path="services" element={<ServicesPage />} />}
        {site.pages.services && site.niche === 'cafe' && (
          <Route path="menu" element={<ServicesPage />} />
        )}
        {site.pages.gallery && site.gallery.length > 0 && (
          <Route path="gallery" element={<GalleryPage />} />
        )}
        {site.pages.about && <Route path="about" element={<AboutPage />} />}
        {site.pages.contact && <Route path="contact" element={<ContactPage />} />}
        <Route path="*" element={<Navigate to={basePath} replace />} />
      </Routes>
    </SiteLayout>
  );
}

export function EmtrcLiveDemoPage() {
  const { presetId } = useParams<{ presetId: string }>();
  const resolvedPresetId = presetId || 'barber-bold-hackney';
  const basePath = `/demos/${resolvedPresetId}`;

  return (
    <div>
      {/* Slim editorial return strip back to emtrc.com */}
      <div
        data-testid="emtrc-demo-return-bar"
        className="border-b border-[#1E2B4D] bg-[#0B132B] text-[#DCE3F2]"
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2 sm:px-8 text-xs">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#D99B43] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to emtrc.com · All 15 demos</span>
          </Link>
          <Link
            to="/free-demo"
            className="inline-flex items-center gap-1.5 font-semibold text-[#D99B43] hover:text-white transition-colors"
          >
            <span>Want a free demo like this?</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <SiteProvider initialPresetId={resolvedPresetId}>
        <DemoInnerRoutes basePath={basePath} />
      </SiteProvider>
    </div>
  );
}
