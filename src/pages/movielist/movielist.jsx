import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./moviecard.jsx";
import classNames from "classnames/bind";
import styles from "./movielist.module.css";
import movies from "../../sample.jsx";
const clx = classNames.bind(styles);

const MovieList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery)
    );

    const handleCardClick = (movieId) => {
        console.log("nav");
        navigate(`/info/${movieId}`);
    };

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
                    <MovieCard key={movie.id} movie={movie} isFeatured={index === 0} 
                    onclick={() => handleCardClick(movie.id)}/>
                    
                ))}
            </div>
        </div>
    );
};

export default MovieList;
