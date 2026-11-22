import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EmtrcHomePage } from './pages/emtrc/EmtrcHomePage';
import { EmtrcServicesPage } from './pages/emtrc/EmtrcServicesPage';
import { EmtrcPricingPage } from './pages/emtrc/EmtrcPricingPage';
import { EmtrcHowItWorksPage } from './pages/emtrc/EmtrcHowItWorksPage';
import { EmtrcWorkPage } from './pages/emtrc/EmtrcWorkPage';
import { EmtrcAiToolsPage } from './pages/emtrc/EmtrcAiToolsPage';
import { EmtrcResourcesPage } from './pages/emtrc/EmtrcResourcesPage';
import { EmtrcAboutPage } from './pages/emtrc/EmtrcAboutPage';
import { EmtrcContactPage } from './pages/emtrc/EmtrcContactPage';
import { EmtrcFreeDemoPage } from './pages/emtrc/EmtrcFreeDemoPage';
import { EmtrcPrivacyPage, EmtrcTermsPage } from './pages/emtrc/EmtrcLegalPages';
import { EmtrcLiveDemoPage } from './pages/emtrc/EmtrcLiveDemoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmtrcHomePage />} />
        <Route path="/services" element={<EmtrcServicesPage />} />
        <Route path="/pricing" element={<EmtrcPricingPage />} />
        <Route path="/how-it-works" element={<EmtrcHowItWorksPage />} />
        <Route path="/work" element={<EmtrcWorkPage />} />
        <Route path="/ai-tools" element={<EmtrcAiToolsPage />} />
        <Route path="/resources" element={<EmtrcResourcesPage />} />
        <Route path="/about" element={<EmtrcAboutPage />} />
        <Route path="/contact" element={<EmtrcContactPage />} />
        <Route path="/free-demo" element={<EmtrcFreeDemoPage />} />
        <Route path="/privacy" element={<EmtrcPrivacyPage />} />
        <Route path="/terms" element={<EmtrcTermsPage />} />
        <Route path="/demos/:presetId/*" element={<EmtrcLiveDemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
