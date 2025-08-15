import { useDispatch, useSelector } from "react-redux";
import { addBlockbusterMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useBlockbusterMovies = () => {
  const dispatch = useDispatch();

  const blockbusterMovies = useSelector((store) => store.movies.blockbusterMovies)

  const getBlockbusterMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      API_OPTIONS
    );

    const json = await data.json();

    dispatch(addBlockbusterMovies(json.results));
  };

  useEffect(() => {
    !blockbusterMovies && getBlockbusterMovies();
  }, []);
};

export default useBlockbusterMovies;
