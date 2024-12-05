import { useState } from 'react'
import { Img } from 'react-image'
import styles from './info.module.css'
import RatingForm from './ratingform'
import ReviewCard from './ratingview'

export default function AnimeDetails() {
  const [showRatingForm, setShowRatingForm] = useState(false)

  const reviews = [
    {
      username: "rafaero",
      userAvatar: "/placeholder.svg",
      date: "Nov 16, 2024",
      rating: 10,
      comment: "I really don't get the mixed feeling people are having, this is the best anime of the season, and I'm watching 27 of them. If you can't see how amazing this anime is, you either haven't watched it, watched a few out of context clips, or maybe you didn't go past episode one."
    },
    {
      username: "ShinzoShi",
      userAvatar: "/placeholder.svg",
      date: "Oct 18, 2024",
      rating: 6,
      comment: "This anime could have been so good. It had the hype, the art style, and the fan base, but it's just so sexualized. I've literally watched \"Hensuki: Are you willing to Fall in Love with a Pervert\" and I've seen more perverted stuff in Dandadan than an anime with pervert in the name."
    }
  ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dandadan</h1>
        <div className={styles.mainContent}>
          <div className={styles.posterSection}>
            <Img
              src="/placeholder.svg"
              alt="Anime Cover"
              width={225}
              height={315}
              className={styles.poster}
            />
            <div className={styles.score}>
              <span className={styles.scoreLabel}>SCORE</span>
              <span className={styles.scoreValue}>8.71</span>
              <span className={styles.userCount}>109,860 users</span>
            </div>
            <button 
              className={styles.ratingButton}
              onClick={() => setShowRatingForm(!showRatingForm)}
            >
              {showRatingForm ? 'Close Rating Form' : 'Rate This Anime'}
            </button>
          </div>
          
          <div className={styles.infoSection}>
            <div className={styles.description}>
              <h2>Description</h2>
              <p>
                Reeling from her recent breakup, Momo Ayase, a popular high schooler, shows kindness to her socially awkward schoolmate, Ken Takakura, by standing up to his bullies. Ken misunderstands her intentions, believing he has made a new friend who shares his obsession with aliens and UFOs. However, s own eccentric occult beliefs lie in the supernatural realm; she thinks aliens do not exist. A rivalry quickly brews as each becomes determined to prove the other wrong.
              </p>
            </div>

            <div className={styles.information}>
              <h2>Information</h2>
              <dl>
                <dt>Type:</dt>
                <dd>TV</dd>
                <dt>Episodes:</dt>
                <dd>12</dd>
                <dt>Status:</dt>
                <dd>Currently Airing</dd>
                <dt>Aired:</dt>
                <dd>Oct 4, 2024 to Dec 20, 2024</dd>
                <dt>Premiered:</dt>
                <dd>Fall 2024</dd>
              </dl>
            </div>

            <div className={styles.characters}>
              <h2>Characters</h2>
              <ul>
                <li>Ayase, Momo</li>
                <li>Takakura, Ken</li>
                <li>Shiratori, Aira</li>
                <li>Ayase, Seiko</li>
                <li>Enjouji, Jin</li>
                <li>Mr. Mantis Shrimp</li>
              </ul>
            </div>

            <div className={styles.author}>
              <h2>Author</h2>
              <p>Yukinobu Tatsu</p>
            </div>

            <div className={styles.studio}>
              <h2>Studio</h2>
              <p>Science SARU</p>
            </div>
          </div>
        </div>
      </header>

      {showRatingForm && <RatingForm />}

      <section className={styles.reviews}>
        <div className={styles.reviewsHeader}>
          <h2>Reviews</h2>
          <button className={styles.writeReviewButton}>Write review</button>
        </div>

        <div className={styles.reviewsList}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </section>
    </div>
  )
}