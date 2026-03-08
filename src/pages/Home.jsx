import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";


function Home() {
    
    // To manage the state of the search query, we can use the useState hook to create a state variable called searchQuery and a function to update it called setSearchQuery. We will initialize the searchQuery state variable to an empty string.
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    // Loading state to show a loading indicator while fetching data from the API.
    const [loading, setLoading] = useState(true);
    // Error state to handle any errors that may occur during the API request.
    const [error, setError] = useState(null);

    // To load popular movies when the home page opens, we use useEffect to call getPopularMovies when the component mounts, then update the movies state with the API results.
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch popular movies. Please try again later.");
            }
            finally{
                setLoading(false);
            }  
        }

        loadPopularMovies();
    }, [])

    
    // To handle the search functionality, we can create a function that will be called when the search form is submitted. 
    // This function will prevent the default form submission behavior, and then we can use the search query to filter the movies and display only those that match the query.
    const handleSearch = async(e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return;
        if (loading) return;

        // set the loading state to true before making the API request, and then set it back to false once the request is complete. This will allow us to show a loading indicator while the search results are being fetched.
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies. Please try again later.");
        } finally {
            setLoading(false);
        }
        setSearchQuery("")
    };

    return (
        <div className="home">
            {/* search form */}
           <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? ( 
                <div className="loading">Loading...</div>
            ) : (
            <div className="movies-grid">
                {movies.map(movie => 
                // To conditionally render the movie cards based on the search query, 
                // we can use the startsWith method to check if the movie title starts with the search query
                    movie.title.toLowerCase().startsWith(searchQuery) && (
                         <MovieCard key={movie.id} movie={movie} />
                    )
                )}
            </div>
            )}
        </div>
    );
}

export default Home;