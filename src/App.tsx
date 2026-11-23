import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { EmtrcHomePage } from './pages/emtrc/EmtrcHomePage';
import { EmtrcAppPage } from './pages/emtrc/EmtrcAppPage';
import { EmtrcPortalPage } from './pages/emtrc/EmtrcPortalPage';
import { EmtrcServicesPage } from './pages/emtrc/EmtrcServicesPage';
import { EmtrcServiceDetailPage } from './pages/emtrc/EmtrcServiceDetailPage';
import { EmtrcPricingPage } from './pages/emtrc/EmtrcPricingPage';
import { EmtrcHowItWorksPage } from './pages/emtrc/EmtrcHowItWorksPage';
import { EmtrcWorkPage } from './pages/emtrc/EmtrcWorkPage';
import { EmtrcCaseStudiesPage } from './pages/emtrc/EmtrcCaseStudiesPage';
import { EmtrcCaseStudyDetailPage } from './pages/emtrc/EmtrcCaseStudyDetailPage';
import { EmtrcTrainingPage } from './pages/emtrc/EmtrcTrainingPage';
import { EmtrcFaqPage } from './pages/emtrc/EmtrcFaqPage';
import { EmtrcAiToolsPage } from './pages/emtrc/EmtrcAiToolsPage';
import { EmtrcResourcesPage } from './pages/emtrc/EmtrcResourcesPage';
import { EmtrcBlogPage } from './pages/emtrc/EmtrcBlogPage';
import { EmtrcBlogArticlePage } from './pages/emtrc/EmtrcBlogArticlePage';
import { EmtrcAboutPage } from './pages/emtrc/EmtrcAboutPage';
import { EmtrcContactPage } from './pages/emtrc/EmtrcContactPage';
import { EmtrcFreeDemoPage } from './pages/emtrc/EmtrcFreeDemoPage';
import { EmtrcPrivacyPage, EmtrcTermsPage } from './pages/emtrc/EmtrcLegalPages';
import { EmtrcLiveDemoPage } from './pages/emtrc/EmtrcLiveDemoPage';

const PAGE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (!location.hash) {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
      }}
    >
      <motion.div
        key={location.pathname}
        data-testid="page-transition-wrapper"
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.26, ease: PAGE_EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<EmtrcHomePage />} />
          <Route path="/app" element={<EmtrcAppPage />} />
          <Route path="/portal" element={<EmtrcPortalPage />} />
          <Route path="/services" element={<EmtrcServicesPage />} />
          <Route path="/services/:slug" element={<EmtrcServiceDetailPage />} />
          <Route path="/pricing" element={<EmtrcPricingPage />} />
          <Route path="/how-it-works" element={<EmtrcHowItWorksPage />} />
          <Route path="/work" element={<EmtrcWorkPage />} />
          <Route path="/case-studies" element={<EmtrcCaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<EmtrcCaseStudyDetailPage />} />
          <Route path="/training" element={<EmtrcTrainingPage />} />
          <Route path="/faq" element={<EmtrcFaqPage />} />
          <Route path="/ai-tools" element={<EmtrcAiToolsPage />} />
          <Route path="/blog" element={<EmtrcBlogPage />} />
          <Route path="/blog/:slug" element={<EmtrcBlogArticlePage />} />
          <Route path="/resources" element={<EmtrcResourcesPage />} />
          <Route path="/about" element={<EmtrcAboutPage />} />
          <Route path="/contact" element={<EmtrcContactPage />} />
          <Route path="/free-demo" element={<EmtrcFreeDemoPage />} />
          <Route path="/privacy" element={<EmtrcPrivacyPage />} />
          <Route path="/terms" element={<EmtrcTermsPage />} />
          <Route path="/demos/:presetId/*" element={<EmtrcLiveDemoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
