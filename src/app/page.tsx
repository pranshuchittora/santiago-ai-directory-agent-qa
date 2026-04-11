import { Suspense } from "react";
import Link from "next/link";
import { tools, searchTools, getFeaturedTools, sortTools, paginateTools, SortOption } from "@/data/tools";
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

function buildQueryString(base: URLSearchParams, overrides?: Record<string, string | null>) {
  const params = new URLSearchParams(base.toString());
  if (overrides) {
    Object.entries(overrides).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
  }
  return params.toString();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; pricing?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const hasFilters = params.q || params.category || params.pricing;
  const sortBy = (params.sort as SortOption) || "newest";
  const currentPage = parseInt(params.page || "1", 10);

  let filteredTools: Tool[] | null = null;
  let pagination = null;

  if (hasFilters) {
    filteredTools = getFilteredTools(params);
    const sorted = sortTools(filteredTools, sortBy);
    pagination = paginateTools(sorted, currentPage, 12);
  }

  const featured = getFeaturedTools();
  const baseParams = new URLSearchParams();
  if (params.q) baseParams.set("q", params.q);
  if (params.category) baseParams.set("category", params.category);
  if (params.pricing) baseParams.set("pricing", params.pricing);
  if (sortBy !== "newest") baseParams.set("sort", sortBy);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Hero */}
      <section className="text-center mb-16 sm:mb-20">
        <div className="mb-6 inline-block">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-light text-accent text-sm font-medium">
            ✨ Explore {tools.length}+ AI Tools
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Discover the Best AI Tools
        </h1>
        <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-12">
          Curated directory of {tools.length}+ AI tools across {categories.length}{" "}
          categories. Find the perfect tool for productivity, creativity, and innovation.
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

      {hasFilters && pagination ? (
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold">
              {pagination.total} result{pagination.total !== 1 ? "s" : ""}
              {params.q ? ` for "${params.q}"` : ""}
            </h2>
            {pagination.totalPages > 1 && (
              <p className="text-sm text-muted">
                Page {pagination.page} of {pagination.totalPages}
              </p>
            )}
          </div>

          {pagination.total === 0 ? (
            <p className="text-muted">No tools found. Try a different search or filter.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {pagination.items.map((tool, idx) => (
                  <div key={tool.slug} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  {pagination.hasPrevPage && (
                    <Link
                      href={`/?${buildQueryString(baseParams, { page: String(pagination.page - 1) })}`}
                      className="px-4 py-2 rounded-lg border border-card-border bg-card-bg hover:bg-card-hover active:scale-95 transition-all duration-150 text-sm font-medium text-foreground btn-interactive"
                    >
                      ← Previous
                    </Link>
                  )}

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === pagination.page;
                      return (
                        <Link
                          key={pageNum}
                          href={`/?${buildQueryString(baseParams, { page: String(pageNum) })}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 btn-interactive ${
                            isActive
                              ? "bg-accent text-white shadow-md"
                              : "border border-card-border bg-card-bg hover:bg-card-hover hover:scale-110 text-foreground"
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {pagination.hasNextPage && (
                    <Link
                      href={`/?${buildQueryString(baseParams, { page: String(pagination.page + 1) })}`}
                      className="px-4 py-2 rounded-lg border border-card-border bg-card-bg hover:bg-card-hover active:scale-95 transition-all duration-150 text-sm font-medium text-foreground btn-interactive"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-foreground">Featured Tools</h2>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((tool, idx) => (
                <div key={tool.slug} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
              <span className="text-2xl">📂</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat, idx) => (
                <div key={cat.slug} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <CategoryCard category={cat} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-foreground">All Tools</h2>
              <span className="text-2xl">🛠️</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, idx) => (
                <div key={tool.slug} className="animate-slide-up" style={{ animationDelay: `${Math.min(idx, 11) * 50}ms` }}>
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
