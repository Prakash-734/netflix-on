import { useSelector } from "react-redux";

import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="w-screen  bg-black">
        <div className="mt-0 md:-mt-56 pl-12 relative z-20">
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"TV Shows"} movies={movies.tvShows} />
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Blockbuster"} movies={movies.blockbusterMovies} />
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
