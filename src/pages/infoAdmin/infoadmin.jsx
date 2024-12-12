import { useState, useEffect } from 'react';
import { Img } from 'react-image';
import classNames from 'classnames/bind';
import styles from './infoadmin.module.css';
import { Clock, Calendar, Film, User, Award, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import posterMapping from '../movielist/mapping';
import defaultPoster from '../../assets/default.jpg';
import FormAddCategory from './formcategory';
import FormAddCharacter from './formcharacter';
import FormDirector from './formdirector';
import FormStudio from './formStudio';


const cx = classNames.bind(styles);

export default function MovieDetails1() {
  const location = useLocation();
  const pathname = location.pathname;
  const idx = pathname.split('/')[2];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState(false);
  const [isAddCharacterFormOpen, setIsAddCharacterFormOpen] = useState(false);
  const [isAddDirectorFormOpen, setIsAddDirectorFormOpen] = useState(false);
  const [isAddStudioFormOpen, setIsAddStudioFormOpen] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/movie/' + idx, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to fetch data');
        } else {
          setInfo(data);
        }
      } catch (error) {
        console.error('Error fetching infos:', error);
        setError('An error occurred while fetching the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [idx]);

  const handleAddCategory = () => {
    setIsAddCategoryFormOpen(true);
  };

  const handleAddCharacter = () => {
    setIsAddCharacterFormOpen(true);
  };

  const handleAddDirector = () => {
    setIsAddDirectorFormOpen(true);
  };

  const handleAddStudio = () => {
    setIsAddStudioFormOpen(true);
  };

  if (loading)
    return (
      <div className={cx('spinner-container')}>
        <div className={cx('spinner')}></div>
      </div>
    );

  if (error)
    return (
      <div className={cx('error-container')}>
        <p>{error}</p>
      </div>
    );

  const posterSrc = posterMapping[idx] || info.FILM_Poster || defaultPoster;

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('posterSection')}>
          <Img
            src={posterSrc}
            alt="Movie Poster"
            width={300}
            height={450}
            className={cx('poster')}
          />
        </div>

        <div className={cx('infoSection')}>
          <h1 className={cx('title')}>{info.FILM_Title}</h1>

          <div className={cx('tags')}>
            {info.categories.map((tag, index) => (
              <span key={index} className={cx('tag')}>
                {tag.CATE_Name}
              </span>
            ))}
            <button className={cx('addButton')} onClick={handleAddCategory}>
              <Plus /> Add
            </button>
          </div>

          <div className={cx('metadata')}>
            {info.FILM_Type === 'LE' && (
              <>
                <div className={cx('metaItem')}>
                  <Clock className={cx('icon')} />
                  <span>{info.movie?.MOV_Duration}p</span>
                </div>
                <div className={cx('metaItem')}>
                  <Calendar className={cx('icon')} />
                  <span>{info.movie?.MOV_Release_day}</span>
                </div>
              </>
            )}
            <div className={cx('metaItem')}>
              <Film className={cx('icon')} />
              <span>{info.FILM_Type === 'LE' ? 'Movie' : 'Series'}</span>
            </div>
          </div>

          <div className={cx('synopsis')}>
            <h2>Description</h2>
            <p>{info.FILM_Description}</p>
          </div>

          <div className={cx('details')}>
            <div className={cx('detailsColumn')}>
              <div className={cx('detailItem')}>
                <h3>
                  <User className={cx('icon')} /> Director
                </h3>
                <div className={cx('directors')}>
                {info.film_directories.map((director, index) => (
                  <div key={index}>
                    {[director.FName, director.MName, director.LName]
                      .filter(Boolean)
                      .join(' ')}
                  </div>
                ))}
                </div>
                <button className={cx('addButton')} onClick={handleAddDirector}>
                  <Plus /> Add
                </button>
              </div>
              <div className={cx('detailItem')}>
                <h3>
                  <Award className={cx('icon')} /> Studio
                </h3>
                <div className={cx('directors')}>
                {info.studio.map((studio, index) => (
                  <div key={index}>{studio.STU_Name}</div>
                ))}
                </div>
                <button className={cx('addButton')} onClick={handleAddStudio}>
                  <Plus /> Add
                </button>
              </div>
            </div>
            {info.FILM_Type === 'BO' && (
              <div className={cx('detailsColumn')}>
                <div className={cx('detailItem')}>
                  <h3>Status</h3>
                  <p>{info.series?.ser_status?.Status}</p>
                </div>
                <div className={cx('detailItem')}>
                  <h3>Episodes</h3>
                  <p>{info.series?.SER_Number_of_episodes}</p>
                </div>
              </div>
            )}
          </div>

          <div className={cx('charactersSection')}>
            <h2 className={cx('sectionTitle')}>Characters & Voice Actors</h2>
            <div className={cx('charactersList')}>
              {info.character.map((item, index) => (
                <div key={index} className={cx('characterItem')}>
                  <div className={cx('characterInfo')}>
                    <div className={cx('characterText')}>
                      <h4>{item.CHA_Name}</h4>
                    </div>
                  </div>
                  <div className={cx('actorInfo')}>
                    {item.voice_actors.map((actor, index) => (
                      <div key={index} className={cx('actorText')}>
                        <h4>{actor.FName}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className={cx('addButton')} onClick={handleAddCharacter}>
              <Plus /> Add Character
            </button>
          </div>
        </div>
      </div>

      <FormAddCategory
        isOpen={isAddCategoryFormOpen}
        onClose={() => setIsAddCategoryFormOpen(false)}
        onSubmit={(newCategory) => {
          // Handle the new category, e.g., update the categories list
          setInfo(prevInfo => ({
            ...prevInfo,
            categories: [...prevInfo.categories, newCategory]
          }));
        }}
        filmId={idx}
      />
      <FormAddCharacter
        isOpen={isAddCharacterFormOpen}
        onClose={() => setIsAddCharacterFormOpen(false)}
        onSubmit={(newCharacter) => {
          // Handle the new character, e.g., update the characters list
          setInfo(prevInfo => ({
            ...prevInfo,
            character: [...prevInfo.character, newCharacter]
          }));

        }}
        filmId={idx}
      />

      <FormDirector
        isOpen={isAddDirectorFormOpen}
        onClose={() => setIsAddDirectorFormOpen(false)}
        onSubmit={(newDirector) => {
          setInfo(prevInfo => ({
            ...prevInfo,
            film_directories: [...prevInfo.film_directories, newDirector]
          }));

          console.log(info)
        }}       
        filmId={idx}
      />

      <FormStudio
        isOpen={isAddStudioFormOpen}
        onClose={() => setIsAddStudioFormOpen(false)}
        onSubmit={(newStudio) => {
          setInfo(prevInfo => ({
            ...prevInfo,
            studio: [...prevInfo.studio, newStudio]
          }));
        }}
        filmId={idx}
      />
    </div>
  );
}