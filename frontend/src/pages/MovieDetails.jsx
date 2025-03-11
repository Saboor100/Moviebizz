import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
                setError(null);

                if (data.videos && data.videos.results.length > 0) {
                    const trailer = data.videos.results.find(
                        (video) => video.type === "Trailer" && video.site === "YouTube"
                    );
                    if (trailer) setTrailerKey(trailer.key);
                }
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
        <div className="movie-details-container">
            <div className="movie-card">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                />
            </div>
            <div className="movie-info">
                <h1>{movie.title} <span>({new Date(movie.release_date).getFullYear()})</span></h1>
                <p className="release-date"><strong>Release Date:</strong> {movie.release_date}</p>
                <p className="rating"><strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%</p>

                {trailerKey && (
                    <button
                        className="trailer-button"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}
                    >
                        ▶ Play Trailer
                    </button>
                )}

                <p className="tagline"><i>{movie.tagline}</i></p>

                <h2>Overview</h2>
                <p className="overview">{movie.overview}</p>

                <div className="movie-credits">
                    {movie.credits?.crew?.slice(0, 3).map((person) => (
                        <div key={person.id}>
                            <strong>{person.name}</strong>
                            <p>{person.job}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
