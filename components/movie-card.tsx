import { Movie } from "@/types/movie";
import Link from "next/link";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
      <div className="card group cursor-pointer transition-all duration-300 relative overflow-hidden rounded-xl mb-10">
        <figure className="relative">
          <Link href={`/movie/${movie.id}`} className="block relative">
            <img src={movie.backdrop_path} alt={movie.title} className="cursor-pointer" />
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
            </div>
          </Link>
        </figure>
      </div>
  );
};
