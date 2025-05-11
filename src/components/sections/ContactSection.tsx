import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/your-team',
    ariaLabelKey: 'Visit our GitHub profile', // Will use this key for translation later if needed
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/company/your-team',
    ariaLabelKey: 'Connect with us on LinkedIn',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/your-team',
    ariaLabelKey: 'Follow us on Twitter',
  },
];

interface ContactSectionProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 
    'contactTitle' | 'contactSubtitle' | 'contactEmailUs' | 'contactCallUs' | 'contactConnectSocial'
  >;
}

export default function ContactSection({ lang, dictionary }: ContactSectionProps) {
  const contactDetails = [
    {
        nameKey: 'contactEmailUs',
        icon: Mail,
        value: 'contact@codecanvas.dev',
        href: 'mailto:contact@codecanvas.dev',
    },
    {
        nameKey: 'contactCallUs',
        icon: Phone,
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container max-w-5xl px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{dictionary.contactTitle}</CardTitle>
            <CardDescription className="mt-3 text-lg text-foreground/80">
              {dictionary.contactSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {contactDetails.map(detail => (
                <div key={detail.nameKey} className="flex flex-col items-center md:items-start text-center md:text-start p-4 rounded-lg hover:bg-background transition-colors">
                  <detail.icon className="h-10 w-10 text-accent mb-3" />
                  <h3 className="text-xl font-semibold text-primary mb-1">{dictionary[detail.nameKey as keyof typeof dictionary]}</h3>
                  <Link href={detail.href} className="text-md text-foreground/90 hover:text-accent transition-colors">
                    {detail.value}
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-4">{dictionary.contactConnectSocial}</h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((link) => (
                  <Button key={link.name} variant="outline" size="icon" asChild className="rounded-full w-12 h-12 hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}> {/* Aria label could be translated too */}
                      <link.icon className="h-6 w-6" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}