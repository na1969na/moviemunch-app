"use client";

import Link from "next/link";

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
    <div className="flex justify-center gap-4 mt-6">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 border rounded"
        >
          Prev
        </Link>
      )}
      <span className="px-4 py-2">{currentPage}</span>

      <Link
        href={buildUrl(currentPage + 1)}
        className="px-4 py-2 border rounded"
      >
        Next
      </Link>
    </div>
  );
}
