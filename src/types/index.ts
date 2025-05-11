export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageHint?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}
