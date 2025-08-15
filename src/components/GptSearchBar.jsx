import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {
  const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query :" + searchText.current.value + ". Give me ONLY movie names, no languages, no extra text. Format: MovieName1, MovieName2, MovieName3, MovieName4, MovieName5";

  // Call backend instead of using Groq SDK directly
  const result = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: gptQuery })
  });

  const data = await result.json();
  if (!data?.choices) return "Not found";

  let responseText = data.choices?.[0]?.message?.content.trim();
    
    
    let movies = responseText.split(",").map(item => item.trim());
    
    
    movies = movies.filter(item => {
      
      const languages = ['tamil', 'hindi', 'english', 'telugu', 'malayalam', 'kannada', 'bengali', 'punjabi', 'marathi', 'gujarati'];
      return !languages.includes(item.toLowerCase()) && item.length > 0;
    });

    
    if (movies.length > 5) {
      movies = movies.filter((_, index) => index % 2 === 0).slice(0, 5);
    }

  
    movies = movies.slice(0, 5);


    const promiseArray = movies.map(movie => searchMovieTMDB(movie))
    const tmdbResults = await Promise.all(promiseArray);

   

    dispatch(addGptMovieResult({movieNames:movies, movieResults:tmdbResults}));
  };

  return (
    <div className="pt-[50%] sm:pt-[12%] md:pt-[10%] lg:pt-[8%] px-4 sm:px-6 lg:px-8 flex justify-center">
      <form
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-700/50"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              ref={searchText}
              type="text"
              className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg bg-white/95 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm"
              placeholder={lang[langKey].gptSearchPlaceHolder}
            />
          </div>
         
          <button
            type="button"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">{lang[langKey].search}</span>
              <span className="sm:hidden">Search</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;