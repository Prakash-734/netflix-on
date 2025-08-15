import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies:null,
    blockbusterMovies:null,
    upcomingMovies:null,
    tvShows:null,
    trailerVideo: null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addBlockbusterMovies: (state, action) => {
      state.blockbusterMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTvShows: (state, action) => {
      state.tvShows = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    }
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addBlockbusterMovies, addUpcomingMovies, addTvShows} = movieSlice.actions;

export default movieSlice.reducer;
