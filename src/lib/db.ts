import type { Project, ProjectCategory } from "./projects";
import { fallbackProjects } from "./fallback-projects";
import { serviceGroups } from "./company";

// D1 row type (maps from database to application)
interface ProjectRow {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  challenge: string | null;
  approach: string | null;
  scope: string | null;
  result: string | null;
  cover_image: string | null;
  images: string | null;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

// Convert D1 row to Project type
function rowToProject(row: ProjectRow): Project {
  let images: string[] = [];
  try {
    images = row.images ? JSON.parse(row.images) : [];
  } catch {
    console.error(`[db] Failed to parse images for project ${row.id}`);
    images = [];
  }

  let scope: string[] | undefined;
  if (row.scope) {
    try {
      scope = JSON.parse(row.scope);
    } catch {
      console.error(`[db] Failed to parse scope for project ${row.id}`);
      scope = undefined;
    }
  }

  const project: Project = {
    id: row.id,
    title: row.title,
    location: row.location,
    year: row.year,
    category: row.category as ProjectCategory,
    description: row.description,
    coverImage: row.cover_image ?? "",
    images,
    published: row.published === 1,
  };

  if (row.challenge) project.challenge = row.challenge;
  if (row.approach) project.approach = row.approach;
  if (scope) project.scope = scope;
  if (row.result) project.result = row.result;

  return project;
}

// Database interface (matches Cloudflare D1 API)
interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<{ results: unknown[] }>;
  batch<T>(statements: D1PreparedStatement[]): Promise<T[]>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean }>;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
}

// Get D1 binding from environment
// Returns null if D1 is not configured (fallback to static data)
function getDB(): D1Database | null {
  try {
    // @ts-expect-error Cloudflare Workers globals
    const env = globalThis?.env ?? {};
    const db = env.DB as D1Database | undefined;
    return db ?? null;
  } catch {
    return null;
  }
}

// Check if D1 is available
export function isD1Available(): boolean {
  return getDB() !== null;
}

// ─── Query Functions (with fallback) ──────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const db = getDB();
  if (!db) {
    // Fallback to static data
    return fallbackProjects.filter((p) => p.challenge); // Only published projects
  }

  const { results } = await db
    .prepare("SELECT * FROM projects WHERE published = 1 ORDER BY sort_order ASC, created_at DESC")
    .all<ProjectRow>();
  return results.map(rowToProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = getDB();
  if (!db) {
    return fallbackProjects.find((p) => p.id === id) ?? null;
  }

  const row = await db.prepare("SELECT * FROM projects WHERE id = ?").bind(id).first<ProjectRow>();
  return row ? rowToProject(row) : null;
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const db = getDB();
  if (!db) {
    return fallbackProjects.filter((p) => p.category === category && p.challenge);
  }

  const { results } = await db
    .prepare(
      "SELECT * FROM projects WHERE published = 1 AND category = ? ORDER BY sort_order ASC, created_at DESC",
    )
    .bind(category)
    .all<ProjectRow>();
  return results.map(rowToProject);
}

// ─── Admin Functions ──────────────────────────────────────────────────────────

export async function getAllProjectsAdmin(): Promise<Project[]> {
  const db = getDB();
  if (!db) {
    // Return all fallback projects in admin mode
    return fallbackProjects;
  }

  const { results } = await db
    .prepare("SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC")
    .all<ProjectRow>();
  return results.map(rowToProject);
}

