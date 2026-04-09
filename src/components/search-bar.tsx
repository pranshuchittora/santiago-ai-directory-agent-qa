"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search AI tools..."
          className="w-full h-12 pl-4 pr-12 rounded-lg border border-border bg-white text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
}
