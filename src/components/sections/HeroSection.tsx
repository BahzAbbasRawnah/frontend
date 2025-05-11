import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionaryClient';

interface HeroSectionProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 'heroTitle1' | 'heroTitle2' | 'heroSubtitle' | 'startProjectButton' | 'seeOurWorkButton'>;
}

export default function HeroSection({ lang, dictionary }: HeroSectionProps) {
  const localizedPath = (path: string) => `/${lang}${path}`;
  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-primary">{dictionary.heroTitle1}</span>
          <span className="block text-accent">{dictionary.heroTitle2}</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
          {dictionary.heroSubtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Link href={localizedPath('/#service-request')}>
              {dictionary.startProjectButton} <ArrowRight className="ms-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Link href={localizedPath('/#projects')}>
              {dictionary.seeOurWorkButton}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}