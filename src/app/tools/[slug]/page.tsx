import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getToolBySlug, getToolsByCategory } from "@/data/tools";
import { getCategoryBySlug } from "@/data/categories";
import { ToolCard } from "@/components/tool-card";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - AI Tool Review`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - AI Tools Directory`,
      description: tool.description,
    },
  };
}

const pricingColors: Record<string, string> = {
  free: "bg-green-100 text-green-800",
  freemium: "bg-blue-100 text-blue-800",
  paid: "bg-amber-100 text-amber-800",
  "open-source": "bg-purple-100 text-purple-800",
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="text-sm text-muted mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold">{tool.name}</h1>
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${pricingColors[tool.pricing] ?? "bg-gray-100 text-gray-800"}`}
          >
            {tool.pricing}
          </span>
        </div>
        <p className="text-lg text-muted leading-relaxed mb-6">
          {tool.longDescription}
        </p>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
        >
          Visit {tool.name} &rarr;
        </a>
      </div>

      <div className="border-t border-border pt-6 mb-8">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
          Details
        </h2>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-muted mb-1">Category</dt>
            <dd>
              {category ? (
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-accent hover:underline"
                >
                  {category.name}
                </Link>
              ) : (
                tool.category
              )}
            </dd>
          </div>
          <div>
            <dt className="text-muted mb-1">Pricing</dt>
            <dd className="capitalize">{tool.pricing}</dd>
          </div>
          <div>
            <dt className="text-muted mb-1">Tags</dt>
            <dd className="flex flex-wrap gap-1">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 rounded px-1.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {tool.features && tool.features.length > 0 && (
        <div className="border-t border-border pt-6 mb-8">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted">
            {tool.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {tool.useCases && tool.useCases.length > 0 && (
        <div className="border-t border-border pt-6 mb-8">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            Use Cases
          </h2>
          <div className="flex flex-wrap gap-2">
            {tool.useCases.map((uc, i) => (
              <span key={i} className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                {uc}
              </span>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">
            More in {category?.name ?? "this category"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
