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

export const PROJECT_CATEGORIES = [
  "EdTech / Education",
  "E-Commerce",
  "Productivity & Tools",
  "Creative / Media"
];

export interface Project {
  name: string;
  description: string;
  tech: string[];
  role: string;
  image?: string;
  url?: string;
  featured?: boolean;
  category?: string;
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

export async function getPortfolioData(): Promise<PortfolioData> {
  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  if (!BIN_ID || !API_KEY) {
    console.log("JSONBin credentials missing, using local data.");
    return portfolioData;
  }

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Access-Key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from JSONBin");
    }

    const data = await res.json();
    return data.record;
  } catch (error) {
    console.error("Error fetching from JSONBin, falling back to local data:", error);
    return portfolioData;
  }
}