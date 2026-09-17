import electricalImg from "@/assets/electrical.jpg";
import solarImg from "@/assets/solar.jpg";
import fireImg from "@/assets/fire.jpg";

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

// PLACEHOLDER PROJECTS — replace with real project data before production.
// Each project uses existing asset images as stand-ins.
export const projects: Project[] = [
  {
    id: "commercial-electrical-nairobi",
    title: "Commercial Electrical Installation",
    location: "Westlands, Nairobi",
    year: "2024",
    category: "Electrical Installation",
    description:
      "Complete electrical installation and commissioning for a 12-storey commercial office complex including LV distribution, lighting and fire alarm integration.",
    challenge:
      "The client needed a full electrical fit-out delivered within a tight 16-week programme to meet a tenant occupancy deadline.",
    approach:
      "We deployed two parallel crews to cover rough-in and first-fix simultaneously, coordinated with the main contractor's programme and held weekly clashes-detection meetings.",
    scope: [
      "LV/MV distribution boards and changeover systems",
      "General and emergency lighting installation",
      "Cable containment and trunking",
      "Fire alarm and detection integration",
      "Testing, commissioning and handover certificates",
    ],
    result:
      "All systems tested, certified and handed over two weeks ahead of the occupancy deadline.",
    coverImage: electricalImg,
    images: [electricalImg],
  },
  {
    id: "industrial-solar-athi-river",
    title: "220kW Industrial Rooftop Solar",
    location: "Athi River, Machakos",
    year: "2023",
    category: "Solar & Renewable Energy",
    description:
      "Design, supply and installation of a 220kW grid-tied rooftop solar PV system for a food processing factory.",
    challenge:
      "The factory's monthly electricity bill exceeded KES 2.5M with no redundancy for power interruptions affecting production lines.",
    approach:
      "We carried out a detailed energy audit and structural assessment before designing a system that offsets over 40% of daytime consumption.",
    scope: [
      "Structural assessment and roof preparation",
      "PV module and inverter supply",
      "DC and AC cabling and protection",
      "Grid compliance and net metering application",
      "Remote monitoring and commissioning",
    ],
    result:
      "The system generates an average of 950kWh daily, reducing the client's monthly electricity spend by approximately 41%.",
    coverImage: solarImg,
    images: [solarImg],
  },
  {
    id: "fire-detection-mombasa",
    title: "Fire Detection & Hydrant System",
    location: "Nyali, Mombasa",
    year: "2024",
    category: "Building Services",
    description:
      "Design, supply and installation of an addressable fire detection system and wet riser hydrant network for a beachfront hotel.",
    challenge:
      "The county fire department required a fully compliant fire suppression and detection system before issuing the occupancy certificate for the renovated wing.",
    approach:
      "We installed an addressable fire alarm system with zone mapping and a wet riser hydrant system connected to a dedicated fire pump.",
    scope: [
      "Addressable fire alarm panel and detectors",
      "Sounder and visual alarm devices",
      "Wet riser and hydrant ring installation",
      "Fire pump supply and commissioning",
      "Emergency lighting and exit signage",
    ],
    result:
      "The system passed county fire department inspection on the first submission, enabling the client to receive occupancy approval without delays.",
    coverImage: fireImg,
    images: [fireImg],
  },
  {
    id: "substation-upgrade-westlands",
    title: "Substation & LV Distribution Upgrade",
    location: "Westlands, Nairobi",
    year: "2023",
    category: "Power Systems",
    description:
      "Upgrade of a 500kVA transformer substation and complete LV distribution reconfiguration for a mixed-use development.",
    challenge:
      "The existing substation was undersized for the expanded development load, causing frequent tripping and power quality issues.",
    approach:
      "We carried out a load flow analysis, replaced the transformer, reconfigured the LV board and installed power factor correction.",
    scope: [
      "Transformer replacement and oil test",
      "LV panel reconfiguration and labelling",
      "Power factor correction capacitor bank",
      "Earthing and surge protection upgrade",
      "Testing, commissioning and documentation",
    ],
    result:
      "The upgraded substation handles 35% more capacity with stable power quality and no further tripping incidents.",
    coverImage: electricalImg,
    images: [electricalImg],
  },
  {
    id: "solar-water-heating-nakuru",
    title: "Solar Water Heating System",
    location: "Nakuru, Nakuru",
    year: "2024",
    category: "Solar & Renewable Energy",
    description:
      "Supply and installation of a 600-litre solar water heating system for a 120-bed hospital.",
    challenge:
      "The hospital relied on electric geysers consuming over 18,000 kWh monthly, with unreliable hot water supply during peak demand.",
    approach:
      "We installed a thermosiphon solar water heating system with electric backup, sized to meet 80% of the facility's daily hot water demand.",
    scope: [
      "Solar collector and storage tank installation",
      "Piping and insulation work",
      "Electric backup integration",
      "System commissioning and handover",
    ],
    result:
      "The system provides consistent hot water supply and reduces the hospital's water heating electricity cost by approximately 65%.",
    coverImage: solarImg,
    images: [solarImg],
  },
  {
    id: "fire-alarm-system-industrial",
    title: "Industrial Fire Alarm System",
    location: "Industrial Area, Nairobi",
    year: "2023",
    category: "Building Services",
    description:
      "Design and installation of an addressable fire detection and alarm system for a 15,000m² warehouse and logistics facility.",
    challenge:
      "The warehouse stored flammable materials requiring a detection system that could operate across high-bay areas with significant air movement.",
    approach:
      "We selected beam detectors for the high-bay zones and conventional detectors for offices, integrated with a single addressable panel.",
    scope: [
      "Fire detection system design and zone mapping",
      "Addressable panel and beam detector installation",
      "Conventional detectors for office areas",
      "Sounder and visual alarm devices",
      "Integration with existing security systems",
    ],
    result:
      "The system was commissioned and certified, meeting all NFPA and county fire department requirements.",
    coverImage: fireImg,
    images: [fireImg],
  },
];

export const projectCategories: ProjectCategory[] = [
  "All Projects",
  "Electrical Installation",
  "Power Systems",
  "Solar & Renewable Energy",
  "Industrial Automation",
  "Building Services",
  "Maintenance & Upgrades",
];
