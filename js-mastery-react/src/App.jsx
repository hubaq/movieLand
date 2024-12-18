/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { div } from "framer-motion/client";
//  c23338df
const API__URL = "http://www.omdbapi.com?apikey=c23338df";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API__URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies(query);
  }, [query]);

  return (
    <div className="app">
      <h1>Movieland</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(query)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
