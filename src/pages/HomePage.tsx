import { PageHead } from '../components/PageHead';
import {
  DemoCraftAndProcessSection,
  DemoLocalFaqSection,
} from '../components/demo/DemoProcessAndFaqSection';
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
  const { site, blueprint } = useSite();
  const archetype = blueprint.archetype;

  // Distinct scroll rhythms tailored to each design archetype so every demo feels bespoke
  if (archetype === 'atelier-magazine') {
    return (
      <>
        <PageHead pageKey="home" />
        <HeroSection />
        <AboutSection />
        <ServicesSection showFullPageLink={site.pages.services} />
        <GallerySection showFullPageLink={site.pages.gallery} />
        <DemoCraftAndProcessSection />
        <ReviewsSection />
        <HoursAndAreasSection />
        <QuoteFormSection />
        <DemoLocalFaqSection />
        <ContactSection />
      </>
    );
  }

  if (archetype === 'engineering-command') {
    return (
      <>
        <PageHead pageKey="home" />
        <HeroSection />
        <DemoCraftAndProcessSection />
        <ServicesSection showFullPageLink={site.pages.services} />
        <QuoteFormSection />
        <HoursAndAreasSection />
        <ReviewsSection />
        <GallerySection showFullPageLink={site.pages.gallery} />
        <AboutSection />
        <DemoLocalFaqSection />
        <ContactSection />
      </>
    );
  }

  if (archetype === 'swiss-grid') {
    return (
      <>
        <PageHead pageKey="home" />
        <HeroSection />
        <ServicesSection showFullPageLink={site.pages.services} />
        <GallerySection showFullPageLink={site.pages.gallery} />
        <DemoCraftAndProcessSection />
        <QuoteFormSection />
        <HoursAndAreasSection />
        <ReviewsSection />
        <AboutSection />
        <DemoLocalFaqSection />
        <ContactSection />
      </>
    );
  }

  if (archetype === 'gallery-minimal') {
    return (
      <>
        <PageHead pageKey="home" />
        <HeroSection />
        <GallerySection showFullPageLink={site.pages.gallery} />
        <ServicesSection showFullPageLink={site.pages.services} />
        <DemoCraftAndProcessSection />
        <AboutSection />
        <ReviewsSection />
        <HoursAndAreasSection />
        <QuoteFormSection />
        <DemoLocalFaqSection />
        <ContactSection />
      </>
    );
  }

  // Default: editorial-cinema
  return (
    <>
      <PageHead pageKey="home" />
      <HeroSection />
      <ServicesSection showFullPageLink={site.pages.services} />
      <DemoCraftAndProcessSection />
      <GallerySection showFullPageLink={site.pages.gallery} />
      <ReviewsSection />
      <HoursAndAreasSection />
      <QuoteFormSection />
      <AboutSection />
      <DemoLocalFaqSection />
      <ContactSection />
    </>
  );
}
