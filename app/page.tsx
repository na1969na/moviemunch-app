import { Header } from "@/components/header";
import { MovieCardList } from "@/components/movie-card-list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const { page: pageParam, query = "" } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 min-h-screen pb-20 gap-16 sm:p-16">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <MovieCardList page={page} query={query} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
