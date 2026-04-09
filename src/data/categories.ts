import { Category } from "./types";
import categoriesJson from "../../data/categories.json";

export const categories: Category[] = categoriesJson as Category[];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
