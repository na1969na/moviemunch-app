import { Movie } from "@/types/movie";

export const MovieDetail = ({ movie }: { movie: Movie }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative overflow-hidden">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 via-black/40 via-black/30 to-transparent"></div>

        <div className="absolute top-10 left-10">
          <h1 className="text-5xl lg:text-7xl font-bold text-white">
            {movie.title}
          </h1>
        </div>

        <div className="absolute bottom-10 left-10 right-10 font-bold text-white text-xl">
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            <div className="flex-1 max-w-xl">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              </div>
              <p className="leading-relaxed">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            <div className="flex-shrink-0 max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <h4>User Score</h4>
                <p>{Math.round(movie.vote_average * 10)}%</p>
              </div>
              {movie.director && (
                <div className="flex mb-4 gap-4">
                  <h4>Director</h4>
                  <p>{movie.director.name}</p>
                </div>
              )}
              {movie.cast && movie.cast.length > 0 && (
                <div className="flex gap-4">
                  <h4 className="mb-2">Starring</h4>
                  <p>
                    {movie.cast
                      .slice(0, 5)
                      .map((person) => person.name)
                      .join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
