// Core types for Life Toolkit AI

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
  popularity: number;
}

export type ToolCategory = 
  | 'calculators'
  | 'converters'
  | 'generators'
  | 'text-tools'
  | 'image-tools'
  | 'pdf-tools'
  | 'finance'
  | 'health'
  | 'developer';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolContent {
  title: string;
  description: string;
  howToUse: string[];
  faqs: FAQ[];
  examples: string[];
  commonMistakes: string[];
  relatedTools: string[];
}

export interface AdPlacement {
  id: string;
  position: 'top' | 'bottom' | 'sidebar' | 'inline';
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'responsive';
}
