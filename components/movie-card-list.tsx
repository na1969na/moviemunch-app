import { fetchMovies } from "@/lib/tmdb";
import { MovieCard } from "./movie-card";
import { Movie } from "@/types/movie";
import { Pagination } from "./pagination";

type Props = {
  page: number;
  query: string;
};

export const MovieCardList = async ({ page, query }: Props) => {
  const movies = await fetchMovies(page, query);

  if (!movies || movies.length === 0) {
    return <div>error</div>;
  }

  return (
    <div>
      <h1 className="text-5xl font-semibold pb-4 px-4">Movies</h1>
      <div className="grid grid-cols-3 gap-1">
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination currentPage={page} query={query} />
    </div>
  );
};
