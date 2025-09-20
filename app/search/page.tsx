import { MovieCardList } from "@/components/movie-card-list";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const { page: pageParam, query = "" } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div className="min-h-screen pb-20 px-8 py-8 sm:px-16 sm:py-12">
      <MovieCardList page={page} query={query} />
    </div>
  );
}
