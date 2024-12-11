import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './formupdate.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const FormUpdate = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    filmId: initialData?.FILM_ID || '',
    title: initialData?.FILM_Title || '',
    description: initialData?.FILM_Description || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        filmId: initialData.FILM_ID || '',
        title: initialData.FILM_Title || '',
        description: initialData.FILM_Description || '',
      });
    }
  }, [initialData]);

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

    // Chuẩn bị payload
    const payload = {
      filmId: formData.filmId,
      title: formData.title,
      description: formData.description,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/updateFilm', {
        method: 'POST', // Dùng POST thay vì PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      const result = await response.json();

      if (result.error) {
        throw new Error(
          Array.isArray(result.message)
            ? result.message.join(', ')
            : result.message || 'Đã xảy ra lỗi không xác định.'
        );
      }

      alert('Cập nhật phim thành công!');
      // onSubmit(result); // Gửi dữ liệu cập nhật lên component cha
      onClose();
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cx('modal-overlay')}>
      <div className={cx('modal')}>
        <div className={cx('modal-header')}>
          <h2>Chỉnh sửa thông tin phim</h2>
          <button className={cx('close-btn')} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={cx('update-film-form')}>
          <div className={cx('form-group')}>
            <label htmlFor="title">Tên phim:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              
            />
          </div>

          <div className={cx('form-group')}>
            <label htmlFor="description">Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              
            />
          </div>

          {error && <p className={cx('error-message')}>{error}</p>}
          <div className={cx('form-actions')}>
            <button type="button" className={cx('cancel-button')} onClick={onClose}>
              Hủy
            </button>
            <button
              type="submit"
              className={cx('submit-button')}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Cập nhật phim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdate;
