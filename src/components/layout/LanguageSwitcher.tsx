'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  dictionary: Pick<Dictionary, 'language' | 'english' | 'arabic'>;
}

export function LanguageSwitcher({ currentLocale, dictionary }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
   // const { user } = useAuth(); // if needed for auth-specific redirects

  const handleLocaleChange = (newLocale: Locale) => {
    // This regex removes the existing locale prefix from the pathname
    const newPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    router.push(`/${newLocale}${newPathname}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{dictionary.language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            disabled={currentLocale === locale}
          >
            {locale === 'en' ? dictionary.english : dictionary.arabic}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}