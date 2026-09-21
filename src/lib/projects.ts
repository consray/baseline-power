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
  challenge?: string | null;
  approach?: string | null;
  scope?: string[] | null;
  result?: string | null;
  coverImage: string;
  images: string[];
  published?: boolean;
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
