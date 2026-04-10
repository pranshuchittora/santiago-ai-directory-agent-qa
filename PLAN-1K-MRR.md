# Path to $1k MRR — AI Tools Directory

**Date:** 2026-04-10
**Status:** Draft for board approval
**Owner:** CEO

---

## Executive Summary

We have a live AI tools directory with 201+ tools, deployed on Vercel, with an engineering team executing UI/UX improvements. We have zero revenue. This plan outlines how we reach $1,000 MRR within 90 days through three revenue streams: featured listings, affiliate revenue, and a submit-your-tool flow.

---

## Current Position

| Asset | Status |
|-------|--------|
| Product (directory) | Live, 201+ tools, 15 categories |
| Tech stack | Next.js App Router, Vercel, static generation |
| Team | CEO, CTO, CMO, UXDesigner, 2 Frontend Engineers |
| GitHub | Public repo, active development |
| Revenue | $0 |
| Traffic | Unmeasured (no analytics yet) |

---

## Revenue Model

Three streams, ordered by time-to-revenue:

### Stream 1: Featured Listings ($400-600/month target)

Charge AI tool companies to appear at the top of category pages and search results with a "Featured" badge and enhanced card.

- **Pricing:** $49/month (starter) or $99/month (premium with analytics dashboard)
- **Target:** 8-12 paying customers
- **Why it works:** AI tool companies spend heavily on distribution. A curated directory with SEO traffic is cheap customer acquisition for them.
- **Build required:**
  - Featured flag in tool data model
  - Featured badge + priority sort on category/search pages
  - "Get Featured" CTA page with Stripe checkout
  - Basic analytics (impressions, clicks) for premium tier

### Stream 2: Affiliate Revenue ($200-400/month target)

Embed affiliate/referral links for tools that offer affiliate programs (most SaaS tools do: 15-30% recurring commission).

- **Target:** 30-50 tools with affiliate links, converting at industry avg
- **Why it works:** Directory traffic has high purchase intent. Visitors come to compare and choose tools.
- **Build required:**
  - Affiliate link field in tool data model
  - Outbound click tracking
  - Affiliate program signup for top 50 tools (manual CMO work)
  - Disclosure/transparency notice

### Stream 3: Submit-Your-Tool Flow ($100-200/month target)

Let tool makers submit their own listings. Free basic listing, $29/month for expedited review + enhanced profile.

- **Target:** 5-7 paid submissions/month
- **Why it works:** New AI tools launch weekly. Makers want distribution. A "submit" flow captures this demand passively.
- **Build required:**
  - Submit tool form (name, URL, description, category, pricing)
  - Review queue (admin/CMO)
  - Stripe checkout for paid tier
  - Email notifications

---

## Growth Engine (Traffic is the Prerequisite)

Revenue requires traffic. Target: 10,000 monthly visitors by day 60.

### SEO (Primary — Owned, Compounding)

- **Tool detail pages** are already statically generated — good foundation
- Add JSON-LD structured data (already planned: CAT-29)
- Create "Best [category] AI Tools" landing pages (programmatic SEO)
- Blog content: "X vs Y" comparison posts, "Best AI tools for [use case]"
- Target long-tail keywords: "best AI writing tools", "free AI image generators"

### Content & Social (CMO-Led)

- Weekly "AI Tool of the Week" newsletter
- Twitter/X thread highlighting new tools
- Reddit/HN presence in relevant communities (not spam — genuine recommendations)
- Product Hunt launch for the directory itself

### Referral Loop

- "Powered by AI Tools Directory" badge for listed tools to display
- Backlink building through tool maker relationships

---

## Execution Timeline

### Phase 1: Foundation (Days 1-14)
| Task | Owner | Priority |
|------|-------|----------|
| Add analytics (Vercel Analytics or Plausible) | CTO | Critical |
| Add Stripe integration skeleton | CTO | Critical |
| Design "Get Featured" page | UXDesigner | High |
| Sign up for top 20 affiliate programs | CMO | High |
| Add affiliate link field to data model | CTO | High |
| Submit tool form (basic) | CTO | Medium |

### Phase 2: Monetization Live (Days 15-30)
| Task | Owner | Priority |
|------|-------|----------|
| Featured listing checkout flow (Stripe) | CTO | Critical |
| Featured badge + priority sort | CTO | Critical |
| Affiliate links integrated for 20+ tools | CMO | High |
| Outbound click tracking | CTO | High |
| "Best X AI Tools" pages (5 categories) | CMO | High |
| Product Hunt launch | CMO | Medium |

### Phase 3: Scale & Outreach (Days 31-60)
| Task | Owner | Priority |
|------|-------|----------|
| Cold outreach to 50 AI tool companies for featured listings | CMO | Critical |
| Paid submit flow live | CTO | High |
| 10 more "Best X" SEO pages | CMO | High |
| Newsletter launch (weekly) | CMO | Medium |
| JSON-LD + OG images (CAT-29) | CTO | Medium |
| Comparison feature (CAT-25) | CTO | Medium |

### Phase 4: Optimize & Compound (Days 61-90)
| Task | Owner | Priority |
|------|-------|----------|
| A/B test pricing tiers | CMO + CTO | High |
| Expand affiliate coverage to 50 tools | CMO | High |
| Premium analytics dashboard for featured listers | CTO | Medium |
| Evaluate ad network as supplemental revenue | CMO | Low |

---

## Key Metrics to Track

| Metric | Day 30 Target | Day 60 Target | Day 90 Target |
|--------|---------------|---------------|---------------|
| Monthly visitors | 2,000 | 10,000 | 25,000 |
| Featured listings sold | 2 | 6 | 12 |
| Affiliate clicks/month | 200 | 1,000 | 3,000 |
| Submit-your-tool signups | - | 10 | 25 |
| **MRR** | **$100** | **$500** | **$1,000** |

---

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Low traffic = no revenue leverage | High | SEO-first strategy; programmatic pages scale without headcount |
| AI tool companies won't pay $49-99/month | Medium | Start with free featured trials, prove click volume, then convert |
| Affiliate programs have low payouts | Medium | Focus on high-ACV tools (enterprise, $50+/month products) |
| Team bandwidth stretched across UI + monetization | Medium | Pause P3/P4 UI work, redirect engineers to monetization infra |

---

## Decision Required from Board

1. **Approve pivot priority:** Pause remaining UI polish (P3-P4) to focus engineering on monetization infrastructure?
2. **Stripe account:** Board needs to set up Stripe and provide API keys.
3. **Budget for outreach tools:** CMO may need email outreach tooling (~$50/month).
4. **Domain/brand:** Are we keeping the current domain or investing in a branded .com?

---

## Bottom Line

$1k MRR is achievable in 90 days if we:
1. Ship Stripe + featured listings in 2 weeks
2. Get traffic via programmatic SEO pages
3. Do direct outreach to AI tool companies starting day 30

The directory is the asset. Traffic is the unlock. Monetization is straightforward once we have both.
