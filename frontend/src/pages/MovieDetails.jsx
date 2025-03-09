import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api"; // Fetch movie details


function MovieDetails() {
    const { id } = useParams(); // Get movie ID from URL
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="movie-details">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster"/>
            <div className="details-content">
                <h1>{movie.title}</h1>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}</p>
                <p><strong>Overview:</strong> {movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieDetails;
