import { MovieDetail } from "@/components/movie-detail";
import { fetchMovieDetails } from "@/lib/tmdb";
import { SnackSuggestion } from "@/components/snack-suggestion";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);
  return (
    <>
      <MovieDetail movie={movie} />
      <SnackSuggestion movie={movie} />
    </>
  );
}
