import WatchlistItem from "./WatchlistItem";

function Watchlist({ watchlist, dispatch }) {
  return (
    <section className="px-4 sm:px-8 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">
        🎬 Your Watchlist
      </h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Your watchlist is empty. Start adding some movies
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <WatchlistItem key={movie.id} movie={movie} dispatch={dispatch} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Watchlist;
