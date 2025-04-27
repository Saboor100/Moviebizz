import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieFilters from "../context/MovieFilter";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search); //Right
        const query = params.get("query") || "";

        setSearchQuery(query); 

        const fetchMovies = async () => {
            setLoading(true);
            try {
                if (query) {
                    const searchResults = await searchMovies(query);
                    setMovies(searchResults);
                } else {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                }
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [location.search]); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;
        navigate(`?query=${searchQuery}`); 
    };

    return (
        <div className="home">
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

            <MovieFilters setMovies={setMovies} />

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
                    ) : (
                        <p className="no-results">No movies found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
