import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (id, type = "movie") => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
      API_OPTIONS
    );

    const json = await data.json();

    const trailer = json.results.find((video) => video.type === "Trailer") || json.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    if (id && !trailerVideo) {
      getVideos();
    }
  }, [id]);
};

export default useMovieTrailer;
