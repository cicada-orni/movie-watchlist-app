function SearchBar({ query, dispatch, showWatchList }) {
  return (
    <div className="flex gap-4 w-full items-center">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) =>
          dispatch({ type: "set_query", payload: e.target.value })
        }
        className="w-full max-w-xl bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => dispatch({ type: "toggle_watchlist_view" })}
        className={`text-sm font-medium px-3 py-2 rounded-lg transition ${
          showWatchList
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-blue-700 text-gray-200 hover:bg-blue-600"
        }`}
      >
        {showWatchList ? "🔍 Back to Search" : "🎬 Watchlist"}
      </button>
    </div>
  );
}

export default SearchBar;
