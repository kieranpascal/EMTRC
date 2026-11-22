import { PageHead } from '../components/PageHead';
import { ContactSection } from '../components/sections/ContactSection';
import { QuoteFormSection } from '../components/sections/QuoteFormSection';
import { ServicesSection } from '../components/sections/ServicesSection';

export function ServicesPage() {
  return (
    <>
      <PageHead pageKey="services" />
      <ServicesSection isStandalonePage />
      <QuoteFormSection />
      <ContactSection />
    </>
  );
}
