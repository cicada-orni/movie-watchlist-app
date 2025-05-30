import { useEffect, useState } from "react";
import useDebouncer from "../hooks/useDebouncer";

function WatchlistItem({ movie, dispatch }) {
  const [note, setNote] = useState(movie.note || "");
  const [rating, setRating] = useState(movie.rating || 0);
  const debouncedNote = useDebouncer(note, 400);
  useEffect(() => {
    dispatch({
      type: "update_watchlist_note",
      payload: { id: movie.id, note: debouncedNote },
    });
  }, [debouncedNote]);

  return (
    <div className="bg-zinc-800 p-3 rounded-lg shadow hover:shadow-lg transition relative group">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/500x750?text=No+Image&font=roboto"
        }
        alt={movie.title}
        className="rounded w-full object-cover h-[300px]"
      />
      <div className="mt-3">
        <h3 className="text-white text-base font-medium truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400">
          {movie.release_date?.slice(0, 4)} • ⭐{" "}
          {movie.vote_average?.toFixed(1)}
        </p>
      </div>
      <button
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        onClick={() =>
          dispatch({ type: "remove_from_watchlist", payload: movie.id })
        }
      >
        Remove
      </button>
      <label className="text-xs text-gray-400">Personal Note</label>
      <textarea
        placeholder="Add a note (max 50 characters)"
        maxLength={50}
        className="w-full mt-3 p-2 text-sm text-white bg-zinc-700 rounded outline-none resize-none placeholder-gray-400"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <p
        className={`text-right text-xs mt-1 ${
          note.length > 40 ? "text-red-500" : "text-gray-400"
        }`}
      >
        {note.length}
      </p>
      <button
        onClick={() =>
          dispatch({ type: "toggle_watch_status", payload: movie.id })
        }
        className={`text-sm font-medium px-3 py-2 rounded-lg transition ${
          movie.watched
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-blue-700 text-gray-200 hover:bg-blue-600"
        }`}
      >
        {movie.watched ? "Watched ✓" : "Not Watched"}
      </button>
      {/* <select
        value={rating}
        onChange={(e) => {
          const newRating = +e.target.value;
          setRating(newRating);
          dispatch({
            type: "update_rating",
            payload: { id: movie.id, rating: newRating },
          });
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select> */}
      <div className="flex gap-1 mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`cursor-pointer text-x1 ${
              i < rating ? "text-yellow-400" : "text-gray-500"
            }`}
            onClick={() => {
              setRating(i + 1);
              dispatch({
                type: "update_rating",
                payload: { id: movie.id, rating: i + 1 },
              });
            }}
          >
            ★
          </span>
        ))}
        <p className="text-xs text-gray-400 mt-1">Your rating: {rating}/5</p>
      </div>
    </div>
  );
}
export default WatchlistItem;