export async function createProject(
  project: Omit<Project, "id"> & { id?: string },
): Promise<Project> {
  const db = getDB();
  if (!db) {
    throw new Error("D1 database not available. Cannot create project.");
  }

  const id = project.id || crypto.randomUUID();

  await db
    .prepare(
      `INSERT INTO projects (id, title, location, year, category, description, challenge, approach, scope, result, cover_image, images, sort_order, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      project.title,
      project.location,
      project.year,
      project.category,
      project.description,
      project.challenge ?? null,
      project.approach ?? null,
      project.scope ? JSON.stringify(project.scope) : null,
      project.result ?? null,
      project.coverImage || null,
      project.images.length > 0 ? JSON.stringify(project.images) : null,
      0,
      1,
    )
    .run();

  const created = await getProjectById(id);
  if (!created) throw new Error("Failed to create project");
  return created;
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id">>,
): Promise<Project> {
  const db = getDB();
  if (!db) {
    throw new Error("D1 database not available. Cannot update project.");
  }

  const fields: string[] = [];
  const values: unknown[] = [];

  if (project.title !== undefined) {
    fields.push("title = ?");
    values.push(project.title);
  }
  if (project.location !== undefined) {
    fields.push("location = ?");
    values.push(project.location);
  }
  if (project.year !== undefined) {
    fields.push("year = ?");
    values.push(project.year);
  }
  if (project.category !== undefined) {
    fields.push("category = ?");
    values.push(project.category);
  }
  if (project.description !== undefined) {
    fields.push("description = ?");
    values.push(project.description);
  }
  if (project.challenge !== undefined) {
    fields.push("challenge = ?");
    values.push(project.challenge ?? null);
  }
  if (project.approach !== undefined) {
    fields.push("approach = ?");
    values.push(project.approach ?? null);
  }
  if (project.scope !== undefined) {
    fields.push("scope = ?");
    values.push(project.scope ? JSON.stringify(project.scope) : null);
  }
  if (project.result !== undefined) {
    fields.push("result = ?");
    values.push(project.result ?? null);
  }
  if (project.coverImage !== undefined) {
    fields.push("cover_image = ?");
    values.push(project.coverImage || null);
  }
  if (project.images !== undefined) {
    fields.push("images = ?");
    values.push(project.images.length > 0 ? JSON.stringify(project.images) : null);
  }

  if (fields.length === 0) {
    const existing = await getProjectById(id);
    if (!existing) throw new Error("Project not found");
    return existing;
  }

  fields.push("updated_at = datetime('now')");
  values.push(id);

  await db
    .prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`)
    .bind(...values)
    .run();

  const updated = await getProjectById(id);
  if (!updated) throw new Error("Project not found");
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = getDB();
  if (!db) {
    throw new Error("D1 database not available. Cannot delete project.");
  }

  const result = await db.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
  return result.success;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Services
// ═══════════════════════════════════════════════════════════════════════════════

export interface ServiceItem {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  sortOrder: number;
  published: boolean;
  items: ServiceItem[];
}

interface ServiceRow {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  intro: string;
  meta_title: string;
  meta_description: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

interface ServiceItemRow {
  id: string;
  service_id: string;
  title: string;
  description: string;
  sort_order: number;
}

function rowToService(row: ServiceRow, items: ServiceItemRow[] = []): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    intro: row.intro,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    sortOrder: row.sort_order,
    published: row.published === 1,
    items: items.map((i) => ({
      id: i.id,
      serviceId: i.service_id,
      title: i.title,
      description: i.description,
      sortOrder: i.sort_order,
    })),
  };
}

function fallbackServices(): Service[] {
  return serviceGroups.map((g, i) => ({
    id: `fallback-${g.slug}`,
    slug: g.slug,
    name: g.name,
    shortDescription: g.short,
    intro: g.intro,
    metaTitle: g.metaTitle,
    metaDescription: g.metaDescription,
    sortOrder: i + 1,
    published: true,
    items: g.items.map((item, j) => ({
      id: `fallback-${g.slug}-${j}`,
      serviceId: `fallback-${g.slug}`,
      title: item.title,
      description: item.description,
      sortOrder: j + 1,
    })),
  }));
}

