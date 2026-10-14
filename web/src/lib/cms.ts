/**
 * Managed Headless CMS Integration Adapter (Sanity / Headless Content Model)
 *
 * This module provides the connection interface for managing project data,
 * photography galleries, status updates, and SEO metadata via a Headless CMS (e.g. Sanity.io).
 *
 * If CMS environment variables are provided in production:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID
 * - NEXT_PUBLIC_SANITY_DATASET
 * - SANITY_API_TOKEN (optional for authenticated draft previews)
 *
 * It will query the remote CMS dataset.
 * Otherwise, it gracefully falls back to the typed local dataset in `@/lib/projects.ts`.
 */

import { Project } from "@/types/project";
import { PROJECTS, getProjectBySlug as getLocalProjectBySlug } from "./projects";

export interface CMSConfig {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
  useCdn?: boolean;
}

export const cmsConfig: CMSConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const isCMSConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.trim().length > 0
);

/**
 * Fetch all projects from CMS (or typed fallback)
 */
export async function fetchProjects(): Promise<Project[]> {
  if (isCMSConfigured) {
    try {
      const url = `https://${cmsConfig.projectId}.api.sanity.io/v${cmsConfig.apiVersion}/data/query/${cmsConfig.dataset}?query=*[_type == "project"] | order(featured desc, _createdAt desc)`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (data?.result && Array.isArray(data.result) && data.result.length > 0) {
          return data.result as Project[];
        }
      }
    } catch (err) {
      console.warn("CMS fetch failed, utilizing typed fallback dataset:", err);
    }
  }

  // Graceful, resilient fallback to typed source data
  return PROJECTS;
}

/**
 * Fetch single project by slug from CMS (or typed fallback)
 */
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (isCMSConfigured) {
    try {
      const query = encodeURIComponent(`*[_type == "project" && slug.current == "${slug}"][0]`);
      const url = `https://${cmsConfig.projectId}.api.sanity.io/v${cmsConfig.apiVersion}/data/query/${cmsConfig.dataset}?query=${query}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (data?.result) {
          return data.result as Project;
        }
      }
    } catch (err) {
      console.warn(`CMS project fetch for slug "${slug}" failed, using typed fallback:`, err);
    }
  }

  const found = getLocalProjectBySlug(slug);
  return found ?? null;
}
