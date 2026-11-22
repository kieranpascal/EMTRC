import { PageHead } from '../components/PageHead';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';
import { HoursAndAreasSection } from '../components/sections/HoursAndAreasSection';
import { ReviewsSection } from '../components/sections/ReviewsSection';

export function AboutPage() {
  return (
    <>
      <PageHead pageKey="about" />
      <AboutSection isStandalonePage />
      <ReviewsSection />
      <HoursAndAreasSection />
      <ContactSection />
    </>
  );
}
