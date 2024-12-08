import React, { useEffect,useState } from "react";
import MovieCard from "./moviecard.jsx";
import classNames from "classnames/bind";
import styles from "./movielist.module.css";
// import movies from "../../sample.jsx";
const clx = classNames.bind(styles);
import posterMapping from "./mapping.jsx";
import defaultPoster from "../../assets/default.jpg";


const MovieList = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [movies, setMovies] = useState([]);

    useEffect(() => {
    const fetchMovies = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/films");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse JSON thay vì text
            const data = await response.json();
            console.log("Parsed response JSON:", data);

            // Ánh xạ các trường từ API
            const moviesWithPoster = data.map((movie) => ({
                id: movie.FILM_ID, // Map FILM_ID thành id
                title: movie.FILM_Title, // Map FILM_Title thành title
                poster: posterMapping[movie.FILM_ID] || defaultPoster, // Poster mapping
            }));

            setMovies(moviesWithPoster);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

        fetchMovies();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

        const filteredMovies = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery)
        );

    return (
        <div className={clx("wrap")}>
            <div className={clx("search-wrap")}>
                <input
                    type="text"
                    className={clx("search-bar")}
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={clx("movie-list")}>
                {filteredMovies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} isFeatured={index === 0} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
