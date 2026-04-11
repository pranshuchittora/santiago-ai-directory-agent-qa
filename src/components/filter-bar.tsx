"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { categories } from "@/data/categories";

const pricingOptions = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "open-source", label: "Open Source" },
] as const;

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name (A-Z)" },
  { value: "category", label: "Category" },
  { value: "featured", label: "Featured First" },
] as const;

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category");
  const currentPricing = searchParams.get("pricing");
  const currentSort = searchParams.get("sort") ?? "newest";
  const hasActiveFilters = currentCategory || currentPricing;

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  function clearAllFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("pricing");
    params.delete("sort");
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 items-center justify-center" role="group" aria-label="Filter by category">
        <span id="category-label" className="text-sm font-medium text-muted">
          Category:
        </span>
        <button
          onClick={() => updateFilter("category", null)}
          aria-label="Show all categories"
          aria-current={!currentCategory ? "true" : undefined}
          className={`px-3 py-1.5 rounded-full text-sm font-medium chip-interactive focus-ring ${
            !currentCategory
              ? "bg-accent text-white"
              : "bg-card-bg border border-card-border hover:bg-card-hover"
          }`}
        >
          All
        </button>
        {categories.slice(0, 8).map((cat) => (
          <button
            key={cat.slug}
            onClick={() => updateFilter("category", cat.slug)}
            aria-label={`Filter by ${cat.name} category`}
            aria-current={currentCategory === cat.slug ? "true" : undefined}
            className={`px-3 py-1.5 rounded-full text-sm font-medium chip-interactive focus-ring ${
              currentCategory === cat.slug
                ? "bg-accent text-white"
                : "bg-card-bg border border-card-border hover:bg-card-hover"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Pricing Chips */}
      <div className="flex flex-wrap gap-2 items-center justify-center" role="group" aria-label="Filter by pricing">
        <span id="pricing-label" className="text-sm font-medium text-muted">
          Pricing:
        </span>
        <button
          onClick={() => updateFilter("pricing", null)}
          aria-label="Show all pricing models"
          aria-current={!currentPricing ? "true" : undefined}
          className={`px-3 py-1.5 rounded-full text-sm font-medium chip-interactive focus-ring ${
            !currentPricing
              ? "bg-accent text-white"
              : "bg-card-bg border border-card-border hover:bg-card-hover"
          }`}
        >
          All
        </button>
        {pricingOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateFilter("pricing", opt.value)}
            aria-label={`Filter by ${opt.label} pricing`}
            aria-current={currentPricing === opt.value ? "true" : undefined}
            className={`px-3 py-1.5 rounded-full text-sm font-medium chip-interactive focus-ring ${
              currentPricing === opt.value
                ? "bg-accent text-white"
                : "bg-card-bg border border-card-border hover:bg-card-hover"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 justify-center">
        <label htmlFor="sort" className="text-sm font-medium text-muted">
          Sort by:
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateFilter("sort", e.target.value === "newest" ? null : e.target.value)}
          aria-label="Sort tools by"
          className="h-9 px-3 rounded-md border border-card-border bg-card-bg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus-ring"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          aria-label="Clear all active filters"
          className="text-sm text-accent hover:text-accent-hover focus-ring rounded underline font-medium px-2 py-1"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
