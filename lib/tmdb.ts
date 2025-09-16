import { Movie } from "@/types/movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not set");
}

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";

// Fetch paginated movies from TMDB
export async function fetchMovies(
  page?: number,
  query?: string
): Promise<Movie[]> {
  const url = query
    ? `${TMDB_API_URL}/search/movie?query=${query}`
    : `${TMDB_API_URL}/discover/movie?`;
  const res = await fetch(
    url +
      new URLSearchParams({
        language: "en-US",
        sort_by: "popularity.desc",
        page: String(page),
      }),
    {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return (await res.json()).results.map((m: any) => ({
    id: m.id,
    title: m.title,
    backdrop_path: `${TMDB_IMAGE_URL}${m.backdrop_path}`,
  }));
}

// Fetch movie details from TMDB
export async function fetchMovieDetails(id: string): Promise<Movie> {
  const res = await fetch(`${TMDB_API_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });
  return (await res.json()).results.map((m: any) => ({
    id: m.id,
    title: m.title,
    backdrop_path: `${TMDB_IMAGE_URL}${m.backdrop_path}`,
  }));
}
