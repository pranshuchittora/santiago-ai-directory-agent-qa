import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Tool",
  description: "Submit an AI tool to be listed in the AI Tools Directory.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Submit a Tool</h1>
      <p className="text-muted mb-8">
        Know an AI tool that should be listed here? Submit it and we&apos;ll
        review it for inclusion in the directory.
      </p>

      <form className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Tool Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            placeholder="e.g. ChatGPT"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            Website URL *
          </label>
          <input
            type="url"
            id="url"
            name="url"
            required
            className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-y"
            placeholder="Brief description of what this tool does..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">Select...</option>
              <option value="text-generation">Text Generation</option>
              <option value="image-generation">Image Generation</option>
              <option value="code-assistants">Code Assistants</option>
              <option value="chatbots">Chatbots & Assistants</option>
              <option value="video">Video & Animation</option>
              <option value="audio">Audio & Music</option>
              <option value="productivity">Productivity</option>
              <option value="data-analytics">Data & Analytics</option>
              <option value="design">Design & UI</option>
              <option value="search">Search & Research</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="pricing"
              className="block text-sm font-medium mb-1"
            >
              Pricing Model
            </label>
            <select
              id="pricing"
              name="pricing"
              className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">Select...</option>
              <option value="free">Free</option>
              <option value="freemium">Freemium</option>
              <option value="paid">Paid</option>
              <option value="open-source">Open Source</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Your Email (optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full h-11 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
        >
          Submit Tool
        </button>
        <p className="text-xs text-muted text-center">
          Submissions are reviewed manually. Not all tools will be listed.
        </p>
      </form>
    </div>
  );
}
