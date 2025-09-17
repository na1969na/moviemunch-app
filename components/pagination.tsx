"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  query,
}: {
  currentPage: number;
  query?: string;
}) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (query) params.set("query", query);
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-end items-center gap-3 mt-6">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          aria-label="Previous page"
          className="transition-all duration-300 hover:-translate-y-0.5"
        >
          <button className="btn btn-circle bg-black text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </Link>
      )}

      <Link
        href={buildUrl(currentPage + 1)}
        aria-label="Next page"
        className="transition-all duration-300 hover:-translate-y-0.5"
        >
        <button className="btn btn-circle bg-black text-white">
          <ChevronRight className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
}