export async function getAllServices(): Promise<Service[]> {
  const db = getDB();
  if (!db) return fallbackServices();

  const { results: serviceRows } = await db
    .prepare("SELECT * FROM services ORDER BY sort_order ASC, name ASC")
    .all<ServiceRow>();

  const services: Service[] = [];
  for (const row of serviceRows) {
    const { results: itemRows } = await db
      .prepare("SELECT * FROM service_items WHERE service_id = ? ORDER BY sort_order ASC")
      .bind(row.id)
      .all<ServiceItemRow>();
    services.push(rowToService(row, itemRows));
  }
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const db = getDB();
  if (!db) {
    return fallbackServices().find((s) => s.slug === slug) ?? null;
  }

  const row = await db
    .prepare("SELECT * FROM services WHERE slug = ?")
    .bind(slug)
    .first<ServiceRow>();
  if (!row) return null;

  const { results: itemRows } = await db
    .prepare("SELECT * FROM service_items WHERE service_id = ? ORDER BY sort_order ASC")
    .bind(row.id)
    .all<ServiceItemRow>();

  return rowToService(row, itemRows);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const db = getDB();
  if (!db) {
    return fallbackServices().find((s) => s.id === id) ?? null;
  }

  const row = await db.prepare("SELECT * FROM services WHERE id = ?").bind(id).first<ServiceRow>();
  if (!row) return null;

  const { results: itemRows } = await db
    .prepare("SELECT * FROM service_items WHERE service_id = ? ORDER BY sort_order ASC")
    .bind(row.id)
    .all<ServiceItemRow>();

  return rowToService(row, itemRows);
}

export async function createService(
  service: Omit<Service, "id" | "items"> & {
    id?: string;
    items?: Omit<ServiceItem, "id" | "serviceId">[];
  },
): Promise<Service> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot create service.");

  const id = service.id || crypto.randomUUID();

  await db
    .prepare(
      `INSERT INTO services (id, slug, name, short_description, intro, meta_title, meta_description, sort_order, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      service.slug,
      service.name,
      service.shortDescription,
      service.intro,
      service.metaTitle,
      service.metaDescription,
      service.sortOrder,
      service.published ? 1 : 0,
    )
    .run();

  if (service.items && service.items.length > 0) {
    for (let i = 0; i < service.items.length; i++) {
      const item = service.items[i]!;
      await db
        .prepare(
          `INSERT INTO service_items (id, service_id, title, description, sort_order) VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(crypto.randomUUID(), id, item.title, item.description, item.sortOrder ?? i + 1)
        .run();
    }
  }

  const created = await getServiceById(id);
  if (!created) throw new Error("Failed to create service");
  return created;
}

export async function updateService(
  id: string,
  data: Partial<Omit<Service, "id" | "items">> & {
    items?: Omit<ServiceItem, "id" | "serviceId">[];
  },
): Promise<Service> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot update service.");

  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.slug !== undefined) {
    fields.push("slug = ?");
    values.push(data.slug);
  }
  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }
  if (data.shortDescription !== undefined) {
    fields.push("short_description = ?");
    values.push(data.shortDescription);
  }
  if (data.intro !== undefined) {
    fields.push("intro = ?");
    values.push(data.intro);
  }
  if (data.metaTitle !== undefined) {
    fields.push("meta_title = ?");
    values.push(data.metaTitle);
  }
  if (data.metaDescription !== undefined) {
    fields.push("meta_description = ?");
    values.push(data.metaDescription);
  }
  if (data.sortOrder !== undefined) {
    fields.push("sort_order = ?");
    values.push(data.sortOrder);
  }
  if (data.published !== undefined) {
    fields.push("published = ?");
    values.push(data.published ? 1 : 0);
  }

  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')");
    values.push(id);

    await db
      .prepare(`UPDATE services SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  // Replace items if provided
  if (data.items !== undefined) {
    await db.prepare("DELETE FROM service_items WHERE service_id = ?").bind(id).run();

    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i]!;
      await db
        .prepare(
          `INSERT INTO service_items (id, service_id, title, description, sort_order) VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(crypto.randomUUID(), id, item.title, item.description, item.sortOrder ?? i + 1)
        .run();
    }
  }

  const updated = await getServiceById(id);
  if (!updated) throw new Error("Service not found");
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot delete service.");

  // Items are deleted by ON DELETE CASCADE, but also explicitly for safety
  await db.prepare("DELETE FROM service_items WHERE service_id = ?").bind(id).run();
  const result = await db.prepare("DELETE FROM services WHERE id = ?").bind(id).run();
  return result.success;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Quote Requests
