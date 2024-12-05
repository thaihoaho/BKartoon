import React from "react";
import classNames from  "classnames/bind";
import styles from "./MovieCard.module.css";

const clx = classNames.bind(styles);

const MovieCard = ({ movie, isFeatured }) => {
  return (
    <div className={clx("movie-card", { "movie-card-featured": isFeatured })}>
      <img src={movie.poster} alt={`${movie.title} poster`} className={clx("movie-poster")} />
      <div className={clx("movie-info")}>
        <h3 className={clx("movie-title")}>{movie.title}</h3>
        <p className={clx("movie-year")}>{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
