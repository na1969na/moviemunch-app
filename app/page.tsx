import { MovieCardList } from "@/components/movie-card-list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const { page: pageParam, query = "" } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start px-8 py-8 sm:px-32 sm:py-16">
        <MovieCardList page={page} query={query} />
      </main>
    </div>
  );
}
