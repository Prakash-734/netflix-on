import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


app.post("/api/gpt", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ API key not configured" });
    }

  
    const strictPrompt = `
      You are a movie recommendation system.
      The user request is: ${query}

      TASK:
      - Recommend exactly 5 movies.
      - Return ONLY the movie titles, comma-separated, in one single line.
      - No numbering, no extra text, no line breaks.

      Example:
      The Godfather, Inception, Interstellar, Parasite, The Dark Knight
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: strictPrompt }],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return res.status(500).json({ error: `Groq API error: ${response.status}` });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Server error (GPT):", error);
    res.status(500).json({ error: error.message });
  }
});


app.post("/api/search-movies", async (req, res) => {
  try {
    const { movies } = req.body;
    if (!Array.isArray(movies) || movies.length === 0) {
      return res.status(400).json({ error: "Movies array is required" });
    }

    if (!process.env.TMDB_KEY) {
      return res.status(500).json({ error: "TMDB API key not configured" });
    }

    const searchPromises = movies.map(async (movie) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.trim())}&include_adult=false&language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.TMDB_KEY}`
            }
          }
        );

        if (!response.ok) {
          console.error(`TMDB error for "${movie}":`, response.status);
          return { movie, results: [] };
        }

        const data = await response.json();
        return { movie, results: data.results || [] };

      } catch (err) {
        console.error(`Error searching "${movie}":`, err.message);
        return { movie, results: [] };
      }
    });

    const searchResults = await Promise.all(searchPromises);
    res.json({ searchResults });

  } catch (error) {
    console.error("TMDB search error:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
