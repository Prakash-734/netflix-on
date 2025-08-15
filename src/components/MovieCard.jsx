import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title, onClick }) => {
  if (!posterPath) return null;

  return (
    <div
      className="relative w-64 md:w-72 pr-2 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={IMG_CDN_URL + posterPath}
        alt={title}
        className="rounded-lg"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
        <h2 className="text-white text-sm md:text-xl font-semibold">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default MovieCard;
