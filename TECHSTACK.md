# Tech Stack

## Core Framework

| Technology | Version | Rationale |
|---|---|---|
| **Next.js** | 16.2.3 | App Router with static generation, built-in routing, image/font optimization, and Vercel-native deployment. |
| **React** | 19.2.4 | Server Components reduce client bundle size; async components simplify data loading. |
| **TypeScript** | ^5 | Type safety across the codebase; strict mode enabled. |

## Styling

| Technology | Version | Rationale |
|---|---|---|
| **Tailwind CSS** | ^4 | Utility-first CSS with zero-runtime overhead. Used via PostCSS plugin. |
| **@tailwindcss/postcss** | ^4 | PostCSS integration for Tailwind v4. |

## Fonts

| Technology | Rationale |
|---|---|
| **Geist** (via `next/font/google`) | Clean sans-serif font optimized for readability. Self-hosted by Next.js for performance. |
| **Geist Mono** (via `next/font/google`) | Monospace companion for code-related UI. |

## Linting

| Technology | Version | Rationale |
|---|---|---|
| **ESLint** | ^9 | Code quality and consistency. |
| **eslint-config-next** | 16.2.3 | Next.js-specific lint rules (accessibility, best practices). |

## Build and Bundling

| Technology | Rationale |
|---|---|
| **Next.js built-in bundler** | Handles TypeScript compilation, tree-shaking, code splitting, and static page generation. |
| **PostCSS** | Processes Tailwind CSS. Config in `postcss.config.mjs`. |

## Hosting and Deployment

| Technology | Rationale |
|---|---|
| **Vercel** | Zero-config deployment from GitHub. Global CDN, automatic HTTPS, preview deployments on PRs. |
| **GitHub** | Source control and CI trigger. Public repo at `SantiagoCoronado/ai-tools-directory`. |

## Data Storage

| Technology | Rationale |
|---|---|
| **JSON files** (`data/tools.json`, `data/categories.json`) | Simple, version-controlled data store for 202 tools and 15 categories. No database needed for the MVP — data is imported at build time. |

## Version Requirements

- **Node.js**: >= 18 (Vercel default is 24 LTS)
- **npm**: >= 9 (used for package management; `package-lock.json` committed)
- **TypeScript**: ^5 with `strict: true`, `bundler` module resolution
- **Target**: ES2017

## Local Development Setup

```bash
# Clone the repository
git clone https://github.com/SantiagoCoronado/ai-tools-directory.git
cd ai-tools-directory

# Install dependencies
npm install

# Start development server
npm run dev
# App runs at http://localhost:3000

# Build for production
npm run build

# Start production server locally
npm start

# Lint
npm run lint
```

## Path Aliases

| Alias | Maps to |
|---|---|
| `@/*` | `./src/*` |

Configured in `tsconfig.json`. Use `@/data/tools` instead of relative imports.
