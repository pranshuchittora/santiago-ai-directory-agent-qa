"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { categories } from "@/data/categories";

const pricingOptions = ["all", "free", "freemium", "paid", "open-source"] as const;

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") ?? "all";
  const currentPricing = searchParams.get("pricing") ?? "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      <select
        value={currentCategory}
        onChange={(e) => updateFilter("category", e.target.value)}
        className="h-9 px-3 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        value={currentPricing}
        onChange={(e) => updateFilter("pricing", e.target.value)}
        className="h-9 px-3 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        {pricingOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "all" ? "All Pricing" : opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
