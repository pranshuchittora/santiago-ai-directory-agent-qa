import Link from "next/link";
import { Tool } from "@/data/types";

const pricingColors: Record<string, { bg: string; text: string; border: string }> = {
  free: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  freemium: {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-900",
  },
  paid: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-900",
  },
  "open-source": {
    bg: "bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-900",
  },
};

export function ToolCard({ tool }: { tool: Tool }) {
  const pricing = pricingColors[tool.pricing] || {
    bg: "bg-gray-500/10",
    text: "text-gray-700 dark:text-gray-300",
    border: "border-gray-200 dark:border-gray-900",
  };

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col h-full border border-card-border bg-card-bg rounded-xl p-6 hover:bg-card-hover hover:border-accent/50 hover:shadow-lg transition-all duration-200 overflow-hidden animate-fade-in focus-ring"
      aria-label={`${tool.name} - ${tool.pricing} pricing - ${tool.description}`}
    >
      {/* Header with title and badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-base text-foreground group-hover:text-accent transition-colors leading-tight flex-1">
          {tool.name}
        </h3>
        <span
          className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap border ${pricing.bg} ${pricing.text} ${pricing.border} flex-shrink-0`}
          aria-label={`Pricing: ${tool.pricing}`}
        >
          {tool.pricing}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-2">
        <span className="sr-only">Tags:</span>
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md bg-card-hover text-muted-light border border-card-border group-hover:border-accent/30 transition-colors"
          >
            {tag}
          </span>
        ))}
        {tool.tags.length > 3 && (
          <span className="text-xs px-2.5 py-1 text-muted" aria-label={`Plus ${tool.tags.length - 3} more tags`}>
            +{tool.tags.length - 3}
          </span>
        )}
      </div>

      {/* Hover indicator */}
      <div className="absolute inset-0 -inset-px bg-gradient-to-r from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/0 pointer-events-none rounded-xl transition-all duration-200" aria-hidden="true" />
    </Link>
  );
}
