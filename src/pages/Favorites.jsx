import React from 'react';
import '../css/Favorite.css'
import { useMovieContext } from '../context/MovieContext';  
import MovieCard from '../../components/MovieCard';

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className='favorites'> 
        <h2> Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map(movie =>  (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1>Favorites Page</h1>
      <p>Your favorite movies will appear here.</p>
      <div className="movie-grid">
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites; 