const VITE_TMDB_KEY = import.meta.env.VITE_TMDB_KEY

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: VITE_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w300";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "ta", name: "Tamil" },
  { identifier: "hin", name: "Hindi" },
];

