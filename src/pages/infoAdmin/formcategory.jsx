import React, { useState } from 'react';
import { X } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './formcategory.module.css';

const cx = classNames.bind(styles);

const FormAddCategory = ({ isOpen, onClose, onSubmit, filmId }) => {
  const [formData, setFormData] = useState({
    filmId: filmId || '',
    name: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/addcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.message || 'Error adding category.');
      }

      alert('Category added successfully!');
      onSubmit(result);
      onClose();
    } catch (err) {
      setError(err.message || 'Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cx('modal-overlay')}>
      <div className={cx('modal')}>
        <div className={cx('modal-header')}>
          <h2>Thêm Thể Loại</h2>
          <button className={cx('close-btn')} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={cx('category-form')}>
          <div className={cx('form-group')}>
            <label htmlFor="name">Tên thể loại:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="description">Mô tả thể loại:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="filmId">ID Phim:</label>
            <input
              type="text"
              id="filmId"
              name="filmId"
              value={formData.filmId}
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
              {loading ? 'Đang xử lý...' : 'Thêm Thể Loại'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddCategory;