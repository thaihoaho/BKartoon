import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, ArrowUpDown } from 'lucide-react';
import { DropdownMenu } from '../../components/DropDown-Menu/DropdownMenu';
import AddFilmModal from './formadd';
import styles from './admin.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const FILMManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch films from the API when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/films');
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error('Failed to fetch movies:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Handle deleting a film
  const handleDeleteFilm = async (filmId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this film?");
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/deletefilm', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json', // Ensure you're sending JSON
        },
        body: JSON.stringify({ filmId }), // Send the filmId in the body as JSON
      });

      if (response.ok) {
        // Remove the deleted film from the UI
        setMovies((prevMovies) => prevMovies.filter(movie => movie.FILM_ID !== filmId));
      } else {
        console.error('Failed to delete film:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting film:', error);
    }
  };

  const handleAddFilm = (filmData) => {
    console.log('Thêm phim mới:', filmData);
    setIsAddModalOpen(false);
  };

  return (
    <div className={cx('movie-management')}>
      <div className={cx('page-header')}>
        <h1>Quản lý phim</h1>
        <button className={cx('add-movie-btn')} onClick={() => setIsAddModalOpen(true)}>
          <Plus size={20} />
          Thêm phim mới
        </button>
      </div>

      <div className={cx('filters-section')}>
        <div className={cx('search-bar')}>
          <Search className={cx('search-icon')} />
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={cx('filter-options')}>
          <DropdownMenu
            trigger={
              <button className={cx('filter-btn')}>
                <ArrowUpDown size={18} />
                Sắp xếp
              </button>
            }
          >
            <div>Mới nhất</div>
            <div>Đánh giá cao nhất</div>
            <div>Tên A-Z</div>
          </DropdownMenu>
        </div>
      </div>

      <div className={cx('movies-table')}>
        <table>
          <thead>
            <tr>
              <th>Tên phim</th>
              <th>Mô tả</th>
              <th>Đánh giá</th>
              <th>Loại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.FILM_ID}>
                <td>{movie.FILM_Title}</td>
                <td title={movie.FILM_Description}>
                  {movie.FILM_Description.length > 50
                    ? `${movie.FILM_Description.slice(0, 50)}...`
                    : movie.FILM_Description}
                </td>
                <td>{movie.FILM_Ratinglevel}</td>
                <td>
                  <span className={cx('status-badge')}>{movie.FILM_Type}</span>
                </td>
                <td>
                  <div className={cx('action-buttons')}>
                    <button className={cx('action-btn', 'edit')}>
                      <Pencil size={16} />
                    </button>
                    <button
                      className={cx('action-btn', 'delete')}
                      onClick={() => handleDeleteFilm(movie.FILM_ID)} // Add the delete handler here
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddFilmModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddFilm}
      />
    </div>
  );
};

export default FILMManagement;
