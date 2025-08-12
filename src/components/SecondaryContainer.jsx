import { useSelector } from "react-redux"

import MovieList from "./MovieList"

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies)
  
  return (
    movies.nowPlayingMovies && (<div className="w-full bg-black">

      <div className="mt-0 md:-mt-56 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
      </div>

    </div>
    )
  )
}
export default SecondaryContainer