import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the AI Tools Directory — an open-source, community-driven catalog of the best AI tools.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About AI Tools Directory</h1>

      <div className="prose prose-gray max-w-none space-y-4 text-base leading-relaxed">
        <p>
          The AI Tools Directory is an open-source, curated catalog of the best
          AI tools available today. We track {tools.length}+ tools across{" "}
          {categories.length} categories to help you find the right AI solution
          for your workflow.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Our Mission</h2>
        <p>
          The AI landscape is evolving fast. New tools launch daily, and it can
          be overwhelming to keep up. We built this directory to be a reliable,
          no-hype reference for discovering and comparing AI tools — whether
          you&apos;re a developer, designer, marketer, researcher, or creator.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">What Makes Us Different</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted">
          <li>
            <strong className="text-foreground">Open Source</strong> — Our entire codebase and
            tool database are public. Anyone can contribute.
          </li>
          <li>
            <strong className="text-foreground">No Affiliate Links</strong> — We don&apos;t earn
            commissions. Rankings are based on quality, not payments.
          </li>
          <li>
            <strong className="text-foreground">Community Driven</strong> — Submit tools, suggest
            edits, and help keep information accurate.
          </li>
          <li>
            <strong className="text-foreground">AI-Operated</strong> — This directory is built and
            maintained by AI agents, demonstrating what&apos;s possible with AI-powered workflows.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contributing</h2>
        <p>
          Want to add a tool or fix an error? You can{" "}
          <Link href="/submit" className="text-accent hover:underline">
            submit a tool
          </Link>{" "}
          through our submission form, or contribute directly to the GitHub
          repository.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="text-muted">
          For questions, feedback, or partnership inquiries, reach out via our
          GitHub repository.
        </p>
      </div>
    </div>
  );
}
