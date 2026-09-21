-- Seed: Services
-- Electrical
INSERT INTO services (id, slug, name, short_description, intro, meta_title, meta_description, sort_order, published)
VALUES (
  'svc-electrical',
  'electrical',
  'Electrical Services',
  'Installations, power distribution and maintenance built to KEBS and EPRA standards.',
  'From single-phase domestic wiring to three-phase industrial distribution, our EPRA-licensed electricians design, install, test and maintain electrical systems that stay safe and compliant for decades.',
  'Electrical Contractors in Kenya | Baseline Power Systems',
  'EPRA-licensed electrical contractors in Kenya. Wiring, power distribution, generator installation, lighting, automation and maintenance for homes, industry and institutions.',
  1,
  1
);

INSERT INTO service_items (id, service_id, title, description, sort_order)
VALUES
  ('svc-el-1', 'svc-electrical', 'Electrical installations', 'New builds, fit-outs and phased installations with full test certificates.', 1),
  ('svc-el-2', 'svc-electrical', 'Wiring and rewiring', 'Safe replacement of ageing circuits in homes, apartments and commercial blocks.', 2),
  ('svc-el-3', 'svc-electrical', 'Power distribution', 'LV/MV panels, changeover systems, busbars, load balancing and metering.', 3),
  ('svc-el-4', 'svc-electrical', 'Generator installation', 'Sizing, civil works, ATS integration, commissioning and service contracts.', 4),
  ('svc-el-5', 'svc-electrical', 'Electrical maintenance', 'Planned preventive maintenance, thermal imaging and 24/7 emergency callout.', 5),
  ('svc-el-6', 'svc-electrical', 'Lighting systems', 'LED retrofits, warehouse high-bay, street and perimeter lighting design.', 6),
  ('svc-el-7', 'svc-electrical', 'Smart home automation', 'Lighting scenes, access control, CCTV integration and remote monitoring.', 7),
  ('svc-el-8', 'svc-electrical', 'Electrical inspections', 'Compliance audits, earth testing and certification for insurers and regulators.', 8);

-- Solar
INSERT INTO services (id, slug, name, short_description, intro, meta_title, meta_description, sort_order, published)
VALUES (
  'svc-solar',
  'solar',
  'Solar Energy Services',
  'Grid-tied, hybrid and off-grid solar that cuts power bills from day one.',
  'We design bankable solar systems for Kenyan conditions — from 3kW rooftop hybrids to megawatt-scale industrial plants — with proper yield modelling, quality components and long-term performance monitoring.',
  'Solar Installation Company in Kenya | Baseline Power Systems',
  'Solar installation in Kenya for homes, businesses and industry. Grid-tied and hybrid systems, inverters, battery storage, solar water heating and energy audits.',
  2,
  1
);

INSERT INTO service_items (id, service_id, title, description, sort_order)
VALUES
  ('svc-so-1', 'svc-solar', 'Residential solar systems', 'Hybrid systems sized to your bill, with battery backup for blackouts.', 1),
  ('svc-so-2', 'svc-solar', 'Commercial solar systems', 'Rooftop PV for offices, retail and hotels with clear payback modelling.', 2),
  ('svc-so-3', 'svc-solar', 'Industrial solar plants', 'High-capacity plants, net metering support and grid compliance.', 3),
  ('svc-so-4', 'svc-solar', 'Solar water heaters', 'EPRA-compliant hot water for homes, hotels and hospitals.', 4),
  ('svc-so-5', 'svc-solar', 'Inverters', 'Supply, installation and replacement of hybrid and string inverters.', 5),
  ('svc-so-6', 'svc-solar', 'Battery storage', 'Lithium and tubular storage sized for real overnight loads.', 6),
  ('svc-so-7', 'svc-solar', 'Solar maintenance', 'Cleaning, panel testing, inverter servicing and remote monitoring.', 7),
  ('svc-so-8', 'svc-solar', 'Energy audits', 'Metered load studies that show exactly where your power spend goes.', 8);

-- Fire Protection
INSERT INTO services (id, slug, name, short_description, intro, meta_title, meta_description, sort_order, published)
VALUES (
  'svc-fire',
  'fire-protection',
  'Fire Protection',
  'Detection, suppression and certification that satisfies county fire inspectors.',
  'We supply, install and certify fire safety systems for buildings across Kenya, working to NFPA guidance and county fire regulations so your occupancy approvals and insurance cover never stall.',
  'Fire Protection & Fire Equipment Suppliers in Kenya | Baseline Power',
  'Fire alarm systems, extinguishers, hydrants, sprinklers, smoke detection and fire risk assessment across Kenya. Certified installation and annual servicing.',
  3,
  1
);

INSERT INTO service_items (id, service_id, title, description, sort_order)
VALUES
  ('svc-fi-1', 'svc-fire', 'Fire alarm systems', 'Addressable and conventional panels, zoning, sounders and cause-and-effect.', 1),
  ('svc-fi-2', 'svc-fire', 'Fire extinguishers', 'Supply, wall mounting, signage, refilling and annual certification.', 2),
  ('svc-fi-3', 'svc-fire', 'Fire hydrants', 'Hydrant rings, landing valves, hose reels and pump house works.', 3),
  ('svc-fi-4', 'svc-fire', 'Sprinkler systems', 'Wet and dry riser design, installation and hydraulic testing.', 4),
  ('svc-fi-5', 'svc-fire', 'Smoke detectors', 'Optical, heat and multi-sensor detection correctly sited per zone.', 5),
  ('svc-fi-6', 'svc-fire', 'Emergency lighting', 'Escape route lighting and exit signage with battery backup.', 6),
  ('svc-fi-7', 'svc-fire', 'Fire suppression systems', 'Kitchen, server room and gas suppression for critical spaces.', 7),
  ('svc-fi-8', 'svc-fire', 'Fire risk assessment', 'Documented assessments and evacuation plans for compliance filing.', 8);
