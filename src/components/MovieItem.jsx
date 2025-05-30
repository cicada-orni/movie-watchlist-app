function MovieItem({ movie, dispatch }) {
  return (
    <div
      className="bg-zinc-800 rounded-lg overflow-hidden shadow hover:scale-105 transition cursor-pointer"
      onClick={() => {
        dispatch({ type: "select_movie", payload: movie });
      }}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/500x750?text=No+Image&font=roboto"
        }
        alt={`Poster of ${movie.title}`}
        className="w-full h-80 object-cover bg-zinc-700"
      />
      <div className="p-3 text-sm">
        <h3 className="text-white font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400">{movie.release_date.split("-").at(0)}</p>
      </div>
    </div>
  );
}

export default MovieItem;
