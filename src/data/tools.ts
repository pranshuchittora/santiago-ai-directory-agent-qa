import { Tool } from "./types";
import toolsJson from "../../data/tools.json";

interface RawTool {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  secondaryCategory?: string;
  pricing: string;
  url: string;
  logoUrl?: string | null;
  features?: string[];
  useCases?: string[];
}

// First tools per category get featured status
const featuredSlugs = new Set<string>();
const seenCategories = new Set<string>();
for (const raw of toolsJson as RawTool[]) {
  if (!seenCategories.has(raw.category)) {
    seenCategories.add(raw.category);
    featuredSlugs.add(raw.slug);
  }
}

export const tools: Tool[] = (toolsJson as RawTool[]).map((raw) => ({
  slug: raw.slug,
  name: raw.name,
  description: raw.shortDescription,
  longDescription: raw.description,
  url: raw.url,
  category: raw.category,
  secondaryCategory: raw.secondaryCategory,
  pricing: raw.pricing as Tool["pricing"],
  featured: featuredSlugs.has(raw.slug),
  tags: (raw.useCases ?? []).slice(0, 4).map((uc) => uc.toLowerCase().replace(/\s+/g, "-")),
  features: raw.features,
  useCases: raw.useCases,
  logoUrl: raw.logoUrl,
}));

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(
    (t) => t.category === categorySlug || t.secondaryCategory === categorySlug
  );
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}
