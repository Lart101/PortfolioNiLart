export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface Contact {
  location: string;
  phone: string;
  email: string;
}

export interface Social {
  github: string;
  email: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  type: string;
  role: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  school: string;
  campus: string;
  degree: string;
  field: string;
  period: string;
}

export interface Certification {
  name: string;
  provider: string;
  year: number;
}

export interface PortfolioData {
  profile: Profile;
  contact: Contact;
  social: Social;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education;
  certifications: Certification[];
}

import rawData from "./portfolio.json";

export const portfolioData: PortfolioData = rawData as PortfolioData;