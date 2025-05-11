import HeroSection from '@/components/sections/HeroSection';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ServiceRequestFormSection from '@/components/sections/ServiceRequestFormSection';
import ValuePropositionGeneratorSection from '@/components/sections/ValuePropositionGeneratorSection';
import ContactSection from '@/components/sections/ContactSection';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <HeroSection lang={lang} dictionary={dictionary} />
      <ProjectShowcase lang={lang} dictionary={dictionary} />
      <ValuePropositionGeneratorSection lang={lang} dictionary={dictionary} />
      <ServiceRequestFormSection lang={lang} dictionary={dictionary} />
      <ContactSection lang={lang} dictionary={dictionary} />
    </>
  );
}