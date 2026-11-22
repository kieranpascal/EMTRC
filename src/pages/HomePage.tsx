import { PageHead } from '../components/PageHead';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';
import { GallerySection } from '../components/sections/GallerySection';
import { HeroSection } from '../components/sections/HeroSection';
import { HoursAndAreasSection } from '../components/sections/HoursAndAreasSection';
import { QuoteFormSection } from '../components/sections/QuoteFormSection';
import { ReviewsSection } from '../components/sections/ReviewsSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { useSite } from '../context/SiteContext';

export function HomePage() {
  const { site } = useSite();

  return (
    <>
      <PageHead pageKey="home" />
      <HeroSection />
      <ServicesSection showFullPageLink={site.pages.services} />
      <QuoteFormSection />
      <HoursAndAreasSection />
      <GallerySection showFullPageLink={site.pages.gallery} />
      <ReviewsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
