import React, { useEffect, useState } from 'react';
import './NewsApi.css'; // Import your CSS file

const MovieApi = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie data from TMDb
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIEAPI}`);
        const data = await response.json();

        // Update state with movie data
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  function truncateOverview(overview) {
    const maxLength = 300;
    const truncated = overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview;
    return truncated;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='news-container'>
      {/* Render movie data */}
      {movies.map((movie) => (
        <div className='news-card' key={movie.id}>
          <h2>{movie.title}</h2>
          {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Movie Poster" />}
          <p>{truncateOverview(movie.overview)}</p>
          <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default MovieApi;