// ═══════════════════════════════════════════════════════════════════════════════

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  buildingType: string;
  county: string;
  budget: string;
  details: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface QuoteRequestRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  building_type: string;
  county: string;
  budget: string;
  details: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function rowToQuoteRequest(row: QuoteRequestRow): QuoteRequest {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    buildingType: row.building_type,
    county: row.county,
    budget: row.budget,
    details: row.details,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAllQuoteRequests(): Promise<QuoteRequest[]> {
  const db = getDB();
  if (!db) return [];

  const { results } = await db
    .prepare("SELECT * FROM quote_requests ORDER BY created_at DESC")
    .all<QuoteRequestRow>();
  return results.map(rowToQuoteRequest);
}

export async function createQuoteRequest(data: {
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  buildingType: string;
  county: string;
  budget: string;
  details?: string | null;
}): Promise<QuoteRequest> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot create quote request.");

  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO quote_requests (id, name, phone, email, service, building_type, county, budget, details, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    )
    .bind(
      id,
      data.name,
      data.phone,
      data.email ?? null,
      data.service,
      data.buildingType,
      data.county,
      data.budget,
      data.details ?? null,
    )
    .run();

  const created = await db
    .prepare("SELECT * FROM quote_requests WHERE id = ?")
    .bind(id)
    .first<QuoteRequestRow>();
  if (!created) throw new Error("Failed to create quote request");
  return rowToQuoteRequest(created);
}

export async function updateQuoteRequest(
  id: string,
  data: Partial<Pick<QuoteRequest, "status" | "notes">>,
): Promise<QuoteRequest> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot update quote request.");

  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.status !== undefined) {
    fields.push("status = ?");
    values.push(data.status);
  }
  if (data.notes !== undefined) {
    fields.push("notes = ?");
    values.push(data.notes);
  }

  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')");
    values.push(id);
    await db
      .prepare(`UPDATE quote_requests SET ${fields.join(", ")} WHERE id = ?`)
      .bind(...values)
      .run();
  }

  const row = await db
    .prepare("SELECT * FROM quote_requests WHERE id = ?")
    .bind(id)
    .first<QuoteRequestRow>();
  if (!row) throw new Error("Quote request not found");
  return rowToQuoteRequest(row);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Contact Messages
// ═══════════════════════════════════════════════════════════════════════════════

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

interface ContactMessageRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

function rowToContactMessage(row: ContactMessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    subject: row.subject,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  const db = getDB();
  if (!db) return [];

  const { results } = await db
    .prepare("SELECT * FROM contact_messages ORDER BY created_at DESC")
    .all<ContactMessageRow>();
  return results.map(rowToContactMessage);
}

export async function createContactMessage(data: {
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  message: string;
}): Promise<ContactMessage> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot create contact message.");

  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO contact_messages (id, name, phone, email, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
    )
    .bind(id, data.name, data.phone, data.email ?? null, data.subject ?? null, data.message)
    .run();

  const row = await db
    .prepare("SELECT * FROM contact_messages WHERE id = ?")
    .bind(id)
    .first<ContactMessageRow>();
  if (!row) throw new Error("Failed to create contact message");
  return rowToContactMessage(row);
}

export async function updateContactMessage(
  id: string,
  data: Partial<Pick<ContactMessage, "status">>,
): Promise<ContactMessage> {
  const db = getDB();
  if (!db) throw new Error("D1 database not available. Cannot update contact message.");

  if (data.status !== undefined) {
    await db
      .prepare("UPDATE contact_messages SET status = ? WHERE id = ?")
      .bind(data.status, id)
      .run();
  }

  const row = await db
    .prepare("SELECT * FROM contact_messages WHERE id = ?")
    .bind(id)
    .first<ContactMessageRow>();
  if (!row) throw new Error("Contact message not found");
  return rowToContactMessage(row);
}
