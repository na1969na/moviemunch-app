export type Person = {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string; // for cast
  job?: string; // for crew
};

export type Movie = {
  id: string;
  title: string;
  release_date: string;
  overview: string;
  popularity: number;
  vote_average: number;
  backdrop_path: string;
  genres: string[];
  director?: Person;
  cast?: Person[];
};
