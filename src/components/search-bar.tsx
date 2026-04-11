"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useRef, useEffect, useState } from "react";

export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue ?? "");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setValue(q);

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new debounced update
    debounceTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    }, 300);
  }

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <label htmlFor="search-tools" className="sr-only">
        Search AI tools
      </label>
      <div className="relative">
        <input
          id="search-tools"
          type="search"
          value={value}
          onChange={handleInputChange}
          placeholder="Search AI tools..."
          aria-label="Search AI tools"
          aria-busy={isPending}
          aria-describedby={isPending ? "search-loading" : undefined}
          className="w-full h-12 pl-4 pr-4 rounded-lg border border-card-border bg-card-bg text-foreground placeholder:text-muted text-base focus-ring transition-all duration-200"
        />
        {isPending && (
          <div
            id="search-loading"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"
            role="status"
            aria-live="polite"
            aria-label="Searching..."
          />
        )}
      </div>
    </div>
  );
}
