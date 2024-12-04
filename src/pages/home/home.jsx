  import React, { useState } from 'react';
  import classNames from 'classnames/bind';
  import styles from './home.module.css';

  const clx = classNames.bind(styles);

  const App = () => {
    const [theme, setTheme] = useState('dark');
    const [featuredMovie, setFeaturedMovie] = useState('lion-king');
    const [backgroundIndex, setBackgroundIndex] = useState(2); // State to change the background
    const backgroundImages = [
      'src/assets/doraemon.jpg', // Đường dẫn ảnh nền 2
      'src/assets/SA.jpg', // Đường dẫn ảnh nền 3
      'src/assets/the-lion-king.jpg', // Đường dẫn ảnh nền 1
      'src/assets/frozen.jpg', // Đường dẫn ảnh nền 4
      'src/assets/toy-story.jpg', // Đường dẫn ảnh nền 5
      'src/assets/avatar.jpg', // Đường dẫn ảnh nền 6
      'src/assets/minions.jpg', // Đường dẫn ảnh nền 7
      'src/assets/inside-out.jpg', // Đường dẫn ảnh nền 8
      'src/assets/ralph.jpg', // Đường dẫn ảnh nền 9
      'src/assets/beauty-and-beast.jpg', // Đường dẫn ảnh nền 10
    ];
    
    const toggleTheme = () => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    
    const movies = [
      { id: 'doreamon', title: 'Doreamon', poster: 'src/assets/doreamon-poster.jpg' },
      { id: 'spirited-away', title: 'Spirited Away', poster: 'src/assets/spirited-away-poster.jpg' },
      { id: 'lion-king', title: 'The Lion King', poster: 'src/assets/the-lion-king-poster.jpg' },
      { id: 'frozen', title: 'Frozen', poster: 'src/assets/frozen-poster.jpg' }, // Phim Frozen
      { id: 'toy-story', title: 'Toy Story', poster: 'src/assets/toy-story-poster.jpg' }, // Phim Toy Story
      { id: 'avatar', title: 'Avatar', poster: 'src/assets/avatar-poster.jpg' }, // Phim Avatar
      { id: 'minions', title: 'Minions', poster: 'src/assets/minion-poster.jpg' }, // Phim Minions
      { id: 'inside-out', title: 'Inside Out', poster: 'src/assets/inside-out-poster.jpg' }, // Phim Inside Out
      { id: 'ralph', title: 'Wreck-It Ralph', poster: 'src/assets/ralph-poster.jpg' }, // Phim Wreck-It Ralph
     ];
    

    const handleImageClick = (index) => {
      setBackgroundIndex(index);
    };

    return (
      <div className={clx({ 'dark-mode': theme === 'dark', 'light-mode': theme === 'light' })}>
        <div
          style={{
            backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            height: '89.4vh',
            minHeight: '89.4vh',
            
          }}
        >

          <div className={clx('carousel')}>
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className={clx('movie', { featured: movie.id === featuredMovie })}
                onMouseOver={() => {
                  setFeaturedMovie(movie.id);
                  handleImageClick(index);
                }}
              >
                <img src={movie.poster} alt={movie.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default App;
