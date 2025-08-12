import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovieTMDB = async (movies) => {
    try {
      const response = await fetch("http://localhost:5001/api/search-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movies })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Backend error: ${response.status}`);
      }
      const data = await response.json();
      return data.searchResults.map(item => item.results);
    } catch {
      return movies.map(() => []);
    }
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma separated like: Movie1, Movie2, Movie3, Movie4, Movie5";

      const response = await fetch("http://localhost:5001/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: gptQuery })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Backend error: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`Backend error: ${result.error}`);
      }

      if (!result?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from AI");
      }

      const movieString = result.choices[0].message.content;
      let movies = [];

      const lines = movieString.split("\n");
      for (const line of lines) {
        if (line.includes(",") && line.trim().length > 0) {
          movies = line
            .trim()
            .split(",")
            .map(movie => movie.trim())
            .filter(movie => movie.length > 0);
          break;
        }
      }

      if (movies.length === 0) {
        movies = movieString
          .split(/[,\n]/)
          .map(movie => movie.trim())
          .filter(
            movie =>
              movie.length > 0 &&
              !movie.toLowerCase().includes("recommendation")
          )
          .slice(0, 5);
      }

      if (movies.length === 0) {
        throw new Error("No movies found in AI response");
      }

      const tmdbResults = await searchMovieTMDB(movies);

      dispatch(
        addGptMovieResult({
          movieNames: movies,
          movieResults: tmdbResults
        })
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[40%] md:p-0 md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          disabled={loading}
        />
        <button
          className={`col-span-3 m-4 py-2 px-4 text-white rounded-lg ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? "Loading..." : lang[langKey].search}
        </button>
      </form>

      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
