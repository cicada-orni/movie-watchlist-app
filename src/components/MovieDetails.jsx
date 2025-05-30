import { useState, useEffect } from "react";
function MovieDetails({ movie, dispatch, watchlist }) {
  const [isVisible, setIsVisible] = useState(false);
  const isAdded = watchlist.some((w) => w.id === movie.id);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      dispatch({ type: "close_movie" });
    }, 300);
  }

  useEffect(() => {
    const callback = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", callback);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", callback);
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      onClick={() => handleClose()}
    >
      <div
        className={`w-full max-w-md bg-zinc-900 h-full shadow-lg overflow-y-auto transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-4">
          <div className="relative">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/500x750?text=No+Image&font=roboto"
              }
              alt={`Poster of ${movie.title}`}
              className="w-full h-auto object-cover rounded"
            />
            <button
              onClick={() => handleClose()}
              className={`absolute top-4 right-4 ${
                isAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white text-sm px-3 py-1 rounded-full shadow transition transition duration-200`}
            >
              ✖ Close
            </button>
          </div>
          <h2 className="text-white text-2x1 font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-400">
            {movie.release_date.slice(0, 4)} • ⭐{" "}
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
        <div className="flex justify-center">
          {isAdded ? (
            <p className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition transition duration-200">
              <span className="text-xl">✓</span> In Watchlist
            </p>
          ) : (
            <button
              onClick={() => {
                dispatch({
                  type: "add_to_watchlist",
                  payload: { ...movie, watched: false, rating: 0 },
                });
                handleClose();
              }}
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition transition duration-200"
            >
              Add to Watchlist <span className="text-xl">+</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
