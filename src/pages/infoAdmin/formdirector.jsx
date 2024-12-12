import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './formdirector.module.css';

const cx = classNames.bind(styles);

const FormDirector = ({ isOpen, onClose, onSubmit, filmId }) => {
  const [formData, setFormData] = useState({
    FILM_ID: filmId || '',
    directorName: '',
    DIC_ID: '',
    START_DATE: '',
    END_DATE: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [directors, setDirectors] = useState();

  const [dateError, setDateError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'END_DATE' && formData.START_DATE && value < formData.START_DATE) {
      setDateError('Ngày kết thúc không được trước ngày bắt đầu.');
    } else {
      setDateError(null);
    }
  };

  const handleChange1 = (event) => {
    const selectedName = event.target.value;

    const selectedDirector = directors.find(
      (studio) => studio.Name === selectedName
    );
    
    setFormData((prev) => ({
      ...prev,
      directorName: selectedName,
    }));

    if (selectedDirector)
      setFormData((prev) => ({
        ...prev,
        DIC_ID: selectedDirector.DIC_ID,
      }));
  };

  useEffect(() => {
    const fetchDirectors = async () => {
      setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateError) {
      alert(dateError);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/adddirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.message || 'Error adding a director.');
      }
      alert('A director added successfully!');
      const returnDirect = {
        DIC_ID : formData.DIC_ID,
        FName : formData.directorName,
      }
      onSubmit(returnDirect);
      setLoading(false);
      onClose();   
    } catch (err) {
      setError(err.message || 'Error occurred. Please try again.');
    }
    console.log(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={cx('modal-overlay')}>
      <div className={cx('modal')}>
        <div className={cx('modal-header')}>
          <h2>Add a director</h2>
          <button className={cx('close-btn')} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={cx('category-form')}>
          <div className={cx('form-group')}>
            <label htmlFor="name">Director</label>
            <input
              list="directors"
              type="text"
              id="directorName"
              name="directorName"
              value={formData.directorName}
              onChange={handleChange1}
            />
            <datalist id="directors">
              {directors &&
                directors.map((director, index) => (
                  <option key={director.DIC_ID} value={`${director.Name}`} />
                ))}
            </datalist>
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="START_DATE">Start Day</label>
            <input
              type="date"
              id="START_DATE"
              name="START_DATE"
              value={formData.START_DATE}
              onChange={handleChange}
            />
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="END_DATE">End Day</label>
            <input
              type="date"
              id="END_DATE"
              name="END_DATE"
              value={formData.END_DATE}
              onChange={handleChange}
            />
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="FILM_ID">ID Phim:</label>
            <input
              type="text"
              id="FILM_ID"
              name="FILM_ID"
              value={formData.FILM_ID}
              onChange={handleChange}
              disabled
            />
          </div>

          {error && <p className={cx('error-message')}>{error}</p>}
          {dateError && <p className={cx('error-message')}>{dateError}</p>}

          <div className={cx('form-actions')}>
            <button type="button" className={cx('cancel-button')} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={cx('submit-button')} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Add a director'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDirector;
