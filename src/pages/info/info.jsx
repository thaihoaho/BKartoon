import { useState, useEffect } from 'react'
import { Img } from 'react-image'
import classNames from 'classnames/bind';
import styles from './info.module.css'
import { Star, Clock, Calendar, Film, User, Award } from 'lucide-react'
import RatingForm from './ratingform'
import { Flame } from 'lucide-react'
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function MovieDetails() {
  const location = useLocation();
  const pathname = location.pathname;
  const idx = pathname.split('/')[2];

  const [showRatingForm, setShowRatingForm] = useState(false)
  const characters = [
    {
      character: {
        name: "Ayase, Momo",
        role: "Main",
        image: "src/assets/user.png"
      },
      actor: {
        name: "Wakayama, Shion",
        language: "Japanese",
        image: "src/assets/user.png"
      }
    },
    {
      character: {
        name: "Takakura, Ken",
        role: "Main", 
        image: "src/assets/user.png"
      },
      actor: {
        name: "Hanae, Natsuki",
        language: "Japanese",
        image: "src/assets/user.png"
      }
    },
    {
      character: {
        name: "Shiratori, Aira",
        role: "Supporting",
        image: "src/assets/user.png"
      },
      actor: {
        name: "Sakura, Ayane",
        language: "Japanese",
        image: "src/assets/user.png"
      }
    }
  ]



  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('posterSection')}>
          <Img
            src="src/assets/conan.jpg"
            alt="Movie Poster"
            width={300}
            height={450}
            className={cx('poster')}
          />
          <div className={cx('ratingLevel')}>
            <Flame className={cx('flameIcon')} />
          <span>Average</span>
          </div>
          <div className={cx('rating')}>
            <div className={cx('ratingScore')}>
              <Star className={cx('starIcon')} />
              <span className={cx('score')}>8.71</span>
              <span className={cx('maxScore')}>/10</span>
            </div>
            <span className={cx('votes')}>109,860 votes</span>
          </div>
        </div>

        <div className={cx('infoSection')}>
          <h1 className={cx('title')}>Conan</h1>
          
          <div className={cx('tags')}>
            <span className={cx('tag')}>Action</span>
            <span className={cx('tag')}>Adventure</span>
            <span className={cx('tag')}>Comedy</span>
          </div>

          <div className={cx('metadata')}>
            <div className={cx('metaItem')}>
              <Clock className={cx('icon')} />
              <span>24 min</span>
            </div>
            <div className={cx('metaItem')}>
              <Calendar className={cx('icon')} />
              <span>Oct 2024</span>
            </div>
            <div className={cx('metaItem')}>
              <Film className={cx('icon')} />
              <span>TV Series</span>
            </div>
          </div>

          <div className={cx('charactersSection')}>
          <div className={cx('synopsis')}>
            <h2>Decription</h2>
            <p>
              Reeling from her recent breakup, Momo Ayase shows kindness to her socially awkward schoolmate, Ken Takakura. A rivalry quickly brews as each becomes determined to prove the other wrong about their beliefs in aliens versus the supernatural.
            </p>
            </div>
            </div>

          <div className={cx('charactersSection')}>
          <div className={cx('details')}>
            <div className={cx('detailsColumn')}>
              <div className={cx('detailItem')}>
                <h3><User className={cx('icon')} /> Director</h3>
                <p>Yukinobu Tatsu</p>
              </div>
              <div className={cx('detailItem')}>
                <h3><Award className={cx('icon')} /> Studio</h3>
                <p>Science SARU</p>
              </div>
            </div>
            <div className={cx('detailsColumn')}>
              <div className={cx('detailItem')}>
                <h3>Status</h3>
                <p>Currently Airing</p>
              </div>
              <div className={cx('detailItem')}>
                <h3>Episodes</h3>
                <p>12</p>
              </div>
            </div>
            </div>
          </div>

        <div className={cx('charactersSection')}>
          <h2 className={cx('sectionTitle')}>Characters & Voice Actors</h2>
            <div className={cx('charactersList')}>
            {characters.map((item, index) => (
        <div key={index} className={cx('characterItem')}>
          <div className={cx('characterInfo')}>
            <Img
              src={item.character.image}
              alt={item.character.name}
              className={cx('characterImage')}
            />
            <div className={cx('characterText')}>
              <h4>{item.character.name}</h4>
              <span className={cx('role')}>{item.character.role}</span>
            </div>
          </div>
          <div className={cx('actorInfo')}>
            <div className={cx('actorText')}>
              <h4>{item.actor.name}</h4>
              <span className={cx('language')}>{item.actor.language}</span>
            </div>
            <Img
              src={item.actor.image}
              alt={item.actor.name}
              className={cx('actorImage')}
            />
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
                <div className={cx('reviewRating')}>
                  <Star className={cx('starIcon')} />
                  <span>7/10</span>
                </div>
                <p className={cx('reviewContent')}>
                  Going in I expected just a cheesy Xmas film but to its credit Red One tried to do something different in
                  the vein of a dark fantasy action Christmas adventure. It should be commended for that alone. Not
                  quite the well executed violence of Violent Night, Red One takes a more light hearted approach with its
                  dark action fantasy that can cater to a broader audience...
                </p>
                
              </div>
            </div>
          </div>

          {showRatingForm && <RatingForm onClose={() => setShowRatingForm(false)} />}
        </div>
      </div>
    </div>
    </div>
  )
}
