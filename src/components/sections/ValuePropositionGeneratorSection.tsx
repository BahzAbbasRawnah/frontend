import ValuePropositionGeneratorClient from '@/components/ai/ValuePropositionGeneratorClient';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionaryClient';

interface ValuePropositionGeneratorSectionProps {
  lang: Locale; // lang might not be directly used if client component handles its own text
  dictionary: Pick<Dictionary,
    'valueAIGeneratorTitle' |
    'valueAIGeneratorDescription' |
    'valueAIGeneratorInputLabel' |
    'valueAIGeneratorInputPlaceholder' |
    'valueAIGeneratorSubmitButton' |
    'valueAIGeneratorGeneratingButton' |
    'valueAIGeneratedPropositionsTitle' |
    'toastInputRequiredTitle' |
    'toastInputRequiredDescription' |
    'toastSuccessTitle' |
    'toastValuePropositionsGenerated' |
    'toastErrorTitle' |
    'toastFailedToGeneratePropositions'
  >;
}

export default function ValuePropositionGeneratorSection({ lang, dictionary }: ValuePropositionGeneratorSectionProps) {
  return (
    <section id="value-ai" className="py-16 lg:py-24 bg-background">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <ValuePropositionGeneratorClient dictionary={dictionary} />
      </div>
    </section>
  );
}