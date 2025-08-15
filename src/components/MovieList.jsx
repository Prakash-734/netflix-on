import { useState } from "react";
import MovieCard from "./MovieCard";
import TrailerModal from "./TrailerModal";

const MovieList = ({ title, movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.backdrop_path}
              title={
                movie.title || movie.name || movie.original_title || movie.original_name
              }
              onClick={() => setSelectedMovieId(movie.id)}
            />
          ))}
        </div>
      </div>

      {selectedMovieId && (
        <TrailerModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
