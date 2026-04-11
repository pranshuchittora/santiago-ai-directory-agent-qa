"use client";

import { useState, FormEvent, ChangeEvent } from "react";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    category: "",
    pricing: "",
    email: "",
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Tool name is required";
    }

    if (!formData.url.trim()) {
      errors.url = "Website URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      errors.url = "Please enter a valid URL (starting with http:// or https://)";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    return errors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Simulate form submission (in real app, would send to backend)
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        url: "",
        description: "",
        category: "",
        pricing: "",
        email: "",
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="animate-scale-in rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
            Thank you!
          </h2>
          <p className="text-emerald-600 dark:text-emerald-400 mb-4">
            We&apos;ve received your tool submission. Our team will review it and get back to you soon.
          </p>
          <p className="text-sm text-emerald-500 dark:text-emerald-500">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Submit a Tool</h1>
      <p className="text-muted mb-8">
        Know an AI tool that should be listed here? Submit it and we&apos;ll
        review it for inclusion in the directory.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Tool Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 bg-white transition-colors ${
              validationErrors.name
                ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-accent/50 focus:border-accent"
            }`}
            placeholder="e.g. ChatGPT"
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            Website URL *
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 bg-white transition-colors ${
              validationErrors.url
                ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-accent/50 focus:border-accent"
            }`}
            placeholder="https://example.com"
          />
          {validationErrors.url && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.url}</p>
          )}
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
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 bg-white transition-colors resize-y ${
              validationErrors.description
                ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-accent/50 focus:border-accent"
            }`}
            placeholder="Brief description of what this tool does..."
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
          )}
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
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
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
              value={formData.pricing}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
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
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 bg-white transition-colors ${
              validationErrors.email
                ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                : "border-border focus:ring-accent/50 focus:border-accent"
            }`}
            placeholder="you@example.com"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
          )}
        </div>
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 p-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full h-11 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover active:scale-95 transition-all duration-150 btn-interactive"
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
