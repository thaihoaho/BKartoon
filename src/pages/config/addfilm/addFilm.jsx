import React, { useState, useEffect } from 'react';
import styles from './addFilm.module.css';
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useNavigate } from 'react-router-dom';

const getDirectors = async (e) => {
  e.preventDefault();
 
}
function HashtagInputWithDatalist1({ onTagsChange }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/director/name', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.message || 'Failed to fetch data');
        } else {
          setDirectors(data);
        }
      } catch (error) {
        console.error('Error fetching directors:', error);
        setError('An error occurred while fetching the data.');
      }
    };

    fetchDirectors();
  }, []); 

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        setTags(newTags);
        onTagsChange(newTags);
        setInputValue("");
      }
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags); 
  };

  return (
    <div >
      <div className="hashtag-container" style={{display: "flex", flexWrap: "wrap", gap: "5px" }}>
        <input
          list="directors" 
          id="hashtag-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a director (Multiple directors => Enter)"
          style={{
          }}
        />
        <datalist id="directors">
          {directors.map((director, index) => (
            <option key={index} value={`${director}`} />
          ))}
        </datalist>

        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              backgroundColor: "#1abc9c",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => removeTag(index)}
          >
            {tag} ×
          </span>
        ))}
      </div>
    </div>
  );
}

function HashtagInputWithDatalist2({ onTagsChange }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    const fetchstudios = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/studio/name', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to fetch data');
        } else {
          setStudios(data);
        }
      } catch (error) {
        console.error('Error fetching studios:', error);
        setError('An error occurred while fetching the data.');
      }
    };

    fetchstudios();
  }, []); 

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        setTags(newTags);
        onTagsChange(newTags);
        setInputValue("");
      }
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags); 
  };

  return (
    <div >
      <div className="hashtag-container" style={{display: "flex", flexWrap: "wrap", gap: "5px" }}>
        <input
          list="studios" 
          id="hashtag-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a studio (Multiple studios => Enter)"
          style={{
          }}
        />
        <datalist id="studios">
          {studios.map((director, index) => (
            <option key={index} value={`${director}`} />
          ))}
        </datalist>

        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              backgroundColor: "#1abc9c",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => removeTag(index)}
          >
            {tag} 
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AddFilmPage() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/config');
  };
  const [filmData, setFilmData] = useState({
    description: '',
    title: '',
    type: 'LE',
    duration: '',
    releaseDate: '',
    episodes: '',
    director: '',
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
      duration: type === 'LE' ? prevData.duration : '',
      releaseDate: type === 'LE' ? prevData.releaseDate : '',
      episodes: type === 'BO' ? prevData.episodes : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/addfilm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmData),
      });
      const data = await response.json();

      if (!response.error) {
        console.log('Film added successfully!', data.message);
        setFilmData({
          description: '',
          title: '',
          type: 'LE',
          duration: '',
          releaseDate: '',
          episodes: '',
          director: '',
          studio: '',
        });
      } else {
        console.log('Failed to add film:', data.message);
      }

      setError(data.message);
    } catch (error) {
      console.error('Error adding film:', error);
      alert('An error occurred while adding the film.');
    }
  };

  const handleTagsChange1 = (newTags) => {
    setFilmData((prevData) => ({ ...prevData, director : newTags }));
    console.log("Tags:", newTags);
  };

  const handleTagsChange2 = (newTags) => {
    setFilmData((prevData) => ({ ...prevData, studio : newTags }));
    console.log("Tags:", newTags);
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
              <option value="LE">Movie</option>
              <option value="BO">Series</option>
            </select>
          </div>

          {filmData.type === 'LE' && (
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

          {filmData.type === 'BO' && (
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
            <HashtagInputWithDatalist1 onTagsChange={handleTagsChange1}/>
            
          </div>


          <div className={styles.formGroup}>
            <label htmlFor="studio">Studio</label>

            <HashtagInputWithDatalist2 onTagsChange={handleTagsChange2}/>
          </div>


          <button type="submit" className={styles.submitButton}>
            Add Film
          </button>

          <div className={styles.error}>{error}</div>
        </form>
      </div>
    </div>
  );
}

