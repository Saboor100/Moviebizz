
import API_KEY from "../config";
const BASE_URL =  "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  };
  
  export const searchMovies = async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  };
  export const getFilteredMovies = async ({ genreId, year, actorId }) => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

    if (genreId) {
        url += `&with_genres=${genreId}`;
    }
    if (year) {
        url += `&primary_release_year=${year}`;
    }
    if (actorId) {
        url += `&with_cast=${actorId}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
};
export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  console.log("Genres API Response:", data);
  return data.genres || [];
};
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

