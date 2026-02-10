export interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  demoUrl: string;
  codeUrl: string;
  icon: string;
  featured?: boolean;
}

export interface Experience {
  id: number;
  year: string;
  titleKey: string;
  company: string;
  companyKey?: string;
  descriptionKeys: string[];
}

export interface Certification {
  id: number;
  titleKey: string;
  institution: string;
  year: string;
  icon: string;
  file?: string;
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  icon: string;
  skills: string[];
}

export interface Language {
  id: string;
  nameKey: string;
  levelKey: string;
  stars: number;
}

export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  id: string;
  url: string;
  icon: string;
  label: string;
}

export type Theme = 'light' | 'dark';
export type LanguageCode = 'pt' | 'en' | 'es';

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}