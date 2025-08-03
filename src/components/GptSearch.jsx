import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBAr";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src="auth_bg.jpg" alt="" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};
export default GptSearch;
