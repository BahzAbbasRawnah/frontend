import ValuePropositionGeneratorClient from '@/components/ai/ValuePropositionGeneratorClient';

export default function ValuePropositionGeneratorSection() {
  return (
    <section id="value-ai" className="py-16 lg:py-24 bg-background">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <ValuePropositionGeneratorClient />
      </div>
    </section>
  );
}
