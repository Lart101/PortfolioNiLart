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

const GIST_URL = "https://gist.githubusercontent.com/Lart101/41aeaa0be49c6932586f7376ea849ae2/raw/portfolio.json";

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const res = await fetch(GIST_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio data: ${res.status}`);
  }

  const data = await res.json();

  const avatarUrl = "/profile-cut.jpg";

  return {
    ...data,
    profile: {
      ...data.profile,
      avatar: avatarUrl,
    },
  };
}