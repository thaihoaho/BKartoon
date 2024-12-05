import React, { useState } from 'react';
import styles from './deleteFilm.module.css';

import React, { useEffect, useState } from 'react';
import styles from './deleteFilm.module.css';
import { useNavigate } from 'react-router-dom';

export default function DeleteFilmPage() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]); // Danh sách phim
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Fetch danh sách phim từ backend
    const fetchFilms = async () => {
      try {
        const response = await fetch('http://your-backend-api-url/films');
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const handleDeleteFilm = async (filmId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa phim này?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://your-backend-api-url/delete-film/${filmId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Film deleted successfully!');
        // Cập nhật lại danh sách phim sau khi xóa
        setFilms((prevFilms) => prevFilms.filter((film) => film.id !== filmId));
      } else {
        alert('Failed to delete film.');
      }
    } catch (error) {
      console.error('Error deleting film:', error);
      alert('An error occurred while deleting the film.');
    }
  };

  const handleBackClick = () => {
    navigate('/config'); // Quay về layout chính
  };

  if (loading) {
    return <p>Loading films...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={handleBackClick}>
        ← Quay lại
      </button>
      <h1 className={styles.pageTitle}>Xóa Phim</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Hành động</th>
              <th>Film ID</th>
              <th>Film Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr key={film.id}>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteFilm(film.id)}
                  >
                    X
                  </button>
                </td>
                <td>{film.id}</td>
                <td>{film.title}</td>
                <td>{film.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


