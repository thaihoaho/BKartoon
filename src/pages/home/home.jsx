import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./home.module.css";
const clx = classNames.bind(styles);

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [featuredMovie, setFeaturedMovie] = useState("lion-king");
  const [backgroundIndex, setBackgroundIndex] = useState(2); // State để thay đổi background
  const [movies, setMovies] = useState([]); // Lưu danh sách phim từ API

  const backgroundImages = [
    "src/assets/doraemon.jpg", // Đường dẫn ảnh nền 2
    "src/assets/SA.jpg", // Đường dẫn ảnh nền 3
    "src/assets/the-lion-king.jpg", // Đường dẫn ảnh nền 1
    "src/assets/frozen.jpg", // Đường dẫn ảnh nền 4
    "src/assets/toy-story.jpg", // Đường dẫn ảnh nền 5
    "src/assets/avatar.jpg", // Đường dẫn ảnh nền 6
    "src/assets/minions.jpg", // Đường dẫn ảnh nền 7
    "src/assets/inside-out.jpg", // Đường dẫn ảnh nền 8
    "src/assets/ralph.jpg", // Đường dẫn ảnh nền 9
    "src/assets/beauty-and-beast.jpg", // Đường dẫn ảnh nền 10
  ];

  useEffect(() => {
    // Fetch dữ liệu từ API
    fetch("http://127.0.0.1:8000/api/HotFilms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ month: 12, year: 2024, min_average: 8 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setMovies(data.data);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleImageClick = (index) => {
    setBackgroundIndex(index);
  };

  return (
    <div
      className={clx({
        "dark-mode": theme === "dark",
        "light-mode": theme === "light",
      })}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          height: "89.4vh",
          minHeight: "89.4vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          Phim hot tháng này
        </h1>
        <h2
          style={{
            textAlign: "center",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          Danh sách hot tháng này
        </h2>
        <div className={clx("carousel")}>
          {movies.map((movie, index) => (
            <div
              key={movie.FILM_ID}
              className={clx("movie", {
                featured: movie.FILM_ID === featuredMovie,
              })}
              onMouseOver={() => {
                setFeaturedMovie(movie.FILM_ID);
                handleImageClick(index);
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  borderRadius: "3px",
                  padding: "4px 8px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </span>
              <img
                src={backgroundImages[index % backgroundImages.length]}
                alt={movie.FILM_Title}
                className={clx("movie-poster")}
              />
              <p
                className={clx("movie-title")}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {movie.FILM_Title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
