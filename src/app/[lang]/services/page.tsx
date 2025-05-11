import ServiceCard from '@/components/service/ServiceCard';
import { sampleServices } from '@/data/sample-services';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  // Use Promise.resolve to await the params object
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;

  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.servicesPageTitle} - ${dictionary.siteName}`,
    description: dictionary.servicesPageSubtitle,
  };
}

export default async function ServicesPage({ params }: { params: { lang: Locale } }) {
  // Use Promise.resolve to await the params object
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">{dictionary.servicesPageTitle}</h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          {dictionary.servicesPageSubtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleServices.map((service) => (
          <ServiceCard key={service.id} service={service} lang={lang} dictionary={dictionary} />
        ))}
      </div>
    </div>
  );
}