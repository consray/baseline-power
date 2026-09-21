export type ProjectCategory =
  | "All Projects"
  | "Electrical Installation"
  | "Power Systems"
  | "Solar & Renewable Energy"
  | "Industrial Automation"
  | "Building Services"
  | "Maintenance & Upgrades";

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  description: string;
  challenge?: string;
  approach?: string;
  scope?: string[];
  result?: string;
  coverImage: string;
  images: string[];
}

export const projectCategories: ProjectCategory[] = [
  "All Projects",
  "Electrical Installation",
  "Power Systems",
  "Solar & Renewable Energy",
  "Industrial Automation",
  "Building Services",
  "Maintenance & Upgrades",
];
