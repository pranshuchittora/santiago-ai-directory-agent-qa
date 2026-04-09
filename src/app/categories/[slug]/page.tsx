import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} AI Tools`,
    description: category.description,
    openGraph: {
      title: `${category.name} AI Tools - AI Tools Directory`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-muted mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-muted text-lg mb-8">{category.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="text-sm px-3 py-1.5 border border-border rounded-full hover:bg-card-hover transition-colors"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
