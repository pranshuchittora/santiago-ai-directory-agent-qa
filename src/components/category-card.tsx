import Link from "next/link";
import { Category } from "@/data/types";
import { getToolsByCategory } from "@/data/tools";

const categoryEmojis: Record<string, string> = {
  "text-generation": "✍️",
  "image-generation": "🎨",
  "code-assistant": "💻",
  "music-audio": "🎵",
  "video-generation": "🎬",
  "design-tool": "🖼️",
  "productivity": "📊",
  "analytics": "📈",
  "writing-assistant": "📝",
  "research": "🔬",
  "chatbot": "🤖",
  "translation": "🌐",
  "voice": "🎙️",
  "ai-tools": "🛠️",
  "other": "✨",
};

export function CategoryCard({ category }: { category: Category }) {
  const count = getToolsByCategory(category.slug).length;
  const emoji = categoryEmojis[category.slug] || "✨";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center gap-3 p-5 border border-card-border rounded-xl bg-card-bg hover:bg-card-hover hover:border-accent/50 hover:shadow-md transition-all duration-200 animate-fade-in focus-ring"
      aria-label={`${category.name} category - ${count} ${count === 1 ? "tool" : "tools"}`}
    >
      <div className="text-3xl group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
        {emoji}
      </div>
      <div className="text-center flex-1">
        <h3 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-muted mt-1">
          {count} {count === 1 ? "tool" : "tools"}
        </p>
      </div>
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/30 transition-all duration-200" aria-hidden="true" />
    </Link>
  );
}
