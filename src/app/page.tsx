import HeroSection from '@/components/sections/HeroSection';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ServiceRequestFormSection from '@/components/sections/ServiceRequestFormSection';
import ValuePropositionGeneratorSection from '@/components/sections/ValuePropositionGeneratorSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <ValuePropositionGeneratorSection />
      <ServiceRequestFormSection />
      <ContactSection />
    </>
  );
}
