"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const params = new URLSearchParams(searchParams);
          if (query.trim()) {
            params.set("query", query.trim());
            params.delete("page"); // Reset to page 1 when searching
          } else {
            params.delete("query");
          }
          router.push(`/?${params.toString()}`);
        }, 500);
      };
    })(),
    [router, searchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (searchQuery.trim()) {
        params.set("query", searchQuery.trim());
        params.delete("page");
      } else {
        params.delete("query");
      }
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <header className="p-8">
      <div className="flex justify-between items-center">
        <div></div>
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          MovieMunch
        </h1>
        <div className="flex items-center gap-2">
          <Search />
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="px-3 py-2 border-none rounded-md text-sm focus:outline-none focus:bg-gray-100 min-w-[200px]"
          />
        </div>
      </div>
    </header>
  );
};
