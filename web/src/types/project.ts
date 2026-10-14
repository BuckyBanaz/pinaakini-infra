export type ProjectCategory = "Villas" | "Layouts" | "Farmlands" | "Triplex Houses";

export type ProjectStatus = "Now Selling" | "Coming Soon" | "Sold Out" | "Completed";

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** How the property is offered. Defaults to ["Buy"]. */
  offer?: ("Buy" | "Rent")[];
  location: string;
  extent: string; // e.g. "28 Acres", "7,750 sqft"
  units: string; // e.g. "220 Plots", "Exclusive 4BR Villa"
  featuredImage: string;
  gallery: string[];
  shortDescription: string;
  description: string[];
  keyHighlights: ProjectHighlight[];
  specifications: ProjectSpecification[];
  clearance: string; // e.g. "DTCP & NUDA Sanctioned"
  videoUrl?: string;
  brochureUrl?: string;
  mapEmbedUrl?: string;
  mapExternalUrl?: string;
  featured: boolean;
  isActive: boolean; // whether it has an active detail page for sales
  priceGuide?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface EnquirySubmission {
  fullName: string;
  phoneNumber: string;
  email?: string;
  projectName?: string;
  enquiryType: "General Enquiry" | "Schedule Site Visit" | "Brochure Request" | "Pricing Details";
  preferredDate?: string;
  message?: string;
  consent: boolean;
  honeypot?: string;
}
