import MovieItem from "./MovieItem";

function MovieList({ movies, dispatch }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default MovieList;
