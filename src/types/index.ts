export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageHint?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  averageRating?: number;
  numberOfRatings?: number;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  imageHint?: string;
  priceModel: string; // e.g., "Hourly", "Fixed Project", "Subscription"
  estimatedTimeframe?: string; // e.g., "2-4 weeks"
  tags?: string[];
  averageRating?: number;
  numberOfRatings?: number;
  features?: string[]; // Added features array
  deliverables?: string[]; // Added deliverables array
}
