"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { Search } from "lucide-react";

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');
    
    if (previousPath && previousPath !== currentPath) {
      setIsSearchVisible(false);
    }
    
    sessionStorage.setItem('previousPath', currentPath);
  }, [searchParams]);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const params = new URLSearchParams(searchParams);
          if (query.trim()) {
            params.set("query", query.trim());
            params.delete("page");
          } else {
            params.delete("query");
          }
          router.push(`/search?${params.toString()}`);
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
      router.push(`/search?${params.toString()}`);
    }
  };

  const toggleSearch = () => {
    if (!isSearchVisible) {
      setSearchQuery("");
    }
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="p-8">
      <div className="flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          MovieMunch
        </h1>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleSearch}
            className="p-2 cursor-pointer transition-colors"
            aria-label="Search"
          >
            <Search />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isSearchVisible ? "w-[200px] opacity-100" : "w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="px-4 py-2 rounded-full text-sm focus:outline-none border-none bg-white/80 w-full"
              autoFocus={isSearchVisible}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
