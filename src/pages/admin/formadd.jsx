import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from './formadd.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AddFilmModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    filmTitle: '',
    filmDescription: '',
    filmType: 'LE',
    movieDuration: '',
    movieReleaseDay: '',
    seriesEpisodes: '',
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

    // Chuẩn bị payload cho API
    const payload = {
    title: formData.filmTitle,
    description: formData.filmDescription,
    type: formData.filmType,
    duration: formData.filmType === 'LE' ? formData.movieDuration || null : null, // Bắt buộc set null nếu không phải 'LE'
    releaseDate: formData.filmType === 'LE' ? formData.movieReleaseDay || null : null,
    episodes: formData.filmType === 'BO' ? formData.seriesEpisodes || null : null, // Bắt buộc set null nếu không phải 'BO'
  };
    console.log("payload", payload);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addfilm2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log("response", response);
      console.log("payload", payload);




      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.message);
      }

      alert('Thêm phim thành công!');
      onClose(); // Đóng modal sau khi thêm thành công
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cx('modal-overlay')}>
      <div className={cx('modal-content')}>
        <div className={cx('modal-header')}>
          <h2>Thêm phim mới</h2>
          <button className={cx('close-button')} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={cx('add-film-form')}>
          <div className={cx('form-group')}>
            <label htmlFor="filmTitle">Tiêu đề phim</label>
            <input
              type="text"
              id="filmTitle"
              name="filmTitle"
              value={formData.filmTitle}
              onChange={handleChange}
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="filmDescription">Mô tả phim</label>
            <textarea
              id="filmDescription"
              name="filmDescription"
              value={formData.filmDescription}
              onChange={handleChange}
            />
          </div>
          <div className={cx('form-group')}>
            <label htmlFor="filmType">Loại phim</label>
            <select
              id="filmType"
              name="filmType"
              value={formData.filmType}
              onChange={handleChange}
            >
              <option value="LE">Phim Lẻ</option>
              <option value="BO">Phim Bộ</option>
            </select>
          </div>
          {formData.filmType === 'LE' && (
            <>
              <div className={cx('form-group')}>
                <label htmlFor="movieDuration">Thời lượng (phút)</label>
                <input
                  type="number"
                  id="movieDuration"
                  name="movieDuration"
                  value={formData.movieDuration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={cx('form-group')}>
                <label htmlFor="movieReleaseDay">Ngày phát hành</label>
                <input
                  type="date"
                  id="movieReleaseDay"
                  name="movieReleaseDay"
                  value={formData.movieReleaseDay}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.filmType === 'BO' && (
            <div className={cx('form-group')}>
              <label htmlFor="seriesEpisodes">Số tập</label>
              <input
                type="number"
                id="seriesEpisodes"
                name="seriesEpisodes"
                value={formData.seriesEpisodes}
                onChange={handleChange}
                required
              />
            </div>
          )}
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
              {loading ? 'Đang xử lý...' : 'Thêm phim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFilmModal;
