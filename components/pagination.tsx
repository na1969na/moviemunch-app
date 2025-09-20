"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  totalResults,
  query,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  query?: string;
}) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (query) params.set("query", query);
    return query ? `/search?${params.toString()}` : `/?${params.toString()}`;
  };

  // ページ範囲の計算
  const itemsPerPage = 20; // TMDBのデフォルト
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  // 表示するページ番号を計算
  const getVisiblePages = () => {
    const delta = 2; // 現在のページの前後に表示するページ数
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center gap-4 mt-6">      
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* 前のページボタン */}
          {currentPage > 1 ? (
            <Link
              href={buildUrl(currentPage - 1)}
              aria-label="Previous page"
              className="transition-all duration-200 hover:bg-gray-100"
            >
              <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <button 
              disabled 
              className="px-3 py-2 rounded-md border border-gray-200 text-gray-400 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* ページ番号ボタン */}
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <Link
                  href={buildUrl(page as number)}
                  className="transition-all duration-200"
                >
                  <button
                    className={`px-3 py-2 rounded-md border ${
                      page === currentPage
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                </Link>
              )}
            </div>
          ))}

          {/* 次のページボタン */}
          {currentPage < totalPages ? (
            <Link
              href={buildUrl(currentPage + 1)}
              aria-label="Next page"
              className="transition-all duration-200 hover:bg-gray-100"
            >
              <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <button 
              disabled 
              className="px-3 py-2 rounded-md border border-gray-200 text-gray-400 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
