import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SiteProvider, useSite } from '../../context/SiteContext';
import { SiteLayout } from '../../components/SiteLayout';
import { HomePage } from '../HomePage';
import { ServicesPage } from '../ServicesPage';
import { GalleryPage } from '../GalleryPage';
import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function DemoInnerRoutes({ basePath }: { basePath: string }) {
  const { site, activePresetId } = useSite();
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <SiteLayout basePath={basePath}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePresetId}-${location.pathname}`}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <Routes location={location}>
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
        </motion.div>
      </AnimatePresence>
    </SiteLayout>
  );
}

export function EmtrcLiveDemoPage() {
  const { presetId } = useParams<{ presetId: string }>();
  const resolvedPresetId = presetId || 'barber-bold-hackney';
  const basePath = `/demos/${resolvedPresetId}`;

  return (
    <SiteProvider initialPresetId={resolvedPresetId}>
      <DemoInnerRoutes basePath={basePath} />
    </SiteProvider>
  );
}
