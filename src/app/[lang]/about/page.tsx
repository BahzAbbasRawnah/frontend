
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Target, BookOpen, Briefcase, Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.aboutUsPageTitle} - ${dictionary.siteName}`,
    description: dictionary.aboutUsPageSubtitle,
  };
}

// Placeholder team members data
const teamMembers = [
  {
    name: "Alice Wonderland", // This would ideally be from a translatable source or a specific team member dictionary
    roleKey: "aboutUsTeamRoleLeadDev" as keyof Dictionary, // Key for dictionary
    avatarUrl: "https://picsum.photos/seed/alice/200/200",
    avatarFallback: "AW",
    bioKey: "aboutUsTeamBioAlice" as keyof Dictionary,
    imageHint: "developer portrait",
  },
  {
    name: "Bob The Builder",
    roleKey: "aboutUsTeamRoleProjectManager" as keyof Dictionary,
    avatarUrl: "https://picsum.photos/seed/bob/200/200",
    avatarFallback: "BB",
    bioKey: "aboutUsTeamBioBob" as keyof Dictionary,
    imageHint: "manager portrait",
  },
  {
    name: "Charlie Chaplin",
    roleKey: "aboutUsTeamRoleUXDesigner" as keyof Dictionary,
    avatarUrl: "https://picsum.photos/seed/charlie/200/200",
    avatarFallback: "CC",
    bioKey: "aboutUsTeamBioCharlie" as keyof Dictionary,
    imageHint: "designer portrait",
  },
];


export default async function AboutPage({ params }: { params: { lang: Locale } }) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          {dictionary.aboutUsPageTitle}
        </h1>
        <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto">
          {dictionary.aboutUsPageSubtitle}
        </p>
      </header>

      <section id="our-story" className="mb-16">
        <Card className="shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-semibold text-primary mb-4 flex items-center">
                <BookOpen className="me-3 rtl:ms-3 h-8 w-8 text-accent" />
                {dictionary.aboutUsOurStoryTitle}
              </h2>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                {dictionary.aboutUsOurStoryContent}
              </p>
            </div>
            <div className="relative h-64 md:h-full w-full min-h-[300px]">
              <Image
                src="https://picsum.photos/seed/teamwork/800/600"
                alt={dictionary.aboutUsOurStoryTitle}
                layout="fill"
                objectFit="cover"
                data-ai-hint="team collaboration"
              />
            </div>
          </div>
        </Card>
      </section>

      <section id="our-mission" className="mb-16">
        <Card className="shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
                <div className="relative h-64 md:h-full w-full min-h-[300px] order-last md:order-first">
                    <Image
                        src="https://picsum.photos/seed/mission/800/600"
                        alt={dictionary.aboutUsOurMissionTitle}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="target goals"
                    />
                </div>
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-semibold text-primary mb-4 flex items-center">
                        <Target className="me-3 rtl:ms-3 h-8 w-8 text-accent" />
                        {dictionary.aboutUsOurMissionTitle}
                    </h2>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                        {dictionary.aboutUsOurMissionContent}
                    </p>
                </div>
            </div>
        </Card>
      </section>
      
      <section id="our-values" className="mb-16">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-primary mb-4">{dictionary.aboutUsOurValuesTitle}</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">{dictionary.aboutUsOurValuesSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow p-6">
                <Lightbulb className="mx-auto h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-medium text-primary mb-2">{dictionary.aboutUsValueInnovationTitle}</CardTitle>
                <CardDescription className="text-foreground/80">{dictionary.aboutUsValueInnovationContent}</CardDescription>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow p-6">
                <Users className="mx-auto h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-medium text-primary mb-2">{dictionary.aboutUsValueCollaborationTitle}</CardTitle>
                <CardDescription className="text-foreground/80">{dictionary.aboutUsValueCollaborationContent}</CardDescription>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow p-6">
                <Briefcase className="mx-auto h-12 w-12 text-accent mb-4" />
                <CardTitle className="text-xl font-medium text-primary mb-2">{dictionary.aboutUsValueExcellenceTitle}</CardTitle>
                <CardDescription className="text-foreground/80">{dictionary.aboutUsValueExcellenceContent}</CardDescription>
            </Card>
        </div>
      </section>

      <section id="our-team" className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-primary mb-4 flex items-center justify-center">
            <Users className="me-3 rtl:ms-3 h-8 w-8 text-accent" />
            {dictionary.aboutUsMeetOurTeamTitle}
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {dictionary.aboutUsMeetOurTeamSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="items-center pt-6">
                <Avatar className="w-32 h-32 mb-4 border-4 border-secondary shadow-md">
                  <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.imageHint} />
                  <AvatarFallback className="text-3xl bg-muted">{member.avatarFallback}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold text-primary">{member.name}</CardTitle>
                <CardDescription className="text-accent font-medium">{dictionary[member.roleKey]}</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-sm text-foreground/80 text-justify">
                  {dictionary[member.bioKey]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

