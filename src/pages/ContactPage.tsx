import { PageHead } from '../components/PageHead';
import { ContactSection } from '../components/sections/ContactSection';
import { HoursAndAreasSection } from '../components/sections/HoursAndAreasSection';
import { QuoteFormSection } from '../components/sections/QuoteFormSection';

export function ContactPage() {
  return (
    <>
      <PageHead pageKey="contact" />
      <ContactSection isStandalonePage />
      <QuoteFormSection />
      <HoursAndAreasSection />
    </>
  );
}
