import { createServerFn } from "@tanstack/react-start";
import {
  // Projects
  getAllProjects,
  getProjectById,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  // Services
  getAllServices,
  getServiceBySlug,
  getServiceById,
  createService,
  updateService,
  deleteService,
  // Submissions
  getAllQuoteRequests,
  createQuoteRequest,
  updateQuoteRequest,
  getAllContactMessages,
  createContactMessage,
  updateContactMessage,
} from "../../lib/db";

// ─── Public: Projects ─────────────────────────────────────────────────────────

export const fetchProjects = createServerFn({ method: "GET" }).handler(async () => {
  return getAllProjects();
});

export const fetchProjectById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return getProjectById(id);
  });

// ─── Public: Services ─────────────────────────────────────────────────────────

export const fetchServices = createServerFn({ method: "GET" }).handler(async () => {
  return getAllServices();
});

export const fetchServiceBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return getServiceBySlug(slug);
  });

// ─── Public: Submissions ──────────────────────────────────────────────────────

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      phone: string;
      email?: string;
      service: string;
      buildingType: string;
      county: string;
      budget: string;
      details?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    return createQuoteRequest(data);
  });

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator(
    (data: { name: string; phone: string; email?: string; subject?: string; message: string }) =>
      data,
  )
  .handler(async ({ data }) => {
    return createContactMessage(data);
  });

// ─── Admin: Projects ──────────────────────────────────────────────────────────

export const fetchAllProjectsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  return getAllProjectsAdmin();
});

export const createNewProject = createServerFn({ method: "POST" })
  .validator(
    (data: { project: Omit<import("../../lib/projects").Project, "id"> & { id?: string } }) => data,
  )
  .handler(async ({ data }) => {
    return createProject(data.project);
  });

export const updateExistingProject = createServerFn({ method: "POST" })
  .validator(
    (data: { id: string; updates: Partial<Omit<import("../../lib/projects").Project, "id">> }) =>
      data,
  )
  .handler(async ({ data }) => {
    return updateProject(data.id, data.updates);
  });

export const deleteExistingProject = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return deleteProject(data.id);
  });

// ─── Admin: Services ──────────────────────────────────────────────────────────

export const fetchAllServicesAdmin = createServerFn({ method: "GET" }).handler(async () => {
  return getAllServices();
});

export const fetchServiceByIdAdmin = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return getServiceById(data.id);
  });

export const createNewService = createServerFn({ method: "POST" })
  .validator(
    (data: {
      service: Omit<import("../../lib/db").Service, "id" | "items"> & {
        id?: string;
        items?: Omit<import("../../lib/db").ServiceItem, "id" | "serviceId">[];
      };
    }) => data,
  )
  .handler(async ({ data }) => {
    return createService(data.service);
  });

export const updateExistingService = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      updates: Partial<Omit<import("../../lib/db").Service, "id" | "items">> & {
        items?: Omit<import("../../lib/db").ServiceItem, "id" | "serviceId">[];
      };
    }) => data,
  )
  .handler(async ({ data }) => {
    return updateService(data.id, data.updates);
  });

export const deleteExistingService = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return deleteService(data.id);
  });

// ─── Admin: Submissions ───────────────────────────────────────────────────────

export const fetchAllQuoteRequests = createServerFn({ method: "GET" }).handler(async () => {
  return getAllQuoteRequests();
});

export const updateQuoteRequestStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: string; notes?: string | null }) => data)
  .handler(async ({ data }) => {
    return updateQuoteRequest(data.id, { status: data.status, notes: data.notes ?? null });
  });

export const fetchAllContactMessages = createServerFn({ method: "GET" }).handler(async () => {
  return getAllContactMessages();
});

export const updateContactMessageStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: string }) => data)
  .handler(async ({ data }) => {
    return updateContactMessage(data.id, { status: data.status });
  });
