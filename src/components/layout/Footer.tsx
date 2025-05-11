import { CodeXml } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

interface FooterProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 'footerCopyright' | 'footerBuiltWith'>;
}

export default function Footer({ lang, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <CodeXml className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {dictionary.footerCopyright.replace('{year}', currentYear.toString())}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {dictionary.footerBuiltWith}
        </p>
      </div>
    </footer>
  );
}