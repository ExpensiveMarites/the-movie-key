import { createContext, useState, useContext, useEffect, use } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

// Provide state to any components that are warapped arround it. This will allow us to share the state of the movies and the favorites list across different components in our application without having to pass props down manually at every level.
export const MovieProvider = ({children}) => {
    
    const [favorites, setFavorites] = useState([])
    
    // Storring Favorites movie in a list in the local storage, so that they persist even after the user refreshes the page or closes the browser. 
    // We can use the useEffect hook to load the favorites from local storage when the component mounts, and then update the favorites state with the stored data.
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        // guard against malformed or "undefined" values
        if (storedFavs && storedFavs !== 'undefined') {
            try {
                setFavorites(JSON.parse(storedFavs));
            } catch {
                console.warn('Failed to parse favorites from localStorage:', storedFavs);
            }
        }
    } , [])

    // We are updating the local storage with the current state of the favorites list whenever it changes. 
    // This way, any changes to the favorites list will be saved in local storage and will persist across page reloads.
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    //To add a movie to the favorites list.
    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    // To remove a movie from the favorite list
    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter(movie => movie.id !== movieId));
    }

    // To check if a movie is already in the favorites list 
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    // The value object contains the state and functions that we want to share across our components.
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}