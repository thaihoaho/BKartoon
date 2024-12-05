import React, { useState } from 'react';
import styles from './addFilm.module.css';
import { useNavigate } from 'react-router-dom';

export default function AddFilmPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/config'); // Quay về layout chính
  };

  const [filmData, setFilmData] = useState({
    description: '',
    title: '',
    type: 'Movie', // Default to "Movie"
    duration: '',
    releaseDate: '',
    episodes: '',
    director: [],
    studio: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilmData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setFilmData((prevData) => ({
      ...prevData,
      type,
      // Clear unrelated fields when switching type
      duration: type === 'Movie' ? prevData.duration : '',
      releaseDate: type === 'Movie' ? prevData.releaseDate : '',
      episodes: type === 'Series' ? prevData.episodes : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api-url/add-film', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmData),
      });

      if (response.ok) {
        alert('Film added successfully!');
        setFilmData({
          description: '',
          title: '',
          type: 'Movie',
          duration: '',
          releaseDate: '',
          episodes: '',
          director: '',
          studio: '',
        });
      } else {
        alert('Failed to add film.');
      }
    } catch (error) {
      console.error('Error adding film:', error);
      alert('An error occurred while adding the film.');
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={handleBackClick}>
        ← Quay lại
      </button>
      <h1 className={styles.pageTitle}>Thêm Phim Mới</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={filmData.type}
              onChange={handleTypeChange}
              required
            >
              <option value="Movie">Movie</option>
              <option value="Series">Series</option>
            </select>
          </div>

          {filmData.type === 'Movie' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="duration">Duration (minutes)</label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  value={filmData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="releaseDate">Release Date</label>
                <input
                  id="releaseDate"
                  name="releaseDate"
                  type="date"
                  value={filmData.releaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {filmData.type === 'Series' && (
            <div className={styles.formGroup}>
              <label htmlFor="episodes">Episodes</label>
              <input
                id="episodes"
                name="episodes"
                type="number"
                value={filmData.episodes}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="director">Director</label>
            <input
              id="director"
              name="director"
              type="text"
              value={filmData.director}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="studio">Studio</label>
            <input
              id="studio"
              name="studio"
              type="text"
              value={filmData.studio}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Film
          </button>
        </form>
      </div>
    </div>
  );
}

