import type { Locale } from '@/i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('@/locales/en/common.json').then((module) => module.default),
  ar: () => import('@/locales/ar/common.json').then((module) => module.default),
};

export const getDictionaryClient = async (locale: Locale) => {
  return locale && dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionaryClient>>;
