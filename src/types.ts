export type TabType = 'home' | 'about' | 'events' | 'community' | 'resources' | 'contact';

export interface WheelScores {
  faith: number;
  health: number;
  relationships: number;
  career: number;
  finances: number;
  personalGrowth: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
}

export interface BlogEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  comingSoon?: boolean;
  content?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
}

export interface Pillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  signatureExperiences: {
    title: string;
    theme?: string;
    description: string;
  }[];
}
