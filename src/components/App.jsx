// IMPORTS
import movieReducer from "../context/movieReducer";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Logo from "./Logo";
import SearchResults from "./SearchResults";
import ErrorMessage from "./ErrorMessage";
import MovieList from "./MovieList";
import Watchlist from "./Watchlist";

//API
import { API_KEY } from "../context/api";

//HOOKS
import { useReducer, useEffect } from "react";
import useDebouncer from "../hooks/useDebouncer";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";

const initialState = {
  query: "",
  movies: [],
  loading: false,
  error: "",
  selectedMovie: null,
  watchlist: [],
  hasLoadedWatchlist: false,
  showWatchList: false,
};

function App() {
  //STATES
  const [
    {
      query,
      movies,
      loading,
      error,
      selectedMovie,
      watchlist,
      hasLoadedWatchlist,
      showWatchList,
    },
    dispatch,
  ] = useReducer(movieReducer, initialState);
  const debouncedQuery = useDebouncer(query);

  //handler functions
  function loadWatchlist() {
    const stored = JSON.parse(localStorage.getItem("watchlist"));

    return stored ? stored : [];
  }

  //   useEffects----------
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim() === "") {
      dispatch({ type: "clear_results" });
      return;
    }
    async function fetchMovies() {
      dispatch({ type: "search_start" });
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&api_key=${API_KEY}
`
        );
        if (!res.ok)
          throw new Error("Something Went Wrong, not able to fetch movies");
        const data = await res.json();
        if (!data.results || data.results.length === 0)
          throw new Error("No Movies Found!");

        dispatch({ type: "search_success", payload: data.results });
      } catch (err) {
        console.error(err.message);
        dispatch({ type: "search_error", payload: err.message });
      }
    }

    if (debouncedQuery.length < 2) {
      return;
    }

    fetchMovies();
  }, [debouncedQuery]);

  useEffect(() => {
    if (hasLoadedWatchlist)
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist, hasLoadedWatchlist]);

  useEffect(() => {
    const loader = loadWatchlist();

    dispatch({ type: "load_watchlist", payload: loader });
  }, []);

  //JSX
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar>
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-between">
          <Logo />
          <SearchBar
            query={query}
            dispatch={dispatch}
            showWatchList={showWatchList}
          />
          <SearchResults movies={movies} />
        </div>
      </Navbar>
      <main className="max-w-7xl mx-auto px-6 py-10">
        {showWatchList ? (
          <Watchlist watchlist={watchlist} dispatch={dispatch} />
        ) : (
          <>
            {loading && <Loader />}
            {error && <ErrorMessage error={error} />}
            {!loading && !error && (
              <MovieList movies={movies} dispatch={dispatch} />
            )}
          </>
        )}
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            dispatch={dispatch}
            watchlist={watchlist}
          />
        )}
      </main>
    </div>
  );
}
export default App;
