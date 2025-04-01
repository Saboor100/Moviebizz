import React, { useState, useEffect } from "react";
import { getGenres, getFilteredMovies } from "../services/api";

const MovieFilters = ({ setMovies }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                console.log("Fetched genres:", data); // Debugging
                if (data && Array.isArray(data)) {
                    setGenres(data); // Fix: Ensure the correct data format
                } else {
                    console.error("Unexpected genres format:", data);
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);
    
    

    const handleFilter = async () => {
        try {
            const filteredMovies = await getFilteredMovies({
                genreId: selectedGenre || null,
                year: selectedYear || null
            });

            if (filteredMovies) {
                setMovies(filteredMovies);
            } else {
                console.warn("No movies found for selected filters.");
                setMovies([]);  // Clear movie list if no results
            }
        } catch (error) {
            console.error("Error fetching filtered movies:", error);
        }
    };

    return (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            {/* Genre Filter */}
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>

            {/* Year Filter */}
            <input
                type="number"
                placeholder="Year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
            />

            {/* Apply Filters Button */}
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default MovieFilters;

//<------END----->
