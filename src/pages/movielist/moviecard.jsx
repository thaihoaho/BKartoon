import React from "react";
import classNames from "classnames/bind";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";

const clx = classNames.bind(styles);

const MovieCard = ({ movie, isFeatured }) => {
  return (
    <Link
      to={`/info/${movie.id}`}
      className={clx("movie-card-link")}
      style={{ textDecoration: "none" }}
    >
      <div className={clx("movie-card", { "movie-card-featured": isFeatured })}>
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className={clx("movie-poster")}
        />
        <div className={clx("movie-info")}>
          <h3 className={clx("movie-title")}>{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;