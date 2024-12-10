import { useState } from 'react'
import { Img } from 'react-image'
import { Star, Flame, AlertCircle, ArrowLeft } from 'lucide-react'
import classNames from 'classnames/bind'
import styles from './RankingCategory.module.css'
import defaultPoster from "../../assets/default.jpg";
import posterMapping from '../movielist/mapping'
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

export default function RankingCategory() {
  const [category, setCategory] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const handleSearch = async () => {
    

    setLoading(true)
    setError('')

    try {
      // Gửi yêu cầu POST đến API Laravel
      const response = await fetch('http://127.0.0.1:8000/api/ranking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_name: category }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải dữ liệu phim');
      }

      setMovies(data.message); // Phần `data.message` chứa danh sách phim từ API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx('container')}>
      <button 
        onClick={() => navigate('/home')} 
        className={cx('backButton')}
      >
        <ArrowLeft className={cx('backIcon')} />
        Quay lại
      </button>
      <div className={cx('content')}>
        <h1 className={cx('title')}>Xếp hạng theo thể loại</h1>
        
        <div className={cx('searchSection')}>
          <input
            type="text"
            placeholder="Nhập tên thể loại..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={cx('searchInput')}
          />
          <button onClick={handleSearch} className={cx('searchButton')} disabled={loading}>
            {loading ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>
        </div>
        
        {error && (
          <div className={cx('error')} style={{ borderColor: '#f5c6cb' }}>
            <AlertCircle className={cx('errorIcon')} style={{ marginRight: '8px' }} />
            <span>{error}</span>
          </div>
        )}

        <div className={cx('movieList')}>
          {movies.map((movie, index) => (
            <div key={movie.FILM_ID} className={cx('movieItem')}>
              <div className={cx('rank')}>{index + 1}</div>
              <Img
                src={posterMapping[movie.FILM_ID] || defaultPoster}
                alt={movie.FILM_Title}
                className={cx('poster')}
              />
              <div className={cx('movieInfo')}>
                <h2 className={cx('movieTitle')}>{movie.FILM_Title}</h2>
                <div className={cx('rating')}>
                  <Star className={cx('starIcon')} />
                  <span className={cx('score')}>
                    {movie.AverageRating ? Number(movie.AverageRating).toFixed(2) : 'Chưa có'}
                  </span>
                  <span className={cx('maxScore')}>/10</span>
                </div>
                <div className={cx('ratingLevel')}>
                    <Flame className={cx('flameIcon')} />
                    <span>{movie.FILM_RatingLevel || 'Chưa có'}</span> {/* Hiển thị "Chưa có" nếu không có giá trị */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {movies.length === 0 && !loading && !error && (
          <div className={cx('emptyState')}>
            Nhập thể loại phim để xem xếp hạng
          </div>
        )}
      </div>
    </div>
  )
}
