import { Movie } from "@/types/movie";
import Link from "next/link";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
      <div className="card group cursor-pointer transition-all duration-300 relative overflow-hidden rounded-none">
        <figure className="relative">
          <Link href={`/movie/${movie.id}`} className="block relative">
            <img src={movie.backdrop_path} alt={movie.title} className="cursor-pointer" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 pointer-events-none"></div>
          </Link>
        </figure>
        <div className="py-4">
          <p className="text-gray-500 font-bold pb-2">{movie.release_date.split("-")[0]}</p>
          <h2 className="card-title text-3xl font-bold">{movie.title}</h2>
        </div>
      </div>
  );
};
