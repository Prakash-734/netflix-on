import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";


const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-20 ">
        <img
  className="w-screen h-screen object-cover fixed top-0 left-0"
  src="auth_bg.jpg"
  alt=""
/>

      </div>
    <div className="">
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
    </>
  );
};
export default GptSearch;
