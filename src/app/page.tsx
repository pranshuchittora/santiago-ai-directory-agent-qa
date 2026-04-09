import { Suspense } from "react";
import { tools, searchTools, getFeaturedTools } from "@/data/tools";
import { categories } from "@/data/categories";
import { ToolCard } from "@/components/tool-card";
import { CategoryCard } from "@/components/category-card";
import { SearchBar } from "@/components/search-bar";
import { FilterBar } from "@/components/filter-bar";
import { Tool } from "@/data/types";

function getFilteredTools(params: {
  q?: string;
  category?: string;
  pricing?: string;
}): Tool[] {
  let result = params.q ? searchTools(params.q) : tools;
  if (params.category) {
    result = result.filter((t) => t.category === params.category);
  }
  if (params.pricing) {
    result = result.filter((t) => t.pricing === params.pricing);
  }
  return result;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; pricing?: string }>;
}) {
  const params = await searchParams;
  const hasFilters = params.q || params.category || params.pricing;
  const filteredTools = hasFilters ? getFilteredTools(params) : null;
  const featured = getFeaturedTools();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Discover the Best AI Tools
        </h1>
        <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
          Browse {tools.length}+ curated AI tools across {categories.length}{" "}
          categories. Find the right tool for your workflow.
        </p>
        <Suspense fallback={null}>
          <SearchBar defaultValue={params.q} />
        </Suspense>
        <div className="mt-4">
          <Suspense fallback={null}>
            <FilterBar />
          </Suspense>
        </div>
      </section>

      {hasFilters ? (
        <section>
          <h2 className="text-lg font-semibold mb-4">
            {filteredTools!.length} result{filteredTools!.length !== 1 ? "s" : ""}
            {params.q ? ` for "${params.q}"` : ""}
          </h2>
          {filteredTools!.length === 0 ? (
            <p className="text-muted">No tools found. Try a different search or filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools!.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Featured Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">All Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
