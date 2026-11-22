import { PageHead } from '../components/PageHead';
import { ContactSection } from '../components/sections/ContactSection';
import { GallerySection } from '../components/sections/GallerySection';

export function GalleryPage() {
  return (
    <>
      <PageHead pageKey="gallery" />
      <GallerySection isStandalonePage />
      <ContactSection />
    </>
  );
}
