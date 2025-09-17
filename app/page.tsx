import { Header } from "@/components/header";
import { MovieCardList } from "@/components/movie-card-list";
import { Footer } from "@/components/footer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const { page: pageParam, query = "" } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-8 sm:p-16">
        <MovieCardList page={page} query={query} />
      </main>
      <Footer />
    </div>
  );
}
