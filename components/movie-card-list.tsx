import { fetchMovies } from "@/lib/tmdb";
import { MovieCard } from "./movie-card";
import { Movie } from "@/types/movie";
import { Pagination } from "./pagination";

type Props = {
  page: number;
  query: string;
};

export const MovieCardList = async ({ page, query }: Props) => {
  const { movies, totalPages, totalResults } = await fetchMovies(page, query);

  if (!movies || movies.length === 0) {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-1 relative z-10">
        {movies?.map((movie: Movie, index: number) => (
          <div
            key={movie.id}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: 'both'
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={page} 
        totalPages={totalPages}
        totalResults={totalResults}
        query={query} 
      />
    </div>
  );
};
