import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBAr";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 md:w-max sm:w-max max-sm:w-max">
        <img src="auth_bg.jpg" alt="" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};
export default GptSearch;
