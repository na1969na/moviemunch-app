import { Movie, Person } from "@/types/movie";

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
): Promise<{ movies: Movie[]; totalPages: number; totalResults: number }> {
  const params = new URLSearchParams({
    language: "en-US",
    page: String(page || 1),
  });

  if (query) {
    params.set("query", query);
  } else {
    params.set("sort_by", "popularity.desc");
  }

  const url = query
    ? `${TMDB_API_URL}/search/movie?${params.toString()}`
    : `${TMDB_API_URL}/discover/movie?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  
  const data = await res.json();
  const movies = data.results.map((m: any) => ({
    id: m.id,
    title: m.title,
    release_date: m.release_date,
    backdrop_path: `${TMDB_IMAGE_URL}${m.backdrop_path}`,
  }));
  
  return {
    movies,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

// Fetch movie details from TMDB
export async function fetchMovieDetails(id: string): Promise<Movie> {
  // Fetch movie details and credits in parallel
  const [movieRes, creditsRes] = await Promise.all([
    fetch(`${TMDB_API_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }),
    fetch(`${TMDB_API_URL}/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    })
  ]);
  
  if (!movieRes.ok || !creditsRes.ok) {
    throw new Error("Failed to fetch movie details");
  }
  
  const movieData = await movieRes.json();
  const creditsData = await creditsRes.json();
  
  // Find director
  const director = creditsData.crew.find((person: any) => person.job === 'Director');
  
  // Get top 5 cast members
  const cast = creditsData.cast.slice(0, 5).map((person: any) => ({
    id: person.id,
    name: person.name,
    profile_path: person.profile_path ? `${TMDB_IMAGE_URL}${person.profile_path}` : null,
    character: person.character,
  }));
  
  return {
    id: movieData.id,
    title: movieData.title,
    overview: movieData.overview,
    popularity: movieData.popularity,
    vote_average: movieData.vote_average,
    release_date: movieData.release_date,
    backdrop_path: `${TMDB_IMAGE_URL}${movieData.backdrop_path}`,
    genres: movieData.genres.map((genre: any) => genre.name),
    director: director ? {
      id: director.id,
      name: director.name,
      profile_path: director.profile_path ? `${TMDB_IMAGE_URL}${director.profile_path}` : null,
      job: director.job,
    } : undefined,
    cast: cast,
  };
}
