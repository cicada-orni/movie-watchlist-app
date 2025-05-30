export default function movieReducer(state, action) {
  switch (action.type) {
    case "set_query":
      return { ...state, query: action.payload };
    case "search_start":
      return { ...state, loading: true, error: "" };
    case "search_success":
      return { ...state, movies: action.payload, loading: false };
    case "search_error":
      return { ...state, loading: false, error: action.payload };
    case "clear_results":
      return { ...state, movies: [], loading: false, error: "" };
    case "select_movie":
      return { ...state, selectedMovie: action.payload };
    case "close_movie":
      return { ...state, selectedMovie: null };
    case "add_to_watchlist":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "remove_from_watchlist":
      return {
        ...state,
        watchlist: state.watchlist.filter((w) => w.id !== action.payload),
      };
    case "load_watchlist":
      return { ...state, watchlist: action.payload, hasLoadedWatchlist: true };
    case "update_watchlist_note":
      return {
        ...state,
        watchlist: state.watchlist.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, note: action.payload.note }
            : movie
        ),
      };
    case "toggle_watchlist_view":
      return { ...state, showWatchList: !state.showWatchList };
    case "toggle_watch_status":
      return {
        ...state,
        watchlist: state.watchlist.map((movie) =>
          movie.id === action.payload
            ? { ...movie, watched: !movie.watched }
            : movie
        ),
      };
    case "update_rating":
      return {
        ...state,
        watchlist: state.watchlist.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, rating: action.payload.rating }
            : movie
        ),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// "update_watchlist_note"
