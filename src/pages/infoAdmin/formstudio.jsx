import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './formstudio.module.css';

const cx = classNames.bind(styles);

const FormStudio = ({ isOpen, onClose, onSubmit, filmId }) => {
  const [formData, setFormData] = useState({
    FILM_ID: filmId || '',
    STU_ID: '',
    studioName: '',
    START_DATE: '',
    END_DATE: '',
    BUDGET: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studios, setstudios] = useState();
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

    const selectedStudio = studios.find(
      (studio) => studio.STU_Name === selectedName
    );

    setFormData((prev) => ({
      ...prev,
      studioName: selectedName,
    }));

    if (selectedStudio)
    setFormData((prev) => ({
      ...prev,
      STU_ID: selectedStudio.STU_ID,
    }));
  };

  useEffect(() => {
    setLoading(false);
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
          setstudios(data);
        }
      } catch (error) {
        console.error('Error fetching studios:', error);
        setError('An error occurred while fetching the data.');
      }
    };

    fetchstudios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch('http://127.0.0.1:8000/api/addproduce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert('A studio added successfully!');
      const returnStudio = {
        STU_ID: formData.STU_ID,
        STU_Name: formData.studioName,
      }
      onSubmit(returnStudio);
      setLoading(false);
      onClose();
    } else {
      setLoading(false);
      setError(result.error);
    }
    console.log(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={cx('modal-overlay')}>
      <div className={cx('modal')}>
        <div className={cx('modal-header')}>
          <h2>Add a studio</h2>
          <button className={cx('close-btn')} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={cx('category-form')}>
          <div className={cx('form-group')}>
            <label htmlFor="name">Studio</label>
            <input
              list="studios"
              type="text"
              id="studioName"
              name="studioName"
              value={formData.studioName}
              onChange={handleChange1}
            />
            <datalist id="studios">
              {studios &&
                studios.map((studio, index) => (
                  <option key={studio.STU_ID} value={`${studio.STU_Name}`} />
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
            <label htmlFor="FILM_ID">Budget</label>
            <input
              type="text"
              id="BUDGET"
              name="BUDGET"
              value={formData.BUDGET}
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

          <div className={cx('form-actions')}>
            <button type="button" className={cx('cancel-button')} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={cx('submit-button')} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Add a studio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormStudio;
