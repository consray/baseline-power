export const company = {
  name: "Baseline Power Systems",
  short: "Baseline Power",
  tagline: "Electrical, solar and fire safety engineering across Kenya",
  // TODO: replace the placeholder contact details below with the real ones.
  phone: "+254 704 777 877",
  phoneHref: "tel:+254704777877",
  emergency: "+254 700 000 001",
  whatsapp: "254704777877",
  email: "info@baselinepower.co.ke",
  address: "10 Masaba Rd, Nairobi, Kenya",
  hours: "Mon–Fri 8:00am–5:30pm · Sat 8:00am–1:00pm · 24/7 emergency response",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const counties = [
  "Nairobi",
  "Kiambu",
  "Machakos",
  "Kajiado",
  "Nakuru",
  "Mombasa",
  "Kisumu",
  "Uasin Gishu (Eldoret)",
  "Nyeri",
  "Meru",
  "Kilifi",
  "Other county",
];

export const buildingTypes = [
  "Residential home",
  "Apartment block",
  "Commercial building / offices",
  "Industrial plant / factory",
  "Warehouse",
  "Hotel / hospitality",
  "School / institution",
  "Hospital / clinic",
  "Government project",
  "Real estate development",
];

export const budgets = [
  "Under KES 100,000",
  "KES 100,000 – 500,000",
  "KES 500,000 – 2M",
  "KES 2M – 10M",
  "Above KES 10M",
  "Not sure yet",
];

export type ServiceItem = { title: string; description: string };

export type ServiceGroup = {
  slug: "electrical" | "solar" | "fire-protection";
  name: string;
  short: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  items: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "electrical",
    name: "Electrical Services",
    short: "Installations, power distribution and maintenance built to KEBS and EPRA standards.",
    intro:
      "From single-phase domestic wiring to three-phase industrial distribution, our EPRA-licensed electricians design, install, test and maintain electrical systems that stay safe and compliant for decades.",
    metaTitle: "Electrical Contractors in Kenya | Baseline Power Systems",
    metaDescription:
      "EPRA-licensed electrical contractors in Kenya. Wiring, power distribution, generator installation, lighting, automation and maintenance for homes, industry and institutions.",
    items: [
      {
        title: "Electrical installations",
        description: "New builds, fit-outs and phased installations with full test certificates.",
      },
      {
        title: "Wiring and rewiring",
        description:
          "Safe replacement of ageing circuits in homes, apartments and commercial blocks.",
      },
      {
        title: "Power distribution",
        description: "LV/MV panels, changeover systems, busbars, load balancing and metering.",
      },
      {
        title: "Generator installation",
        description: "Sizing, civil works, ATS integration, commissioning and service contracts.",
      },
      {
        title: "Electrical maintenance",
        description: "Planned preventive maintenance, thermal imaging and 24/7 emergency callout.",
      },
      {
        title: "Lighting systems",
        description: "LED retrofits, warehouse high-bay, street and perimeter lighting design.",
      },
      {
        title: "Smart home automation",
        description: "Lighting scenes, access control, CCTV integration and remote monitoring.",
      },
      {
        title: "Electrical inspections",
        description:
          "Compliance audits, earth testing and certification for insurers and regulators.",
      },
    ],
  },
  {
    slug: "solar",
    name: "Solar Energy Services",
    short: "Grid-tied, hybrid and off-grid solar that cuts power bills from day one.",
    intro:
      "We design bankable solar systems for Kenyan conditions — from 3kW rooftop hybrids to megawatt-scale industrial plants — with proper yield modelling, quality components and long-term performance monitoring.",
    metaTitle: "Solar Installation Company in Kenya | Baseline Power Systems",
    metaDescription:
      "Solar installation in Kenya for homes, businesses and industry. Grid-tied and hybrid systems, inverters, battery storage, solar water heating and energy audits.",
    items: [
      {
        title: "Residential solar systems",
        description: "Hybrid systems sized to your bill, with battery backup for blackouts.",
      },
      {
        title: "Commercial solar systems",
        description: "Rooftop PV for offices, retail and hotels with clear payback modelling.",
      },
      {
        title: "Industrial solar plants",
        description: "High-capacity plants, net metering support and grid compliance.",
      },
      {
        title: "Solar water heaters",
        description: "EPRA-compliant hot water for homes, hotels and hospitals.",
      },
      {
        title: "Inverters",
        description: "Supply, installation and replacement of hybrid and string inverters.",
      },
      {
        title: "Battery storage",
        description: "Lithium and tubular storage sized for real overnight loads.",
      },
      {
        title: "Solar maintenance",
        description: "Cleaning, panel testing, inverter servicing and remote monitoring.",
      },
      {
        title: "Energy audits",
        description: "Metered load studies that show exactly where your power spend goes.",
      },
    ],
  },
  {
    slug: "fire-protection",
    name: "Fire Protection",
    short: "Detection, suppression and certification that satisfies county fire inspectors.",
    intro:
      "We supply, install and certify fire safety systems for buildings across Kenya, working to NFPA guidance and county fire regulations so your occupancy approvals and insurance cover never stall.",
    metaTitle: "Fire Protection & Fire Equipment Suppliers in Kenya | Baseline Power",
    metaDescription:
      "Fire alarm systems, extinguishers, hydrants, sprinklers, smoke detection and fire risk assessment across Kenya. Certified installation and annual servicing.",
    items: [
      {
        title: "Fire alarm systems",
        description: "Addressable and conventional panels, zoning, sounders and cause-and-effect.",
      },
      {
        title: "Fire extinguishers",
        description: "Supply, wall mounting, signage, refilling and annual certification.",
      },
      {
        title: "Fire hydrants",
        description: "Hydrant rings, landing valves, hose reels and pump house works.",
      },
      {
        title: "Sprinkler systems",
        description: "Wet and dry riser design, installation and hydraulic testing.",
      },
      {
        title: "Smoke detectors",
        description: "Optical, heat and multi-sensor detection correctly sited per zone.",
      },
      {
        title: "Emergency lighting",
        description: "Escape route lighting and exit signage with battery backup.",
      },
      {
        title: "Fire suppression systems",
        description: "Kitchen, server room and gas suppression for critical spaces.",
      },
      {
        title: "Fire risk assessment",
        description: "Documented assessments and evacuation plans for compliance filing.",
      },
    ],
  },
];
