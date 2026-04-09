export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  url: string;
  category: string;
  pricing: "free" | "freemium" | "paid" | "open-source";
  featured?: boolean;
  tags: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}
