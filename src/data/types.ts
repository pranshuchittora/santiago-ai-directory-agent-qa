export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  url: string;
  category: string;
  secondaryCategory?: string;
  pricing: "free" | "freemium" | "paid" | "open-source";
  featured?: boolean;
  tags: string[];
  features?: string[];
  useCases?: string[];
  logoUrl?: string | null;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}
