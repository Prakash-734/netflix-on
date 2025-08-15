import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const TrailerPage = () => {
  const { id } = useParams();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useMovieTrailer(id);

  if (!trailerVideo) return <div className="text-white">Loading trailer...</div>;

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <iframe
  className="w-full aspect-video"
  src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0`}
  title="Trailer"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
></iframe>

    </div>
  );
};

export default TrailerPage;
