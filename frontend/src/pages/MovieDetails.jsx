import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api"; 
import "../css/MovieDetails.css"; 

function MovieDetails() {
    const { id } = useParams();
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
        <div className="movie-page">
            <div className="movie-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster"/>
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p className="release-date"><strong>Release Date:</strong> {movie.release_date}</p>
                    <p className="rating"><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}</p>
                    <p className="overview">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
