import '../css/Favorites.css'
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
function Favorite() {
    const { favorites } = useMovieContext();

    return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            ) : (
                <div className="favorites-empty">
                    <h2>No Favorites Added Yet</h2>
                    <p>Start adding movies to your favorites and they'll appear here</p>
                </div>
            )}
        </div>
    );
}
export default Favorite;