import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import type { Locale } from '@/i18n-config';

interface ProjectCardProps {
  project: Project;
  lang: Locale; // Add lang prop
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
  // Project title and description would ideally come from a translated source if they need localization
  // For now, using static values. Localized links are not directly needed here unless demo/github were /lang/ specific.
  // If liveDemoUrl or githubUrl were internal paths, they'd need `/${lang}` prefix.
  // Since they are external or placeholder '#', no change to link generation needed for now.

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.imageHint || "technology project"}
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-xl font-semibold mb-2 text-primary">{project.title}</CardTitle>
        <CardDescription className="text-sm text-foreground/80 mb-4 min-h-[60px]">{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-secondary/30 rounded-b-lg">
        <div className="flex items-center justify-start gap-3 w-full">
          {project.liveDemoUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
              <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="me-2 h-4 w-4" /> Live Demo 
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="me-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}