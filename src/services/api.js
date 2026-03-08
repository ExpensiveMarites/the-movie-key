const API_KEY = "41f5760a47d628244e79423b6ce18616";
const BASE_URL = "https://api.themoviedb.org/3";

// To fetch popular movies from the TMDB API, we can create a function called getPopularMovies that makes a GET request to the /movie/popular endpoint of the API. This function will return a list of popular movies that we can display on our home page.
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    // To implement the search functionality, we can create a function called searchMovies that takes a search query as an argument and makes a GET request to the /search/movie endpoint of the TMDB API. This function will return a list of movies that match the search query, which we can then display on the home page.
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json();
    return data.results;
};