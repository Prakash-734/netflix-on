import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerVideo, setTrailerVideo] = useState(null);

  useEffect(() => {
    const getMovieVideos = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      setTrailerVideo(trailer);
    };

    if (movieId) getMovieVideos();
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex">
      
      <button
        onClick={onClose}
        className="absolute top-20 max-md:top-55 max-sm:top-65 left-10 max-sm:left-100 text-white text-2xl z-50 bg-white cursor-pointer opacity-60 rounded-full w-12 h-12 flex items-center justify-center hover:opacity-85 transition-all"
      >
        ✖
      </button>
      
      <div className="w-full h-full">
        {trailerVideo && (
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&loop=1&playlist=${trailerVideo?.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default TrailerModal;