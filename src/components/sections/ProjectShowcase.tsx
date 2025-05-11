import ProjectCard from '@/components/project/ProjectCard';
import type { Project } from '@/types'; // Assuming Project type doesn't need translation for now
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionaryClient';

// Sample projects would ideally also be localized if their content (title, desc) needs to change
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform', // Placeholder, would be from a dictionary
    description: 'A full-featured online store with secure payments, product management, and user accounts.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://picsum.photos/seed/ecom/600/400',
    imageHint: 'online store',
    liveDemoUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'Social Media App',
    description: 'A platform for users to connect, share updates, and interact with content in real-time.',
    technologies: ['Flutter', 'Firebase', 'Dart'],
    imageUrl: 'https://picsum.photos/seed/social/600/400',
    imageHint: 'mobile application',
    liveDemoUrl: '#',
  },
  {
    id: '3',
    title: 'Project Management Tool',
    description: 'A collaborative tool for teams to manage tasks, track progress, and communicate effectively.',
    technologies: ['Next.js', 'TailwindCSS', 'Supabase'],
    imageUrl: 'https://picsum.photos/seed/pmtool/600/400',
    imageHint: 'dashboard interface',
    githubUrl: '#',
  },
   {
    id: '4',
    title: 'AI Powered Analytics Dashboard',
    description: 'An advanced dashboard providing insightful data analytics using machine learning models.',
    technologies: ['Python', 'Flask', 'React', 'D3.js'],
    imageUrl: 'https://picsum.photos/seed/analytics/600/400',
    imageHint: 'charts graphs',
    liveDemoUrl: '#',
    githubUrl: '#',
  },
];

interface ProjectShowcaseProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 'ourPortfolioTitle' | 'ourPortfolioSubtitle'>;
}

export default function ProjectShowcase({ lang, dictionary }: ProjectShowcaseProps) {
  return (
    <section id="projects" className="py-16 lg:py-24 bg-background">
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{dictionary.ourPortfolioTitle}</h2>
          <p className="mt-4 text-lg text-foreground/80">
            {dictionary.ourPortfolioSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sampleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}