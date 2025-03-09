import './css/App.css';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails'; // Import MovieDetails
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from './context/MovieContext';
import TorrentLinks from './components/TorrentLinks';

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/torrents" element={<TorrentLinks />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> {/* Add Movie Details Route */}
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
