# Architecture

## System Overview

AI Tools Directory is a statically-generated content site that catalogs AI tools across multiple categories. It is built with Next.js App Router and deployed on Vercel. There is no backend server, database, or authentication — all data is embedded at build time from JSON files.

## Component Diagram

```
data/tools.json ──┐
                   ├──> src/data/ (loaders + types) ──> src/app/ (pages)
data/categories.json┘                                      │
                                                           ├── / (homepage: search, filter, featured, all tools)
                                                           ├── /tools/[slug] (tool detail, static params)
                                                           ├── /categories/[slug] (category listing)
                                                           ├── /about (static)
                                                           ├── /submit (static form placeholder)
                                                           └── /sitemap.xml (generated)

src/components/
  ├── search-bar.tsx   (client component — query string search)
  ├── filter-bar.tsx   (client component — category/pricing filters)
  ├── tool-card.tsx    (server component — tool list card)
  └── category-card.tsx(server component — category grid card)
```

## Data Model

All data lives in `data/` as static JSON and is imported at build time.

### Tool (`data/tools.json`)

| Field               | Type                                           | Description                      |
|---------------------|------------------------------------------------|----------------------------------|
| `slug`              | `string`                                       | URL-safe identifier              |
| `name`              | `string`                                       | Display name                     |
| `shortDescription`  | `string`                                       | One-line summary                 |
| `description`       | `string`                                       | Full description                 |
| `category`          | `string`                                       | Primary category slug            |
| `secondaryCategory` | `string?`                                      | Optional secondary category slug |
| `pricing`           | `"free" \| "freemium" \| "paid" \| "open-source"` | Pricing model               |
| `url`               | `string`                                       | External tool URL                |
| `logoUrl`           | `string \| null`                               | Optional logo URL                |
| `features`          | `string[]?`                                    | Key feature list                 |
| `useCases`          | `string[]?`                                    | Use case list                    |

### Category (`data/categories.json`)

| Field         | Type     | Description            |
|---------------|----------|------------------------|
| `slug`        | `string` | URL-safe identifier    |
| `name`        | `string` | Display name           |
| `description` | `string` | Category description   |
| `icon`        | `string` | Emoji or icon string   |

### Data Loading (`src/data/`)

- `tools.ts` — imports `data/tools.json`, maps raw JSON to the app `Tool` type, assigns featured status (first tool per category), and provides `searchTools()`, `getToolBySlug()`, `getToolsByCategory()`, `getFeaturedTools()`.
- `categories.ts` — imports `data/categories.json`, provides `getCategoryBySlug()`.
- `types.ts` — TypeScript interfaces for `Tool` and `Category`.

## Routing and Pages

All routes use Next.js App Router (`src/app/`):

| Route                  | Type                  | Description                                                  |
|------------------------|-----------------------|--------------------------------------------------------------|
| `/`                    | Dynamic (searchParams)| Homepage with search, filters, featured tools, category grid |
| `/tools/[slug]`        | Static (SSG)          | Tool detail with metadata, features, use cases, related tools|
| `/categories/[slug]`   | Static (SSG)          | Category page listing all tools in that category             |
| `/about`               | Static                | About page                                                   |
| `/submit`              | Static                | Tool submission placeholder                                  |
| `/sitemap.xml`         | Generated             | SEO sitemap covering all tools and categories                |

Static pages use `generateStaticParams()` to pre-render all 201 tool pages and 15 category pages at build time (223 total static pages).

## Client vs Server Components

The app is predominantly server-rendered. Only two components use `"use client"`:

- **SearchBar** — handles form submission and URL updates via `useRouter`/`useSearchParams`.
- **FilterBar** — handles category/pricing filter selection via URL search params.

All other components (layout, pages, cards) are React Server Components.

## Deployment Architecture

```
GitHub (SantiagoCoronado/ai-tools-directory)
  │
  └──> Vercel (auto-deploy on push)
         ├── Static pages pre-rendered at build time
         ├── Sitemap generated at build time
         └── Production URL: ai-tools-directory-orcin.vercel.app
```

- **Hosting**: Vercel (automatic builds from GitHub)
- **Build output**: Static HTML + client JS bundles
- **CDN**: Vercel Edge Network serves all pages globally
- **No backend services**: No database, no API routes, no server functions

## Key Design Decisions

1. **Static-first**: All tool and category pages are statically generated. This gives near-instant load times and excellent SEO with zero runtime infrastructure cost.

2. **JSON-file data store**: Tools and categories are stored as JSON files committed to the repo. This eliminates database complexity for the MVP. Data updates require a commit and redeploy.

3. **Server Components by default**: Only interactive search/filter UI uses client components. Everything else renders on the server, minimizing client JS bundle size.

4. **URL-driven search/filter**: Search and filtering use URL search parameters rather than client state, making results shareable and bookmarkable.

5. **No API layer**: Data is imported directly at build time. There are no API routes. This simplifies the architecture but means data changes require a new build.

6. **SEO-optimized**: Each tool page has unique metadata (title, description, OpenGraph tags). A comprehensive sitemap covers all pages.
