import Link from "next/link";
import { Tool } from "@/data/types";

const pricingColors: Record<string, string> = {
  free: "bg-green-100 text-green-800",
  freemium: "bg-blue-100 text-blue-800",
  paid: "bg-amber-100 text-amber-800",
  "open-source": "bg-purple-100 text-purple-800",
};

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block border border-border rounded-lg p-5 bg-card-bg hover:bg-card-hover hover:border-accent/30 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-base">{tool.name}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${pricingColors[tool.pricing] ?? "bg-gray-100 text-gray-800"}`}
        >
          {tool.pricing}
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed">{tool.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-muted bg-gray-100 rounded px-1.5 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
