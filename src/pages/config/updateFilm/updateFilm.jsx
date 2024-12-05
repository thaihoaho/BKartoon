import React, { useState } from 'react';
import styles from './updateFilm.module.css';
import { useNavigate } from 'react-router-dom';

export default function UpdateFilmPage() {
  const navigate = useNavigate();
  const [filmData, setFilmData] = useState({
    filmId: '', // ID của phim cần cập nhật
    description: '',
    title: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilmData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBackClick = () => {
    navigate('/config'); // Quay lại layout chính
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api-url/update-film', {
        method: 'POST', // hoặc 'PUT' tùy backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filmId: filmData.filmId,
          newDescription: filmData.description,
          newTitle: filmData.title,
        }),
      });

      if (response.ok) {
        alert('Film updated successfully!');
        setFilmData({
          filmId: '',
          description: '',
          title: '',
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating film:', error);
      alert('An error occurred while updating the film.');
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={handleBackClick}>
        ← Quay lại
      </button>
      <h1 className={styles.pageTitle}>Cập Nhật Thông Tin Phim</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="filmId">Film ID</label>
            <input
              id="filmId"
              name="filmId"
              type="text"
              value={filmData.filmId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={filmData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={filmData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Update Film
          </button>
        </form>
      </div>
    </div>
  );
}