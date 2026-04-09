import { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "text-generation",
    name: "Text Generation",
    description: "AI tools for writing, content creation, and text generation",
    icon: "pencil",
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    description: "AI-powered image creation and editing tools",
    icon: "image",
  },
  {
    slug: "code-assistants",
    name: "Code Assistants",
    description: "AI tools for coding, debugging, and software development",
    icon: "code",
  },
  {
    slug: "chatbots",
    name: "Chatbots & Assistants",
    description: "Conversational AI and virtual assistant platforms",
    icon: "chat",
  },
  {
    slug: "video",
    name: "Video & Animation",
    description: "AI tools for video creation, editing, and animation",
    icon: "video",
  },
  {
    slug: "audio",
    name: "Audio & Music",
    description: "AI-powered audio generation, music creation, and voice tools",
    icon: "audio",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "AI tools to boost workflow efficiency and automation",
    icon: "zap",
  },
  {
    slug: "data-analytics",
    name: "Data & Analytics",
    description: "AI-powered data analysis, visualization, and insights",
    icon: "chart",
  },
  {
    slug: "design",
    name: "Design & UI",
    description: "AI tools for graphic design, UI/UX, and creative work",
    icon: "palette",
  },
  {
    slug: "search",
    name: "Search & Research",
    description: "AI-enhanced search engines and research assistants",
    icon: "search",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
