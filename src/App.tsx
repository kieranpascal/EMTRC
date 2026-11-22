import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { SiteProvider, useSite } from './context/SiteContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';

function DynamicRoutes() {
  const { site } = useSite();

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {site.pages.services && <Route path="/services" element={<ServicesPage />} />}
        {site.pages.services && site.niche === 'cafe' && (
          <Route path="/menu" element={<ServicesPage />} />
        )}
        {site.pages.gallery && site.gallery.length > 0 && (
          <Route path="/gallery" element={<GalleryPage />} />
        )}
        {site.pages.about && <Route path="/about" element={<AboutPage />} />}
        {site.pages.contact && <Route path="/contact" element={<ContactPage />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <DynamicRoutes />
      </BrowserRouter>
    </SiteProvider>
  );
}
