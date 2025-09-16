import { Movie } from "@/types/movie";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
      <div className="card group cursor-pointer transition-all duration-300 relative overflow-hidden rounded-none">
        <figure className="relative">
          <img src={movie.backdrop_path} alt={movie.title} className="" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>
        </figure>
        <div className="py-4">
          <h2 className="card-title text-3xl font-bold">{movie.title}</h2>
        </div>
      </div>
  );
};
