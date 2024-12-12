import { useState, useEffect } from 'react';
import { Img } from 'react-image';
import classNames from 'classnames/bind';
import styles from './info.module.css';
import { Star, Clock, Calendar, Film, User, Award } from 'lucide-react';
import RatingForm from './ratingform';
import { Flame } from 'lucide-react';
import posterMapping from '../movielist/mapping';
import defaultPoster from '../../assets/default.jpg';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function MovieDetails() {
  const location = useLocation();
  const pathname = location.pathname;
  const idx = pathname.split('/')[2];
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [average, setAverage] = useState(0);
  const { id } = useParams();
  const [info, setInfo] = useState();

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
          setAverage(data.averageRating.toFixed(2));
        }
      } catch (error) {
        console.error('Error fetching infos:', error);
        setError('An error occurred while fetching the data.');
      } 
    };

    fetchInfo();
  }, [idx]);

  useEffect(() => {
    if (info) {
      setLoading(false);
    }
  }, [info]);

  if (loading)
    return (
      <div className={cx('spinner-container')}>
        <div className={cx('spinner')}></div>
      </div>
    );

  const posterSrc = posterMapping[idx] || defaultPoster;

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
          <div className={cx('ratingLevel')}>
            <Flame className={cx('flameIcon')} />
            <span>{info.FILM_RatingLevel}</span>
          </div>
          <div className={cx('rating')}>
            <div className={cx('ratingScore')}>
              <Star className={cx('starIcon')} />
              <span className={cx('score')}>{average}</span>
              <span className={cx('maxScore')}>/10</span>
            </div>
            <span className={cx('votes')}>{info.rating.length} {' votes'}</span>
          </div>
        </div>

        <div className={cx('infoSection')}>
          <h1 className={cx('title')}>{info.FILM_Title}</h1>

          <div className={cx('tags')}>
            {info.categories.map((tag, index) => (
              <span key={index} className={cx('tag')}>
                {tag.CATE_Name}
              </span>
            ))}
          </div>

          <div className={cx('metadata')}>
            <div className={cx('metaItem')}>
              {info.FILM_Type === 'LE' ? <span><Clock className={cx('icon')} />{info.movie.MOV_Duration}p</span> : ''}
            </div>
            <div className={cx('metaItem')}>
              {info.FILM_Type === 'LE' ? <span><Calendar className={cx('icon')} />{info.movie.MOV_Release_day}</span> : ''}
            </div>
            <div className={cx('metaItem')}>
              <Film className={cx('icon')} />
              <span>{info.FILM_Type === 'LE' ? 'Movie' : 'Series'}</span>
            </div>
          </div>

          <div className={cx('charactersSection')}>
            <div className={cx('synopsis')}>
              <h2>Description</h2>
              <p>{info.FILM_Description}</p>
            </div>
          </div>

          <div className={cx('charactersSection')}>
            <div className={cx('details')}>
              <div className={cx('detailsColumn')}>
                <div className={cx('detailItem')}>
                  <h3><User className={cx('icon')} /> Director</h3>
                  {info.film_directories.map((director, index) => (
                    <span key={index}>
                      {[director.FName, director.MName, director.LName]
                        .filter(Boolean)
                        .join(' ')}
                      {index > 0 ? ',' : ''}
                    </span>
                  ))}
                </div>
                <div className={cx('detailItem')}>
                  <h3><Award className={cx('icon')} /> Studio</h3>
                  {info.studio.map((studio, index) => (
                    <span key={index}>
                      {studio.STU_Name}
                      {index > 0 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div className={cx('detailsColumn')}>
                <div className={cx('detailItem')}>
                  {info.FILM_Type === 'BO' &&
                    <div>
                      <h3>Status</h3>
                      <p>{info.series.ser_status.Status}</p>
                    </div>
                  }
                </div>
                <div className={cx('detailItem')}>
                  {info.FILM_Type === 'BO' &&
                    <div>
                  
                      <h3>Episodes</h3>
                      <p>{info.series.SER_Number_of_episodes}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
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
          </div>

          <div className={cx('charactersSection')}>
            <div className={cx('reviews')}>
              <div className={cx('reviewsHeader')}>
                <h2>User reviews <span className={cx('reviewCount')}></span></h2>
                <button
                  className={cx('rateButton')}
                  onClick={() => setShowRatingForm(true)}
                >
                  Rate This Movie
                </button>
              </div>

              <div className={cx('reviewsList')}>
                <div className={cx('featuredReview')}>
                  <div className={cx('reviewTag')}>FEATURED REVIEW</div>
                  {info.rating.map((rate, index) => (
                    <div key={index}>
                      <span className={cx('name')}>
                        {rate.USER_Username}
                        {' '}
                        <span className={cx('point')}>{rate.Point}</span>
                        {' '}
                        <Star className={cx('starIcon')} />
                      </span>
                      <p className={cx('reviewContent')}>
                        {rate.Comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {showRatingForm && <RatingForm filmId={idx} onClose={() => setShowRatingForm(false)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}