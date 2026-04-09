import Link from "next/link";
import { Category } from "@/data/types";
import { getToolsByCategory } from "@/data/tools";

export function CategoryCard({ category }: { category: Category }) {
  const count = getToolsByCategory(category.slug).length;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block border border-border rounded-lg p-4 hover:bg-card-hover hover:border-accent/30 transition-all"
    >
      <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
      <p className="text-xs text-muted">{count} tools</p>
    </Link>
  );
}
