function SearchResults({ movies }) {
  return (
    <div>
      <p>
        <span>{movies.length}</span> movies found
      </p>
    </div>
  );
}

export default SearchResults;
